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
    tourDone: false,    // 90-second guided tour finished (all goals met)
    tourSkipped: false, // user dismissed the briefing instead
    yourPassportVisited: false,
    // Custom Explorer Profile
    profile: {
      name: 'You',
      discipline: 'Independent Explorer (You)',
      university: 'The Curiosity Passport Cohort',
      gradYear: 'Class of 2026',
      location: 'San Francisco, CA',
      coverTag: 'Self-Direction · Your Own Inquiry · Open Question',
      intro: "This is the passport you are writing right now. It starts empty — no trails, no artifacts, no stamps. Every trail you open, stage you trace, meeting you attend, and field note you file is recorded here as evidence of how you think when the question is your own.",
      careerAspirations: "To build a working record of curiosity: open questions, tested hypotheses, and artifacts that survive a stranger's scrutiny.",
      interests: [
        'Open Questions',
        'First-Principles Thinking',
        'Fieldwork',
        'Self-Directed Learning'
      ],
    },
    profileCustomized: false,
    createdTrails: [],
    outreachMessages: [],
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

  /**
   * Load a rich demo portfolio in one shot — the "show it working" button.
   * The log is built as data (not by replaying every action), and its XP is
   * chosen so the settled stamps add up to exactly that total, keeping the
   * rank and CQ numbers honest.
   */
  const seedDemo = () => {
    const log = emptyLog();
    // Seed timestamps back-dated from "now"; the event-handler runs off
    // render, so Date.now() is safe here (the purity rule just can't tell).
    // eslint-disable-next-line react/purity
    const now = Date.now();
    const day = 86_400_000;

    const openTrails = [
      'sustainable-fashion',
      'reverse-logistics',
      'carbon-accounting',
      'icu-alarm-fatigue',
      'ambient-audio-scribing',
      'multi-modal-latency',
      'mycelium-cold-chain',
      'cotton-trash-substrate',
      'bio-foam-waterproofing',
    ];
    const stageCounts = {
      'sustainable-fashion': 6,
      'reverse-logistics': 4,
      'carbon-accounting': 2,
      'icu-alarm-fatigue': 4,
      'ambient-audio-scribing': 3,
      'multi-modal-latency': 4,
      'mycelium-cold-chain': 4,
      'cotton-trash-substrate': 4,
      'bio-foam-waterproofing': 3,
    };

    // Trail openings, reads, and completions.
    log.claimedOnce = {};
    log.exploredTrails = {};
    for (const id of openTrails) {
      log.claimedOnce[`openTrail:${id}`] = { xp: XP_ACTIONS.openTrail.xp, ts: now - 3 * day };
      log.exploredTrails[id] = {
        stagesRead: stageCounts[id],
        complete: id === 'sustainable-fashion' || id === 'mycelium-cold-chain',
        firstTs: now - 5 * day,
        lastTs: now - day,
      };
      for (let i = 1; i <= stageCounts[id]; i += 1) {
        log.claimedOnce[`readStage:${id}:stage-${i}`] = { xp: XP_ACTIONS.readStage.xp, ts: now - 2 * day };
      }
    }
    for (const id of ['sustainable-fashion', 'mycelium-cold-chain']) {
      log.claimedOnce[`completeTrail:${id}`] = { xp: XP_ACTIONS.completeTrail.xp, ts: now - day };
    }

    // A week of meetings, each with its follow-up choice (week 1, full pay).
    const choiceXp = {
      'mon-standup': 'pool-data',
      'mentor-1on1': 'decision',
      'demo-day-prep': 'pitch-next',
      'career-panel': 'ask-failure',
      'recruiter-coffee': 'lead-question',
      'lab-open': 'replicate',
    };
    const choiceTable = {
      'mon-standup': 15, 'mentor-1on1': 20, 'demo-day-prep': 20,
      'career-panel': 20, 'recruiter-coffee': 20, 'lab-open': 15,
    };
    for (const [mid, choiceId] of Object.entries(choiceXp)) {
      log.attendance[mid] = { ts: now - 2 * day, week: 1, choiceId };
      log.claimedOnce[`attend:${mid}:w1`] = { xp: 25, ts: now - 2 * day };
      // choiceTable is keyed by MEETING id (the selected choice's XP), not
      // by the choice id — using the choice id here would yield undefined.
      log.claimedOnce[`choice:${mid}:${choiceId}`] = { xp: choiceTable[mid], ts: now - 2 * day };
    }
    log.attendanceTotal = 6;

    // Two filed side quests.
    log.fieldNotes = [
      { questId: 'q-teardown-10k', ts: now - 4 * day },
      { questId: 'q-field-note', ts: now - 4 * day },
    ];
    log.claimedOnce['quest:q-teardown-10k'] = { xp: 40, ts: now - 4 * day };
    log.claimedOnce['quest:q-field-note'] = { xp: 20, ts: now - 4 * day };

    // A peer review on a classmate's trail with detailed commentary.
    log.reviews = [{
      trailId: 'multi-modal-latency',
      focus: 'The 600ms flow-break threshold is the sharpest insight in the set',
      note: 'The 600ms boundary matches what we observed in telemetry—operator loops break at exactly this threshold.',
      reviewer: 'You',
      ts: now - 3 * day,
    }];
    log.claimedOnce['review:multi-modal-latency'] = { xp: 30, ts: now - 3 * day };
    log.claimedOnce['reviewDetail:multi-modal-latency'] = { xp: 40, ts: now - 3 * day };

    // One open question written onto the player's passport.
    log.inquiries = [{ text: 'Do ambient scribing devices change how much patients volunteer, once the first few consultations settle?', ts: now - day }];
    log.claimedOnce['inquiry:Do ambient scribing devices change how much patients volunteer, once the first few consultations settle?'] = { xp: 15, ts: now - day };

    // Explorer Profile customization
    log.profileCustomized = true;
    log.profile = {
      name: 'Alex Rivera',
      discipline: 'Computational Energy Systems & Microgrids',
      university: 'MIT Energy Initiative Cohort',
      gradYear: 'Class of 2026',
      location: 'Boston, MA',
      coverTag: 'Distributed Energy · Grid Edge Intelligence · Unit Economics',
      intro: 'Exploring how decentralized battery microgrids can maintain frequency regulation without relying on natural gas peaker plants.',
      careerAspirations: 'To lead grid-edge software architecture and hardware-in-the-loop validation for climate infrastructure companies.',
      interests: ['Grid Resilience', 'Energy Storage', 'Power Electronics', 'Stochastic Modeling'],
    };
    log.claimedOnce['profile:customized'] = { xp: 25, ts: now - 5 * day };

    // An authored original curiosity trail
    const demoAuthoredTrail = {
      id: 'user-trail-microgrid',
      shortLabel: 'Microgrid Frequency Resilience',
      studentId: 'you',
      studentName: 'Alex Rivera',
      studentRole: 'Computational Energy Systems, MIT Energy Cohort',
      title: 'Can residential battery microgrids stabilize regional frequency swings at sub-second latency?',
      subtitle: 'An empirical investigation into grid-forming inverter dispatch and stochastic response latency.',
      status: 'Synthesized & Published',
      startedDate: 'Nov 2024',
      completedDate: 'Feb 2025',
      readTime: '6 min explore',
      tags: ['Energy Tech', 'Grid Resilience', 'Embedded Controls', 'Unit Economics'],
      curiosityRating: 'Platform Highlight',
      whyCurious: 'During grid strains, peaker plants run at $1,200/MWh while thousands of neighborhood battery storage units sit idle due to latency in telemetry aggregation. I wanted to see if peer-to-peer droop control could bypass centralized dispatch entirely.',
      nodes: [
        {
          id: 'node-1',
          stepNumber: '01',
          phase: 'Spark & Field Observation',
          title: 'Peaker Economics vs. Distributed Idle Storage',
          date: 'Nov 2024',
          summary: 'Analyzed ISO-NE real-time LMP pricing during high-volatility events against neighborhood solar-battery telemetry.',
          body: 'Telemetry showed residential storage response took 4.2 seconds to initiate under cloud aggregator API calls—just slow enough to miss the primary frequency response window.',
          keyTakeaway: 'Centralized API aggregators are fundamentally unsuited for primary frequency response; sub-200ms local autonomous response is required.',
          evidenceType: 'Market Analysis & Telemetry',
        },
        {
          id: 'node-2',
          stepNumber: '02',
          phase: 'Hardware Prototype & Testbench',
          title: 'Benchtop Droop Control on 48V Micro-Inverter Rig',
          date: 'Dec 2024',
          summary: 'Built a hardware-in-the-loop testbench measuring local line frequency with 0.005Hz precision at 100Hz sampling rate.',
          body: 'By computing local frequency derivative (RoCoF) on an STM32 MCU, the inverter autonomous trigger kicked in within 68ms—cutting peaker reliance by 80% in simulated grid drops.',
          keyTakeaway: 'Autonomous local sensing eliminates network jitter and proves grid-forming resilience at edge nodes.',
          evidenceType: 'Hardware Testbench',
        },
        {
          id: 'node-3',
          stepNumber: '03',
          phase: 'Synthesized Framework & Artifact',
          title: 'The Edge-Grid Dispatch Protocol & Open Model',
          date: 'Feb 2025',
          summary: 'Published the simulation suite and open hardware schematics for edge-triggered micro-inverters.',
          body: 'Presented findings to regional operators. The model shows an aggregate 5MW microgrid cluster can displace a 20MW peaker unit during the critical 10-second transition window.',
          keyTakeaway: 'The future grid is bottom-up, decentralized, and governed by autonomous local physics.',
          evidenceType: 'Simulation & Whitepaper',
        },
      ],
      resultingProjectTitle: 'EdgeDroop: Sub-100ms Frequency Controller',
      resultingProjectSummary: 'Open-source embedded firmware and Python simulation model demonstrating autonomous frequency support on microgrids.',
      resultingProjectLink: 'https://github.com/curiosity-cohort/edgedroop-firmware',
      keyInsight: 'Autonomous edge sensing replaces telemetry latency with physics-driven local actuation.',
      isUserCreated: true,
    };
    log.createdTrails = [demoAuthoredTrail];
    log.claimedOnce['publishTrail:user-trail-microgrid'] = { xp: 100, ts: now - 2 * day };
    log.exploredTrails['user-trail-microgrid'] = {
      stagesRead: 3,
      complete: true,
      firstTs: now - 2 * day,
      lastTs: now - day,
    };

    // Outreach Messages
    log.outreachMessages = [
      {
        id: 'outreach-seed-1',
        studentId: 'priya-chen',
        studentName: 'Priya Patel',
        companyName: 'Anthropic',
        roleType: 'Research & Prototyping Lead',
        personalNote: 'Priya, your work on multi-modal latency curves is exceptional. We would love to talk about your audio pipeline benchmarks.',
        stage: 'Offer',
        ts: now - 6 * day,
      },
      {
        id: 'outreach-seed-2',
        studentId: 'alex-morgan',
        studentName: 'Alex Morgan',
        companyName: 'Patagonia',
        roleType: 'Strategy & Operations Associate',
        personalNote: 'Alex, your analysis on sub-40 evergreen SKUs resonated deeply with our circular product team.',
        stage: 'Replied',
        ts: now - 6 * day,
      },
    ];

    // Recruiter pipeline mid-flight: one offer, one interview, one reply.
    const stages = {
      'priya-chen': 'Offer',
      'marcus-vance': 'Interview',
      'alex-morgan': 'Replied',
    };
    log.invited = Object.keys(stages);
    log.inviteStatus = {};
    log.shortlist = ['alex-morgan', 'priya-chen', 'marcus-vance'];
    for (const [sid, stage] of Object.entries(stages)) {
      log.claimedOnce[`invite:${sid}`] = { xp: XP_ACTIONS.invite.xp, ts: now - 6 * day };
      log.claimedOnce[`shortlist:${sid}`] = { xp: XP_ACTIONS.shortlist.xp, ts: now - 6 * day };
      log.inviteStatus[sid] = { stage, sentTs: now - 6 * day, ts: now - day };
    }

    // Streak: yesterday plus today.
    log.streak = 2;
    log.lastVisitDay = todayStr();

    // Total the action XP that the claimed keys imply, so the rank ladder
    // and CQ read honestly off the seeded activity. Stamp bonuses are then
    // added on top by the real settleStamps() — the same path the app uses.
    log.xp = Object.values(log.claimedOnce).reduce((sum, c) => sum + c.xp, 0);

    mutate(() => log);
    const settled = settleStamps();
    return { seeded: true, xp: logRef.current.xp, newStamps: settled };
  };

  /**
   * Export the field log as a JSON blob and trigger a browser download.
   * The file is versioned so future imports can migrate.
   */
  const exportFieldLog = () => {
    const payload = {
      format: 'curiosity-passport-fieldlog',
      version: 1,
      exportedAt: new Date().toISOString(),
      log: logRef.current,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curiosity-field-log-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return payload;
  };

  /**
   * Import a previously-exported field log (file object or raw JSON string).
   * Validates the shape and replaces the current log. Returns
   * { ok, error?, xp? } so the caller can toast the outcome.
   */
  const importFieldLog = async (fileOrText) => {
    try {
      const text = typeof fileOrText === 'string' ? fileOrText : await fileOrText.text();
      const parsed = JSON.parse(text);
      const raw = parsed.log && parsed.format === 'curiosity-passport-fieldlog' ? parsed.log : parsed;
      if (typeof raw.xp !== 'number' || typeof raw.claimedOnce !== 'object') {
        return { ok: false, error: 'Not a valid field log export.' };
      }
      const next = { ...emptyLog(), ...raw };
      next.lastVisitDay = todayStr();
      mutate(() => next);
      const newStamps = settleStamps();
      return { ok: true, xp: next.xp, newStamps };
    } catch {
      return { ok: false, error: 'Could not read that file — expected a field log export (.json).' };
    }
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
    tourDone: logRef.current.tourDone,
    yourPassportVisited: logRef.current.yourPassportVisited,
    createdTrails: logRef.current.createdTrails || [],
    profileCustomized: !!logRef.current.profileCustomized,
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
   * Guided tour: record that the player opened their own "you" passport.
   */
  const markPassportVisit = () => {
    if (logRef.current.yourPassportVisited) return;
    mutate((l) => ({ ...l, yourPassportVisited: true }));
  };

  /**
   * Guided tour: mark it complete (pays a one-shot 50 XP bonus) or skip it.
   * Either way the briefing card is not shown again.
   */
  const completeTour = () => {
    if (logRef.current.tourDone || logRef.current.tourSkipped) {
      return { earned: 0, xp: logRef.current.xp, rankUp: null, newStamps: [] };
    }
    const result = awardOnce('tour:complete', 50, (l) => ({ ...l, tourDone: true }));
    return result;
  };

  const skipTour = () => {
    if (logRef.current.tourDone || logRef.current.tourSkipped) return;
    mutate((l) => ({ ...l, tourSkipped: true }));
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
  const logReview = (trailId, focus, note = '') => {
    return logDetailedReview(trailId, focus, note);
  };

  /**
   * In-depth peer review with written commentary.
   */
  const logDetailedReview = (trailId, focus, note = '') => {
    const key = `review:${trailId}`;
    const detailKey = `reviewDetail:${trailId}`;
    const hasNote = Boolean(note && note.trim().length > 0);
    const willEarnBase = !logRef.current.claimedOnce[key];
    const willEarnDetail = hasNote && !logRef.current.claimedOnce[detailKey];
    const rankBefore = rankForXp(logRef.current.xp);

    const baseEarn = willEarnBase ? 30 : 0;
    const detailEarn = willEarnDetail ? (XP_ACTIONS.detailedReview?.xp || 40) : 0;
    const totalEarn = baseEarn + detailEarn;

    mutate((l) => {
      const existingReviews = l.reviews || [];
      const updatedReviews = existingReviews.some((r) => r.trailId === trailId)
        ? existingReviews.map((r) => (r.trailId === trailId ? { ...r, focus, note, ts: Date.now() } : r))
        : [...existingReviews, { trailId, focus, note, reviewer: l.profile?.name || 'You', ts: Date.now() }];

      let updated = {
        ...l,
        reviews: updatedReviews,
      };

      if (willEarnBase) {
        updated.claimedOnce = { ...updated.claimedOnce, [key]: { xp: 30, ts: Date.now() } };
      }
      if (willEarnDetail) {
        updated.claimedOnce = { ...updated.claimedOnce, [detailKey]: { xp: detailEarn, ts: Date.now() } };
      }
      updated.xp += totalEarn;
      return updated;
    });

    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: totalEarn + newStamps.reduce((sum, s) => sum + s.bonusXp, 0),
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
    };
  };

  /**
   * Update the explorer's own profile. First time pays one-shot 25 XP and
   * awards the Field Identity stamp.
   */
  const updateProfile = (fields) => {
    const isFirstTime = !logRef.current.profileCustomized;
    const rankBefore = rankForXp(logRef.current.xp);
    const xpAction = XP_ACTIONS.updateProfile;
    const key = 'profile:customized';
    const willEarn = isFirstTime && !logRef.current.claimedOnce[key];

    mutate((l) => {
      const mergedProfile = { ...(l.profile || emptyLog().profile), ...fields };
      let updated = {
        ...l,
        profile: mergedProfile,
        profileCustomized: true,
      };
      if (willEarn) {
        updated.xp += xpAction.xp;
        updated.claimedOnce = { ...updated.claimedOnce, [key]: { xp: xpAction.xp, ts: Date.now() } };
      }
      return updated;
    });

    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: (willEarn ? xpAction.xp : 0) + newStamps.reduce((sum, s) => sum + s.bonusXp, 0),
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
      profile: logRef.current.profile,
    };
  };

  /**
   * Author & publish an original curiosity trail to the player's passport.
   * Awards 100 XP one-shot per trail, marks it explored/complete, and settles
   * the Published Author stamp.
   */
  const publishTrail = (trailData) => {
    // eslint-disable-next-line react/purity
    const id = trailData.id || `user-trail-${Date.now()}`;
    const key = `publishTrail:${id}`;
    const authorName = logRef.current.profile?.name || 'You';
    // eslint-disable-next-line react/purity
    const pubDate = trailData.publishedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const completeTrail = {
      ...trailData,
      id,
      studentId: 'you',
      studentName: authorName,
      studentRole: `${logRef.current.profile?.discipline || 'Independent Explorer'}, ${logRef.current.profile?.university || 'Curiosity Cohort'}`,
      isUserCreated: true,
      publishedDate: pubDate,
      nodes: (trailData.nodes || []).map((node, i) => ({
        ...node,
        stepNumber: String(i + 1).padStart(2, '0'),
      })),
    };

    const willEarn = !logRef.current.claimedOnce[key];
    const rankBefore = rankForXp(logRef.current.xp);
    const xp = XP_ACTIONS.publishTrail.xp;

    mutate((l) => {
      const existingIdx = (l.createdTrails || []).findIndex((t) => t.id === id);
      const updatedCreated = existingIdx >= 0
        ? l.createdTrails.map((t, i) => (i === existingIdx ? completeTrail : t))
        : [...(l.createdTrails || []), completeTrail];

      const stageCount = completeTrail.nodes?.length || 1;
      let updated = {
        ...l,
        createdTrails: updatedCreated,
        exploredTrails: {
          ...(l.exploredTrails || {}),
          [id]: {
            stagesRead: stageCount,
            complete: true,
            firstTs: Date.now(),
            lastTs: Date.now(),
          },
        },
      };

      if (willEarn) {
        updated.xp += xp;
        updated.claimedOnce = { ...updated.claimedOnce, [key]: { xp, ts: Date.now() } };
      }
      return updated;
    });

    const newStamps = settleStamps();
    const rankAfter = rankForXp(logRef.current.xp);
    return {
      earned: (willEarn ? xp : 0) + newStamps.reduce((sum, s) => sum + s.bonusXp, 0),
      xp: logRef.current.xp,
      rankUp: rankAfter.index > rankBefore.index ? rankAfter : null,
      newStamps,
      trail: completeTrail,
    };
  };

  /**
   * Delete an authored trail.
   */
  const deleteCreatedTrail = (trailId) => {
    mutate((l) => ({
      ...l,
      createdTrails: (l.createdTrails || []).filter((t) => t.id !== trailId),
    }));
  };

  /**
   * Send detailed recruiter outreach, recording full message text and timeline.
   */
  const sendDetailedOutreach = ({ studentId, studentName, companyName, roleType, personalNote }) => {
    const inviteResult = registerInvite(studentId);
    mutate((l) => {
      const newMsg = {
        id: `outreach-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        studentId,
        studentName,
        companyName,
        roleType,
        personalNote,
        stage: INVITE_STAGES[0],
        ts: Date.now(),
      };
      return {
        ...l,
        outreachMessages: [newMsg, ...(l.outreachMessages || [])],
      };
    });
    return inviteResult;
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
    tourDone: log.tourDone || false,
    tourSkipped: log.tourSkipped || false,
    yourPassportVisited: log.yourPassportVisited || false,
    profile: log.profile || emptyLog().profile,
    profileCustomized: !!log.profileCustomized,
    createdTrails: log.createdTrails || [],
    outreachMessages: log.outreachMessages || [],
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
    logDetailedReview,
    updateProfile,
    publishTrail,
    deleteCreatedTrail,
    sendDetailedOutreach,
    writeInquiry,
    noteTrailActivity,
    advanceInvite,
    completeTour,
    skipTour,
    markPassportVisit,
    settleStamps,
    resetLog,
    seedDemo,
    exportFieldLog,
    importFieldLog,
  };
}
