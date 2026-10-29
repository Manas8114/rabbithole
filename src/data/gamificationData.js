// ===========================================================================
// Gamification foundation: rank ladder, XP actions, CQ scoring, and the
// stamp (achievement) catalog. Meetings/quests land in later steps.
// ===========================================================================
import {
  Compass,
  Map,
  BookOpen,
  Bookmark,
  Send,
  CalendarDays,
  Flame,
  Award,
  ShieldCheck,
  Clock,
  ClipboardCheck,
  Users,
  UserRound,
  Presentation,
  Briefcase,
  Coffee,
  FlaskConical,
  PenLine,
  CheckCircle2,
} from 'lucide-react';

// The career track your field log climbs through. Thresholds are cumulative XP.
export const RANKS = [
  { index: 0, name: 'Novice Cartographer', stampCode: 'CP-RANK-00', threshold: 0 },
  { index: 1, name: 'Field Researcher', stampCode: 'CP-RANK-01', threshold: 150 },
  { index: 2, name: 'Verified Explorer', stampCode: 'CP-RANK-02', threshold: 400 },
  { index: 3, name: 'Senior Analyst', stampCode: 'CP-RANK-03', threshold: 800 },
  { index: 4, name: 'Principal Investigator', stampCode: 'CP-RANK-04', threshold: 1400 },
  { index: 5, name: 'Curator-in-Chief', stampCode: 'CP-RANK-05', threshold: 2200 },
];

// Action → XP table. One-shot actions are keyed by a stable id so they pay
// exactly once per key (revisits never re-earn).
export const XP_ACTIONS = {
  openTrail:     { xp: 15, toast: 'Trail filed in your field log' },
  readStage:     { xp: 10, toast: 'Stage documented in your field log' },
  completeTrail: { xp: 40, toast: 'Full inquiry trace completed' },
  shortlist:     { xp: 5,  toast: 'Candidate filed to your shortlist' },
  invite:        { xp: 10, toast: 'Outreach logged in your field log' },
};

// Current rank for a given XP total (highest threshold reached).
export function rankForXp(xp) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.threshold) current = rank;
  }
  return current;
}

// Next rank, or null at the top of the ladder.
export function nextRankForXp(xp) {
  const current = rankForXp(xp);
  return RANKS[current.index + 1] || null;
}

// 0-100 fraction between current and next rank (100 when maxed).
export function rankProgressPct(xp) {
  const current = rankForXp(xp);
  const next = nextRankForXp(xp);
  if (!next) return 100;
  const band = next.threshold - current.threshold;
  return Math.min(100, Math.round(((xp - current.threshold) / band) * 100));
}

// Curiosity Quotient — the live number that climbs as your field log fills up.
// Caps at 100 exactly when the top rank is reached.
export function cqFromXp(xp) {
  return Math.min(100, Math.floor((xp / RANKS[RANKS.length - 1].threshold) * 100));
}

// ===========================================================================
// Stamp (achievement) catalog.
//
// Each stamp's `check(state)` is a pure predicate over the derived log state:
// { xp, streak, shortlist, invited, claimedOnce, attendance }
// `attendance` (meeting ids) and `reviews` land in later steps; checks that
// reference them simply stay locked until those steps ship.
// First unlock of a stamp pays its `bonusXp` exactly once.
// ===========================================================================
export const STAMP_CATALOG = [
  {
    id: 'first-trail',
    name: 'Trailblazer',
    stampCode: 'SEAL-001',
    icon: 'Compass',
    bonusXp: 25,
    desc: 'File your first curiosity trail in the field log.',
    check: (s) => Object.keys(s.claimedOnce || {}).some((k) => k.startsWith('openTrail:')),
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    stampCode: 'SEAL-002',
    icon: 'Map',
    bonusXp: 60,
    desc: 'Open all five curiosity trails across the cohort.',
    check: (s) => new Set(Object.keys(s.claimedOnce || {}).filter((k) => k.startsWith('openTrail:'))).size >= 5,
  },
  {
    id: 'deep-reader',
    name: 'Deep Reader',
    stampCode: 'SEAL-003',
    icon: 'BookOpen',
    bonusXp: 40,
    desc: 'Trace every stage of a single inquiry, start to finish.',
    check: (s) => Object.keys(s.claimedOnce || {}).some((k) => k.startsWith('completeTrail:')),
  },
  {
    id: 'curator',
    name: 'Curator',
    stampCode: 'SEAL-004',
    icon: 'Bookmark',
    bonusXp: 30,
    desc: 'Hold three candidates in your shortlist at once.',
    check: (s) => s.shortlist.length >= 3,
  },
  {
    id: 'allied',
    name: 'Allied',
    stampCode: 'SEAL-005',
    icon: 'Send',
    bonusXp: 25,
    desc: 'Log a recruiter outreach note on any explorer.',
    check: (s) => s.invited.length >= 1,
  },
  {
    id: 'diligent',
    name: 'Diligent',
    stampCode: 'SEAL-006',
    icon: 'CalendarDays',
    bonusXp: 50,
    desc: 'Attend three Field Office meetings.',
    check: (s) => (s.attendance?.length || 0) >= 3,
  },
  {
    id: 'streak-3',
    name: 'Return Visitor',
    stampCode: 'SEAL-007',
    icon: 'Flame',
    bonusXp: 40,
    desc: 'Keep a 3-day return streak alive.',
    check: (s) => s.streak >= 3,
  },
  {
    id: 'rank-200',
    name: 'Field Researcher',
    stampCode: 'SEAL-008',
    icon: 'Award',
    bonusXp: 40,
    desc: 'Reach 200 XP — the Field Researcher tier.',
    check: (s) => s.xp >= 200,
  },
  {
    id: 'rank-400',
    name: 'Verified Explorer',
    stampCode: 'SEAL-009',
    icon: 'ShieldCheck',
    bonusXp: 80,
    desc: 'Reach 400 XP — earn the same badge the cohort carries.',
    check: (s) => s.xp >= 400,
  },
  {
    id: 'fieldwork',
    name: 'Fieldworker',
    stampCode: 'SEAL-010',
    icon: 'PenLine',
    bonusXp: 40,
    desc: 'Complete a Field Office side quest and file the note.',
    check: (s) => (s.fieldNotes?.length || 0) >= 1,
  },
  {
    id: 'mentor',
    name: 'Mentor',
    stampCode: 'SEAL-011',
    icon: 'CheckCircle2',
    bonusXp: 40,
    desc: 'Leave a peer review on a classmate\'s trail.',
    check: (s) => (s.reviews?.length || 0) >= 1,
  },
  {
    id: 'question-writer',
    name: 'Question Writer',
    stampCode: 'SEAL-012',
    icon: 'PenLine',
    bonusXp: 25,
    desc: 'Write your own next question onto your passport.',
    check: (s) => (s.inquiries?.length || 0) >= 1,
  },
];

export const STAMP_ICONS = {
  Compass,
  Map,
  BookOpen,
  Bookmark,
  Send,
  CalendarDays,
  Flame,
  Award,
  ShieldCheck,
  Clock,
  ClipboardCheck,
  PenLine,
  CheckCircle2,
};

// ===========================================================================
// Field Office: the weekly meeting schedule.
// Attending pays `xp` once; the chosen follow-up pays its own `xp` once.
// The choice's `note` is filed to your passport as a mentor's comment.
// ===========================================================================
export const MEETINGS = [
  {
    id: 'mon-standup',
    day: 'Mon',
    time: '09:00',
    title: 'Cohort Standup',
    host: 'Ms. Rivera · Faculty Mentor',
    icon: 'Users',
    xp: 25,
    agenda: 'Ten minutes, standing: one insight and one blocker from your trails this week.',
    choices: [
      { id: 'pool-data', label: 'Flag a shared data gap and offer to pool 10-Ks', xp: 15, note: 'Rivera: "The cohort pools primary sources in the shared drive. That just became your first contribution."' },
      { id: 'ask-intros', label: 'Ask for operator introductions', xp: 15, note: 'Rivera: "Bring me the two names and the question you want answered — I will warm the line with a retired returns director."' },
      { id: 'headlines', label: 'Keep your block; share headlines only', xp: 5, note: 'Rivera: "Safe move. But the cohort trust ledger is where intros come from — feed it something."', muted: true },
    ],
  },
  {
    id: 'mentor-1on1',
    day: 'Tue',
    time: '15:00',
    title: 'Mentor 1:1',
    host: 'Dr. Okafor · Associate Professor, Ops',
    icon: 'UserRound',
    xp: 25,
    agenda: 'Thirty minutes, no slides. One hard question on the table.',
    choices: [
      { id: 'pressure-test', label: 'Pressure-test your key insight (ask which assumption to break first)', xp: 20, note: 'Okafor: "Bring back the falsification you ran. Assumptions that survive a real test are the only ones worth pitching."' },
      { id: 'scope-fear', label: 'Admit you cannot finish everything by Demo Day', xp: 15, note: 'Okafor: "Scope the one artifact you can defend end-to-end. Half-done portfolios read as noise."' },
      { id: 'decision', label: 'Bring a decision (two options, ask for the pick)', xp: 20, note: 'Okafor: "Second opinion on two options: you cannot argue with the data, only with the framing. Good instinct."' },
    ],
  },
  {
    id: 'demo-day-prep',
    day: 'Wed',
    time: '17:00',
    title: 'Demo Day Rehearsal',
    host: 'Full Cohort · Makerspace Bay 2',
    icon: 'Presentation',
    xp: 25,
    agenda: '90-second pitch rehearsal, peer feedback, no notes allowed after the first 30 seconds.',
    choices: [
      { id: 'pitch-next', label: 'Pitch the next question, not the finished trail', xp: 20, note: 'Panel: "The open question is the moat. Finished work is table stakes; unasked questions are the differentiator."' },
      { id: 'pitch-artifact', label: 'Pitch the artifact (model, prototype, brief)', xp: 15, note: 'Panel: "Good. But name the number the artifact defends — one, not five."' },
      { id: 'critique', label: 'Sit in and critique a peer instead', xp: 15, note: 'Panel: "Your critique of Priya\'s latency curve landed harder than half the pitches. Operators notice that."' },
    ],
  },
  {
    id: 'career-panel',
    day: 'Thu',
    time: '11:00',
    title: 'Industry Careers Panel',
    host: 'Employers from the Discovery Portal',
    icon: 'Briefcase',
    xp: 25,
    agenda: 'Three operators on early-career reality: first-year failures, ownership, and how they actually decide who to hire.',
    choices: [
      { id: 'ask-failure', label: 'Ask which mistake earned a promotion', xp: 20, note: 'Panel: "The one who owned the $400K returns surge error got the lead. Accountability is the currency; the mistake was the interest."' },
      { id: 'ask-path', label: 'Ask how they found their own field', xp: 15, note: 'Panel: "All three of us entered through a question we couldn\'t close. The field followed the question."' },
      { id: 'listen', label: 'Listen and take notes', xp: 5, note: 'Panel: "Quiet ones remembered best. Come back to us in the fall — and bring the question."', muted: true },
    ],
  },
  {
    id: 'recruiter-coffee',
    day: 'Thu',
    time: '16:30',
    title: 'Recruiter Coffee',
    host: 'Hiring Teams · 15-Minute Blocks',
    icon: 'Coffee',
    xp: 25,
    agenda: 'Fifteen minutes, off-resume. They want to hear how you think under ambiguity — not your GPA.',
    choices: [
      { id: 'lead-question', label: 'Lead with your central question', xp: 20, note: 'Recruiter: "That\'s the first candidate this cycle who opened on a question instead of a skill list. Send the one-pager."' },
      { id: 'day-90', label: 'Ask what strong ownership looks like in the first 90 days', xp: 15, note: 'Recruiter: "A one-pager, not a deck — we read notes, not presentations."' },
      { id: 'one-pager', label: 'Hand over a one-pager of your trail summary', xp: 15, note: 'Recruiter: "The margin model is sharper than two senior hires we\'ve had. We\'ll read it this week."' },
    ],
  },
  {
    id: 'lab-open',
    day: 'Fri',
    time: '14:00',
    title: 'Lab Open Hours',
    host: 'Cohort Makerspace · Shared Bench Time',
    icon: 'FlaskConical',
    xp: 25,
    agenda: 'Shared bench time: instrument checkouts, side-by-side builds, and replication attempts.',
    choices: [
      { id: 'replicate', label: 'Replicate a peer\'s experiment next to them', xp: 15, note: 'Makerspace: "Your replication held on two of three samples. Log the discrepancy — it\'s a finding, not a failure."' },
      { id: 'build-rig', label: 'Build your own rig (hot-plate, scanner, sensor)', xp: 15, note: 'Makerspace: "Label it with your procedure link when you leave it on the shelf. That\'s how tools get reused."' },
      { id: 'log-observations', label: 'Log your observations into the shared ledger', xp: 10, note: 'Makerspace: "The ledger is the point. Ninety seconds of notes now is a citation later."' },
    ],
  },
];

// ===========================================================================
// Field Office: side quests. Completing one files a field note to your
// passport and pays its xp once.
// ===========================================================================
export const QUESTS = [
  {
    id: 'q-teardown-10k',
    title: 'Tear Down One 10-K',
    desc: 'Read one operator\'s annual filing and write three margin questions it fails to answer.',
    xp: 40,
    note: 'Filed three 10-K margin questions into the shared drive — the cohort\'s source ledger grew by one good row.',
  },
  {
    id: 'q-hypothesis',
    title: 'Sketch a Falsifiable Hypothesis',
    desc: 'Write one prediction you can test this week — and the result that would kill it.',
    xp: 30,
    note: 'Logged a falsifiable hypothesis: predicted, tested-scope, and the kill condition all in one card.',
  },
  {
    id: 'q-interview',
    title: 'Book One Operator Interview',
    desc: 'Commit to a 30-minute conversation with a practitioner who isn\'t at your school.',
    xp: 40,
    note: 'Interview booked with a returns-logistics director; question list sent 48 hours ahead.',
  },
  {
    id: 'q-field-note',
    title: 'Log One Field Observation',
    desc: 'Write down one thing you observed in the world this week that contradicted your model.',
    xp: 20,
    note: 'Field note filed: one real-world contradiction, dated, with the model it broke attached.',
  },
  {
    id: 'q-share-artifact',
    title: 'Share One Artifact',
    desc: 'Publish a sheet, code, or brief so a peer can rebuild your work from it.',
    xp: 30,
    note: 'Artifact published to the cohort workspace — two peers have already forked it.',
  },
];

// Extra stamps unlocked by Field Office activity.
export const MEETING_ICONS = {
  Users,
  UserRound,
  Presentation,
  Briefcase,
  Coffee,
  FlaskConical,
};
