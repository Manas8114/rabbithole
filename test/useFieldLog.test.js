// Behavioral tests for the field-log engine — the pure logic where
// double-pay, stamp-chaining, and week-cycle bugs hide.
//
// `mount()` returns a live proxy over result.current, so every read sees the
// latest render. `actRun` performs a mutation inside act() (flushing the
// React state update) and returns the mutation's return value.
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldLog } from '../src/hooks/useFieldLog';
import { MEETINGS, QUESTS, INVITE_STAGES, XP_ACTIONS, STAMP_CATALOG } from '../src/data/gamificationData';

// Stamp id -> bonusXp, for asserting that a seed's total XP is honest.
const STAMP_BONUS = Object.fromEntries(STAMP_CATALOG.map((s) => [s.id, s.bonusXp]));

const STORAGE_KEY = 'curiosity-passport-fieldlog';

function mount(preload) {
  if (preload) {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...raw, ...preload }));
  }
  const hook = renderHook(() => useFieldLog());
  return new Proxy(
    {},
    { get: (_t, prop) => hook.result.current[prop] }
  );
}

// Run `fn` inside act (flushing the state update) and return its value.
function actRun(fn) {
  let out;
  act(() => {
    out = fn();
  });
  return out;
}

// Async variant for promise-returning methods (importFieldLog).
async function actRunAsync(fn) {
  let out;
  await act(async () => {
    out = await fn();
  });
  return out;
}


beforeEach(() => localStorage.clear());

describe('one-shot XP', () => {
  it('pays a trail open exactly once', () => {
    const log = mount();
    // 15 for the action plus the 25 first-trail stamp bonus that settles in
    // the same call.
    expect(actRun(() => log.award('openTrail:t1')).earned).toBe(40);
    expect(actRun(() => log.award('openTrail:t1')).earned).toBe(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).xp).toBe(40);
  });

  it('unknown action keys earn nothing', () => {
    const log = mount();
    expect(actRun(() => log.award('nonsense:thing')).earned).toBe(0);
  });

  it('reports a rank-up exactly when a threshold is crossed', () => {
    // Just below the 150 line: a 10-XP read keeps you at 149 — no rank-up.
    const below = mount({ xp: 139 });
    expect(actRun(() => below.award('readStage:probe:s1')).rankUp).toBeNull();

    // At the line: the same action crosses 140 → 150 into Field Researcher.
    // (Distinct key 's2' so the second mount's inherited claimedOnce can't
    // make it a no-op.)
    const at = mount({ xp: 140 });
    const r = actRun(() => at.award('readStage:probe:s2'));
    expect(r.earned).toBe(10);
    expect(r.rankUp?.name).toBe('Field Researcher');
  });
});

describe('stamp chaining (fixed-point settle)', () => {
  it('one settle pass crosses and collects every threshold stamp it clears', () => {
    // Preload past both the 200 and 400 rank thresholds; a single
    // settleStamps() call must sweep both, in catalog order.
    const log = mount({ xp: 450 });
    const r = actRun(() => log.settleStamps());
    expect(r.map((s) => s.id)).toEqual(['rank-200', 'rank-400']);
    expect(log.xp).toBe(450 + 40 + 80); // both bonus XPs applied
    expect(log.earnedStamps).toContain('rank-200');
    expect(log.earnedStamps).toContain('rank-400');
  });

  it('a fresh log settles nothing', () => {
    const log = mount();
    expect(actRun(() => log.settleStamps())).toEqual([]);
  });

  it('settle is idempotent — a second pass earns nothing new', () => {
    const log = mount({ xp: 450 });
    actRun(() => log.settleStamps());
    expect(actRun(() => log.settleStamps())).toEqual([]);
  });
});

describe('shortlist & invites', () => {
  it('adding pays once; removing never claws back', () => {
    const log = mount();
    expect(actRun(() => log.toggleShortlist('priya-chen')).earned).toBe(XP_ACTIONS.shortlist.xp);
    expect(actRun(() => log.toggleShortlist('priya-chen')).earned).toBe(0); // removing
    expect(actRun(() => log.toggleShortlist('priya-chen')).earned).toBe(0); // already claimed
  });

  it('registering an invite seeds the pipeline at Sent, once', () => {
    const log = mount();
    actRun(() => log.registerInvite('marcus-vance'));
    expect(log.inviteStatus['marcus-vance'].stage).toBe(INVITE_STAGES[0]);
    expect(actRun(() => log.registerInvite('marcus-vance')).earned).toBe(0);
  });
});

describe('invite pipeline', () => {
  it('walks Sent -> Replied -> Interview -> Offer, idempotent at the end', () => {
    const log = mount();
    actRun(() => log.registerInvite('alex-morgan'));
    expect(actRun(() => log.advanceInvite('alex-morgan')).stage).toBe('Replied');
    expect(actRun(() => log.advanceInvite('alex-morgan')).stage).toBe('Interview');
    expect(actRun(() => log.advanceInvite('alex-morgan')).stage).toBe('Offer');
    expect(actRun(() => log.advanceInvite('alex-morgan'))).toEqual(
      expect.objectContaining({ moved: false, stage: 'Offer' })
    );
  });

  it('returns null for a student with no invite', () => {
    const log = mount();
    expect(actRun(() => log.advanceInvite('nobody'))).toBeNull();
  });

  it('unlocks In Conversation early, Offers Maker once two reach Offer', () => {
    const log = mount();
    actRun(() => log.registerInvite('a'));
    actRun(() => log.registerInvite('b'));
    const toReplied = actRun(() => log.advanceInvite('a'));
    expect(toReplied.newStamps.map((s) => s.id)).toContain('in-conversation');
    // Drive 'a' all the way to Offer (Replied, Interview, Offer).
    actRun(() => log.advanceInvite('a')); // a: Interview
    const aAtOffer = actRun(() => log.advanceInvite('a')); // a: Offer
    expect(aAtOffer.newStamps.map((s) => s.id)).not.toContain('offers-maker'); // only one at Offer
    // Now drive 'b' to Offer — this is the one that should unlock it.
    actRun(() => log.advanceInvite('b')); // b: Replied
    actRun(() => log.advanceInvite('b')); // b: Interview
    const bAtOffer = actRun(() => log.advanceInvite('b')); // b: Offer
    expect(bAtOffer.newStamps.map((s) => s.id)).toContain('offers-maker');
  });
});

describe('weekly Field Office cycle', () => {
  it('week 1 pays full XP; closing a full week pays the bonus and unlocks Reliable', () => {
    const log = mount();
    for (const m of MEETINGS) {
      const r = actRun(() => log.attendMeeting(m, m.choices[0]));
      expect(r.earned >= m.xp + m.choices[0].xp).toBe(true);
    }
    expect(log.attendanceTotal).toBe(MEETINGS.length);
    const res = actRun(() => log.startNewWeek(MEETINGS.map((m) => m.id)));
    expect(res.started).toBe(true);
    expect(res.week).toBe(2);
    expect(res.bonus).toBe(50);
    expect(res.newStamps.map((s) => s.id)).toContain('reliable');
  });

  it('refuses to close a week with missing attendance', () => {
    const log = mount();
    actRun(() => log.attendMeeting(MEETINGS[0]));
    expect(actRun(() => log.startNewWeek(MEETINGS.map((m) => m.id))).started).toBe(false);
  });

  it('re-week check-ins pay reduced XP and only once per week', () => {
    const log = mount();
    for (const m of MEETINGS) actRun(() => log.attendMeeting(m));
    actRun(() => log.startNewWeek(MEETINGS.map((m) => m.id)));
    const m0 = MEETINGS[0];
    const expected = Math.max(5, Math.round(m0.xp * 0.4));
    const r1 = actRun(() => log.attendMeeting(m0, m0.choices[0]));
    expect(r1.earned).toBe(expected + 5);
    expect(actRun(() => log.attendMeeting(m0, m0.choices[0])).earned).toBe(0);
    expect(log.week).toBe(2);
  });

  it('Diligent counts lifetime check-ins, not the current week', () => {
    const log = mount();
    actRun(() => log.attendMeeting(MEETINGS[0]));
    actRun(() => log.attendMeeting(MEETINGS[1]));
    actRun(() => log.attendMeeting(MEETINGS[2]));
    expect(log.earnedStamps).toContain('diligent');
  });
});

describe('quests, reviews, inquiries', () => {
  it('a completed quest files a field note and unlocks Fieldworker', () => {
    const log = mount();
    const r = actRun(() => log.completeQuest(QUESTS[0]));
    expect(r.newStamps.map((s) => s.id)).toContain('fieldwork');
    expect(log.fieldNotes.map((n) => n.questId)).toContain(QUESTS[0].id);
    expect(actRun(() => log.completeQuest(QUESTS[0])).earned).toBe(0);
  });

  it('a peer review pays once per trail and unlocks Mentor', () => {
    const log = mount();
    const r = actRun(() => log.logReview('sustainable-fashion', 'Sharp question'));
    expect(r.newStamps.map((s) => s.id)).toContain('mentor');
    expect(actRun(() => log.logReview('sustainable-fashion', 'Again')).earned).toBe(0);
  });

  it('the first inquiry pays XP + Question Writer; repeats are free', () => {
    const log = mount();
    const r = actRun(() => log.writeInquiry('Do bees prefer clover?'));
    expect(r.earned).toBe(15);
    expect(r.newStamps.map((s) => s.id)).toContain('question-writer');
    expect(actRun(() => log.writeInquiry('Another question?')).earned).toBe(0);
    actRun(() => log.writeInquiry('Do bees prefer clover?'));
    expect(log.inquiries.filter((q) => q.text === 'Do bees prefer clover?')).toHaveLength(1);
  });
});

describe('guided tour', () => {
  it('completing pays once; skipping blocks completion', () => {
    const log = mount();
    expect(actRun(() => log.completeTour()).earned).toBe(50);
    expect(actRun(() => log.completeTour()).earned).toBe(0);

    // Fresh log (clear the persisted tour-done state first).
    localStorage.removeItem(STORAGE_KEY);
    const log2 = mount();
    actRun(() => log2.skipTour());
    expect(log2.tourSkipped).toBe(true);
    expect(actRun(() => log2.completeTour()).earned).toBe(0);
  });

  it('markPassportVisit is idempotent', () => {
    const log = mount();
    actRun(() => log.markPassportVisit());
    expect(log.yourPassportVisited).toBe(true);
    actRun(() => log.markPassportVisit());
    expect(log.yourPassportVisited).toBe(true);
  });
});

describe('persistence round-trips', () => {
  it('export -> import restores the exact log', async () => {
    const log = mount();
    actRun(() => log.award('openTrail:t0'));
    actRun(() => log.registerInvite('priya-chen'));
    const snapshot = JSON.stringify(log.exportFieldLog());

    const fresh = mount();
    const res = await actRunAsync(() => fresh.importFieldLog(snapshot));
    expect(res).toEqual(expect.objectContaining({ ok: true }));
    expect(fresh.xp).toBe(log.xp);
    expect(fresh.invited).toContain('priya-chen');
  });

  it('rejects malformed imports with a reason', async () => {
    const log = mount();
    expect((await actRunAsync(() => log.importFieldLog('{not json')))).toMatchObject({ ok: false, error: expect.any(String) });
    expect((await actRunAsync(() => log.importFieldLog(JSON.stringify({ xp: 5 })))).ok).toBe(false);
  });

  it('reset wipes everything and re-seeds the shortlist', () => {
    const log = mount();
    actRun(() => log.award('openTrail:t0'));
    actRun(() => log.toggleShortlist('priya-chen'));
    actRun(() => log.resetLog());
    expect(log.xp).toBe(0);
    expect(log.earnedStamps).toEqual([]);
    expect(log.shortlist).toEqual(['alex-morgan']);
  });

  it('loads a pre-existing log from localStorage', () => {
    // 999 sits at the 800-threshold Senior Analyst band.
    const log = mount({ xp: 999, lastVisitDay: '2020-01-01' });
    expect(log.xp).toBe(999);
    expect(log.rank.name).toBe('Senior Analyst');
  });
});

describe('streaks', () => {
  const daysAgo = (n) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);

  it('carries the streak when the last visit was yesterday', () => {
    const log = mount({ streak: 4, lastVisitDay: daysAgo(1) });
    actRun(() => log.touchVisit());
    expect(log.streak).toBe(5);
  });

  it('resets to 1 after a gap', () => {
    const log = mount({ streak: 9, lastVisitDay: '2020-01-01' });
    actRun(() => log.touchVisit());
    expect(log.streak).toBe(1);
  });

  it('is a no-op for a second touch on the same day', () => {
    const log = mount({ streak: 3, lastVisitDay: daysAgo(0) });
    actRun(() => log.touchVisit());
    expect(log.streak).toBe(3);
  });

  it('unlocks Return Visitor once stamps are settled after a 3-day streak', () => {
    // touchVisit updates the streak but does not self-settle; the app's
    // load path calls settleStamps() (App.js), which is what unlocks it.
    const log = mount({ streak: 2, lastVisitDay: daysAgo(1) });
    actRun(() => log.touchVisit());
    expect(log.streak).toBe(3);
    expect(log.earnedStamps).not.toContain('streak-3');
    actRun(() => log.settleStamps());
    expect(log.earnedStamps).toContain('streak-3');
  });
});

describe('demo seed', () => {
  it('loads a rich log whose XP equals claimed actions plus stamp bonuses', () => {
    const log = mount();
    actRun(() => log.seedDemo());
    const claimed = Object.entries(log.log.claimedOnce)
      .filter(([k]) => !k.startsWith('stamp:'))
      .reduce((sum, [, c]) => sum + c.xp, 0);
    const bonuses = log.earnedStamps.reduce((sum, id) => sum + STAMP_BONUS[id], 0);
    // XP must be exactly the claimed actions plus every settled stamp bonus.
    expect(log.xp).toBe(claimed + bonuses);
    // And it must actually drive rank/cq upward.
    expect(log.rank.name).not.toBe('Novice Cartographer');
    expect(log.cq).toBeGreaterThan(10);
  });

  it('seeds a full pipeline and attendance, leaving two stamps unearned by design', () => {
    const log = mount();
    actRun(() => log.seedDemo());
    expect(Object.keys(log.inviteStatus)).toHaveLength(3);
    expect(log.inviteStatus['priya-chen'].stage).toBe('Offer');
    expect(log.attendanceTotal).toBe(6);
    // offers-maker needs TWO candidates at Offer; the seed holds exactly one.
    expect(log.earnedStamps).not.toContain('offers-maker');
    // reliable needs a completed week; the seed leaves week 1 open.
    expect(log.earnedStamps).not.toContain('reliable');
    expect(log.tourDone).toBe(false);
  });
});
