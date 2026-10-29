import { useRef, useState } from 'react';
import { XP_ACTIONS, STAMP_CATALOG, rankForXp, nextRankForXp, rankProgressPct, cqFromXp } from '../data/gamificationData';

const STORAGE_KEY = 'curiosity-passport-fieldlog';

// Persisted shape:
// {
//   xp: 0,
//   claimedOnce: { "openTrail:sustainable-fashion": { xp: 15, ts: ... }, ... },
//   earnedStamps: ['first-trail', ...],
//   streak: 0,
//   lastVisitDay: null,       // 'YYYY-MM-DD' (local)
//   shortlist: ['alex-morgan'],
//   invited: [],
// }
function emptyLog() {
  return {
    xp: 0,
    claimedOnce: {},
    earnedStamps: [],
    streak: 0,
    lastVisitDay: null,
    shortlist: ['alex-morgan'],
    invited: [],
    // Field Office activity (steps 3+)
    attendance: {},   // { 'mon-standup': { choiceId, ts } }
    fieldNotes: [],   // completed quests: [{ questId, ts }]
    reviews: [],      // logged peer reviews: [{ trailId, ts }]
    inquiries: [],    // player-written next questions: [{ text, ts }]
  };
}

function loadLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyLog(), ...JSON.parse(raw) } : emptyLog();
  } catch {
    return emptyLog();
  }
}

const todayStr = () => new Date().toISOString().slice(0, 10);
const yesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export function useFieldLog() {
  // Seeding 'alex-morgan' into a fresh shortlist matches the original
  // demo pre-population, so the employer view opens with content.
  const [log, setLog] = useState(loadLog);
  // Ref mirror: rapid successive mutations (e.g. StrictMode's double
  // effect) each observe the previous call's result, so one-shot XP
  // can never pay twice.
  const logRef = useRef(log);

  const mutate = (updater) => {
    const next = updater(logRef.current);
    logRef.current = next;
    setLog(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable (private browsing) — state still works in-memory
    }
    return next;
  };

  // Streak: mark today as a visit day. Same-day repeat calls are no-ops.
  const touchVisit = () => {
    const today = todayStr();
    if (logRef.current.lastVisitDay === today) return;
    const streak = logRef.current.lastVisitDay === yesterdayStr() ? logRef.current.streak + 1 : 1;
    mutate((l) => ({ ...l, streak, lastVisitDay: today }));
  };

  /**
   * Award XP for a namespaced action key, e.g. 'openTrail:icu-alarm-fatigue'
   * or 'readStage:sustainable-fashion:node-3'. Each exact key pays once;
   * repeated calls earn 0. Returns { earned, xp, rankUp } for toasting.
   */
  const award = (actionKey) => {
    const actionName = actionKey.split(':')[0];
    const action = XP_ACTIONS[actionName];
    if (!action || logRef.current.claimedOnce[actionKey]) {
      return { earned: 0, xp: logRef.current.xp, rankUp: null, newStamps: [] };
    }
    const rankBefore = rankForXp(logRef.current.xp);
    mutate((l) => ({
      ...l,
      xp: l.xp + action.xp,
      claimedOnce: { ...l.claimedOnce, [actionKey]: { xp: action.xp, ts: Date.now() } },
    }));
    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: action.xp + newStamps.reduce((sum, s) => sum + s.bonusXp, 0),
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
    };
  };

  /**
   * Shortlist toggle. Adding a candidate pays one-shot XP; removing never
   * claw back XP — the log only grows.
   */
  const toggleShortlist = (studentId) => {
    const isAdding = !logRef.current.shortlist.includes(studentId);
    const xpKey = `shortlist:${studentId}`;
    const willEarn = isAdding && !logRef.current.claimedOnce[xpKey];
    const rankBefore = rankForXp(logRef.current.xp);
    mutate((l) => {
      let updated = {
        ...l,
        shortlist: isAdding ? [...l.shortlist, studentId] : l.shortlist.filter((id) => id !== studentId),
      };
      if (willEarn) {
        updated.xp += XP_ACTIONS.shortlist.xp;
        updated.claimedOnce = { ...updated.claimedOnce, [xpKey]: { xp: XP_ACTIONS.shortlist.xp, ts: Date.now() } };
      }
      return updated;
    });
    const newStamps = isAdding ? settleStamps() : [];
    const rankAfter = rankForXp(logRef.current.xp);
    return { earned: (willEarn ? XP_ACTIONS.shortlist.xp : 0) + newStamps.reduce((sum, s) => sum + s.bonusXp, 0), xp: logRef.current.xp, rankUp: rankAfter.index > rankBefore.index ? rankAfter : null, newStamps };
  };

  /**
   * Log a recruiter invite: one-shot XP the first time, idempotent after.
   */
  const registerInvite = (studentId) => {
    const willEarn = !logRef.current.invited.includes(studentId);
    const rankBefore = rankForXp(logRef.current.xp);
    mutate((l) => {
      let updated = { ...l, invited: l.invited.includes(studentId) ? l.invited : [...l.invited, studentId] };
      if (willEarn) {
        updated.xp += XP_ACTIONS.invite.xp;
        updated.claimedOnce = { ...updated.claimedOnce, [`invite:${studentId}`]: { xp: XP_ACTIONS.invite.xp, ts: Date.now() } };
      }
      return updated;
    });
    const newStamps = willEarn ? settleStamps() : [];
    const rankAfter = rankForXp(logRef.current.xp);
    return { earned: (willEarn ? XP_ACTIONS.invite.xp : 0) + newStamps.reduce((sum, s) => sum + s.bonusXp, 0), xp: logRef.current.xp, rankUp: rankAfter.index > rankBefore.index ? rankAfter : null, newStamps };
  };

  const resetLog = () => {
    const fresh = emptyLog();
    fresh.lastVisitDay = todayStr();
    mutate(() => fresh);
  };

  // Derived snapshot the stamp predicates run against.
  const checkState = () => ({
    xp: logRef.current.xp,
    streak: logRef.current.streak,
    shortlist: logRef.current.shortlist,
    invited: logRef.current.invited,
    claimedOnce: logRef.current.claimedOnce,
    attendance: logRef.current.attendance,
    fieldNotes: logRef.current.fieldNotes,
    reviews: logRef.current.reviews,
    inquiries: logRef.current.inquiries,
  });

  /**
   * One-shot XP for an arbitrary dynamic action (meeting attendance,
   * meeting choice, quest, review). Settle stamps after; report rank-up.
   */
  const awardOnce = (actionKey, xp, extra) => {
    if (logRef.current.claimedOnce[actionKey] || xp <= 0) {
      return { earned: 0, xp: logRef.current.xp, rankUp: null, newStamps: [] };
    }
    const rankBefore = rankForXp(logRef.current.xp);
    mutate((l) => ({
      ...l,
      ...extra(l),
      xp: l.xp + xp,
      claimedOnce: { ...l.claimedOnce, [actionKey]: { xp, ts: Date.now() } },
    }));
    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: xp,
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
    };
  };

  /**
   * Field Office: attend a meeting (once per meeting per log) and pick one
   * follow-up choice (once, paid separately).
   */
  const attendMeeting = (meeting, choice) => {
    const atResult = awardOnce(`attend:${meeting.id}`, meeting.xp, (l) => ({
      attendance: { ...l.attendance, [meeting.id]: { ts: Date.now(), choiceId: choice?.id || null } },
    }));
    const choiceResult = choice ? awardOnce(`choice:${meeting.id}:${choice.id}`, choice.xp, () => ({})) : { earned: 0, newStamps: [] };
    return {
      earned: atResult.earned + choiceResult.earned,
      xp: logRef.current.xp,
      rankUp: choiceResult.rankUp || atResult.rankUp,
      newStamps: [...atResult.newStamps, ...choiceResult.newStamps],
    };
  };

  /**
   * Field Office: complete a side quest → files a field note to your passport.
   */
  const completeQuest = (quest) => {
    const result = awardOnce(`quest:${quest.id}`, quest.xp, (l) => ({
      fieldNotes: [...(l.fieldNotes || []), { questId: quest.id, ts: Date.now() }],
    }));
    return result;
  };

  /**
   * Step 4: file the player's own next-question to their passport. Pays a
   * one-shot "next-question" XP the first time; later ones are free but still
   * recorded, so the "What I want to explore next" card keeps growing.
   */
  const writeInquiry = (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return { earned: 0, xp: logRef.current.xp, rankUp: null, newStamps: [] };
    const already = (logRef.current.inquiries || []).some((q) => q.text === trimmed);
    const firstEver = (logRef.current.inquiries || []).length === 0;
    const key = `inquiry:${trimmed}`;
    const rankBefore = rankForXp(logRef.current.xp);
    mutate((l) => ({
      ...l,
      inquiries: already ? (l.inquiries || []) : [...(l.inquiries || []), { text: trimmed, ts: Date.now() }],
      // Only the very first written question pays XP; repeats are free.
      xp: firstEver && !logRef.current.claimedOnce[key] ? l.xp + 15 : l.xp,
      claimedOnce: firstEver && !logRef.current.claimedOnce[key]
        ? { ...l.claimedOnce, [key]: { xp: 15, ts: Date.now() } }
        : l.claimedOnce,
    }));
    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: firstEver ? 15 : 0,
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
    };
  };

  /**
   * Step 5 hook: log a peer review on a trail (feeds the Mentor stamp).
   */
  const logReview = (trailId, focus) => {
    const key = `review:${trailId}`;
    if ((logRef.current.reviews || []).some((r) => r.trailId === trailId)) {
      return { earned: 0, xp: logRef.current.xp, rankUp: null, newStamps: [] };
    }
    const result = awardOnce(key, 30, (l) => ({
      reviews: [...(l.reviews || []), { trailId, focus, ts: Date.now() }],
    }));
    return result;
  };

  /**
   * Settle any stamp whose predicate now holds but hasn't been earned yet.
   * Each first-time earn pays its bonusXp, which itself can unlock further
   * stamps — so this loops to a fixed point. Returns every newly-earned
   * stamp (in earn order) so the caller can toast them.
   */
  const settleStamps = () => {
    const earned = [];
    let pass;
    do {
      pass = null;
      for (const stamp of STAMP_CATALOG) {
        if (logRef.current.earnedStamps.includes(stamp.id)) continue;
        let ok = false;
        try {
          ok = stamp.check(checkState());
        } catch {
          ok = false;
        }
        if (ok) {
          pass = stamp;
          break;
        }
      }
      if (pass) {
        earned.push(pass);
        mutate((l) => ({
          ...l,
          xp: l.xp + pass.bonusXp,
          earnedStamps: [...l.earnedStamps, pass.id],
          claimedOnce: { ...l.claimedOnce, [`stamp:${pass.id}`]: { xp: pass.bonusXp, ts: Date.now() } },
        }));
      }
    } while (pass);
    return earned;
  };

  const xp = log.xp;
  return {
    log,
    xp,
    streak: log.streak,
    shortlist: log.shortlist,
    invited: log.invited,
    earnedStamps: log.earnedStamps || [],
    attendance: log.attendance || {},
    fieldNotes: log.fieldNotes || [],
    reviews: log.reviews || [],
    inquiries: log.inquiries || [],
    rank: rankForXp(xp),
    nextRank: nextRankForXp(xp),
    progressPct: rankProgressPct(xp),
    cq: cqFromXp(xp),
    touchVisit,
    award,
    toggleShortlist,
    registerInvite,
    attendMeeting,
    completeQuest,
    logReview,
    writeInquiry,
    settleStamps,
    resetLog,
  };
}
