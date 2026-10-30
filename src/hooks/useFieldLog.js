import { useRef, useState } from 'react';
import { XP_ACTIONS, STAMP_CATALOG, INVITE_STAGES, rankForXp, nextRankForXp, rankProgressPct, cqFromXp } from '../data/gamificationData';

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
    reviews: [],      // logged peer reviews: [{ trailId, focus, ts }]
    inquiries: [],    // player-written next questions: [{ text, ts }]
    exploredTrails: {}, // { [trailId]: { stagesRead, complete, firstTs, lastTs } }
    inviteStatus: {}, // { [studentId]: { stage, sentTs } } — recruiter pipeline
    week: 1,            // which working week the Field Office is showing
    completedWeeks: [],
    attendanceTotal: 0, // lifetime meeting check-ins (stamps count this)
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
        updated.inviteStatus = {
          ...(l.inviteStatus || {}),
          [studentId]: { stage: INVITE_STAGES[0], sentTs: Date.now() },
        };
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
    inviteStatus: logRef.current.inviteStatus,
    week: logRef.current.week,
    completedWeeks: logRef.current.completedWeeks,
    attendanceTotal: logRef.current.attendanceTotal,
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
   * Field Office: attend a meeting and pick one follow-up choice.
   *
   * Week 1 pays the full amount (one-shot per meeting). When a week is
   * rolled with startNewWeek(), re-attending pays 40% of the meeting's XP
   * and re-picking a choice pays 5 XP — so the weekly habit keeps feeding
   * the log without the first week's numbers being replayed.
   */
  const attendMeeting = (meeting, choice) => {
    const week = logRef.current.week || 1;
    const atXp = week === 1 ? meeting.xp : Math.max(5, Math.round(meeting.xp * 0.4));
    const atResult = awardOnce(`attend:${meeting.id}:w${week}`, atXp, (l) => ({
      attendance: { ...l.attendance, [meeting.id]: { ts: Date.now(), week, choiceId: choice?.id || null } },
      // Lifetime counter only ticks when this check-in actually pays XP.
      attendanceTotal: l.attendanceTotal + 1,
    }));
    let choiceResult = { earned: 0, newStamps: [] };
    if (choice) {
      const choiceXp = week === 1 ? choice.xp : 5;
      choiceResult = week === 1
        ? awardOnce(`choice:${meeting.id}:${choice.id}`, choiceXp, () => ({}))
        : awardOnce(`choice:${meeting.id}:${choice.id}:w${week}`, choiceXp, () => ({}));
    }
    return {
      earned: atResult.earned + choiceResult.earned,
      xp: logRef.current.xp,
      rankUp: choiceResult.rankUp || atResult.rankUp,
      newStamps: [...atResult.newStamps, ...choiceResult.newStamps],
    };
  };

  /**
   * Field Office: close out the week and start the next one. Requires every
   * meeting to be attended this week (the caller passes meetingIds). Pays a
   * one-shot 50 XP week bonus and unlocks the "Reliable" stamp track.
   */
  const startNewWeek = (meetingIds) => {
    const week = logRef.current.week || 1;
    const allAttended = meetingIds.every((id) => (logRef.current.attendance || {})[id]?.week === week);
    if (!allAttended) return { started: false, week, xp: logRef.current.xp, newStamps: [] };
    mutate((l) => ({
      ...l,
      week: l.week + 1,
      attendance: {},
      completedWeeks: [...(l.completedWeeks || []), week],
    }));
    const bonusResult = awardOnce(`week-complete:${week}`, 50, () => ({}));
    return { started: true, week: logRef.current.week, xp: logRef.current.xp, bonus: bonusResult.earned, newStamps: bonusResult.newStamps };
  };

  /**
   * Recruiter pipeline: move an invite one stage forward (Sent → Replied →
   * Interview → Offer). Idempotent at the last stage. Settles any stamps
   * the new stage unlocks (In Conversation, Offers Maker). Returns
   * { stage, moved, newStamps } or null if the student has no invite.
   */
  const advanceInvite = (studentId) => {
    const cur = (logRef.current.inviteStatus || {})[studentId];
    if (!cur) return null;
    const idx = INVITE_STAGES.indexOf(cur.stage);
    if (idx < 0 || idx >= INVITE_STAGES.length - 1) {
      return { stage: cur.stage, moved: false, newStamps: [] };
    }
    const nextStage = INVITE_STAGES[idx + 1];
    mutate((l) => ({
      ...l,
      inviteStatus: {
        ...(l.inviteStatus || {}),
        [studentId]: { ...l.inviteStatus[studentId], stage: nextStage, ts: Date.now() },
      },
    }));
    const newStamps = settleStamps();
    return { stage: nextStage, moved: true, newStamps };
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
   * Record trail activity for the "you" passport ledger: which stages have
   * been read on each trail, and whether the trace was completed. No XP
   * here — that is paid by award(). Pure bookkeeping for the portfolio.
   */
  const noteTrailActivity = (trailId, stageNumber, isComplete) => {
    mutate((l) => {
      const prev = (l.exploredTrails || {})[trailId];
      const now = Date.now();
      return {
        ...l,
        exploredTrails: {
          ...(l.exploredTrails || {}),
          [trailId]: {
            stagesRead: Math.max(prev?.stagesRead || 0, stageNumber),
            complete: prev?.complete || isComplete,
            firstTs: prev?.firstTs || now,
            lastTs: now,
          },
        },
      };
    });
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
    exploredTrails: log.exploredTrails || {},
    inviteStatus: log.inviteStatus || {},
    week: log.week || 1,
    completedWeeks: log.completedWeeks || [],
    attendanceTotal: log.attendanceTotal || 0,
    rank: rankForXp(xp),
    nextRank: nextRankForXp(xp),
    progressPct: rankProgressPct(xp),
    cq: cqFromXp(xp),
    touchVisit,
    award,
    toggleShortlist,
    registerInvite,
    attendMeeting,
    startNewWeek,
    completeQuest,
    logReview,
    writeInquiry,
    noteTrailActivity,
    advanceInvite,
    settleStamps,
    resetLog,
  };
}
