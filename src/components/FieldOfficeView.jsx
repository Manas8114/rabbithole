import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  PenLine,
  GraduationCap,
  ArrowRight,
  MessageSquareQuote,
  Sparkles,
} from 'lucide-react';
import { MEETINGS, QUESTS, MEETING_ICONS } from '../data/gamificationData';

/**
 * The Field Office: a workplace layer on top of the portfolio tour.
 * A weekly meeting schedule with real decisions, a quest board of side
 * tasks, and the field notes those complete — filed to your passport.
 */
export function FieldOfficeView({ fieldLog, onShowToast, onAwardLabel }) {
  const [activeMeetingId, setActiveMeetingId] = useState(null);
  const attendance = fieldLog.attendance || {};
  const activeMeeting = MEETINGS.find((m) => m.id === activeMeetingId) || MEETINGS[0];

  // Today's focus: the next un-attended meeting, else the first open quest.
  const nextMeeting = MEETINGS.find((m) => !attendance[m.id]);
  const nextQuest = QUESTS.find((q) => !(fieldLog.fieldNotes || []).some((n) => n.questId === q.id));
  const focus = nextMeeting
    ? { kind: 'meeting', item: nextMeeting }
    : nextQuest
      ? { kind: 'quest', item: nextQuest }
      : null;

  const handleAttend = (meeting, choice) => {
    const result = fieldLog.attendMeeting(meeting, choice);
    onShowToast?.(`Checked in to ${meeting.title}. ${choice ? choice.label : ''}`);
    onAwardLabel?.(result);
    setActiveMeetingId(meeting.id);
  };

  const handleCompleteQuest = (quest) => {
    const result = fieldLog.completeQuest(quest);
    onShowToast?.(`Field note filed: "${quest.title}"`);
    onAwardLabel?.(result);
  };

  const announcedTotal = MEETINGS.filter((m) => attendance[m.id]).length;

  return (
    <div className="content-wrap field-office-wrap">
      {/* Section header */}
      <div className="field-office-hero">
        <div>
          <span className="mono-stamp" style={{ color: 'var(--brass-300)' }}>FIELD OFFICE</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--ink-950)', margin: '0.35rem 0 0.5rem' }}>
            The working week
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink-700)', maxWidth: '52ch', lineHeight: '1.6' }}>
            Curiosity here is a job, not a hobby. Show up to the cohort schedule, make
            the call, and let your field log record it — attendance, choices, and
            filed notes all become part of the portfolio.
          </p>
        </div>
        <div className="field-office-summary">
          <div>
            <div className="field-office-summary-num">{announcedTotal}/{MEETINGS.length}</div>
            <div className="field-office-summary-label">meetings attended</div>
          </div>
          <div>
            <div className="field-office-summary-num">{(fieldLog.fieldNotes || []).length}/{QUESTS.length}</div>
            <div className="field-office-summary-label">field notes filed</div>
          </div>
          <div>
            <div className="field-office-summary-num">{fieldLog.streak}</div>
            <div className="field-office-summary-label">day streak</div>
          </div>
        </div>
      </div>

      {/* Today's focus */}
      {focus && (
        <button
          className="focus-card"
          onClick={() => (focus.kind === 'meeting' ? setActiveMeetingId(focus.item.id) : undefined)}
        >
          <div className="focus-card-kicker">
            <Sparkles size={14} style={{ color: 'var(--brass-500)' }} />
            <span>TODAY'S FOCUS</span>
          </div>
          <div className="focus-card-body">
            {focus.kind === 'meeting' ? (
              <>
                <strong>{focus.item.title} · {focus.item.day} {focus.item.time}</strong>
                <span>{focus.item.agenda}</span>
              </>
            ) : (
              <>
                <strong>File the field note: {focus.item.title}</strong>
                <span>{focus.item.desc}</span>
              </>
            )}
          </div>
          <ArrowRight size={18} className="focus-card-arrow" />
        </button>
      )}

      {/* Weekly schedule */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <CalendarDays size={20} style={{ color: 'var(--forest-700)' }} />
          <h2 style={{ fontSize: '1.35rem', color: 'var(--ink-950)' }}>This Week's Schedule</h2>
          <span className="mono-stamp" style={{ color: 'var(--ink-500)' }}>
            {announcedTotal} OF {MEETINGS.length} ATTENDED
          </span>
        </div>

        <div className="meeting-week-strip">
          {MEETINGS.map((meeting) => {
            const Icon = MEETING_ICONS[meeting.icon] || Clock;
            const attended = !!attendance[meeting.id];
            const choiceId = attendance[meeting.id]?.choiceId;
            const choice = meeting.choices.find((c) => c.id === choiceId);
            const isActive = activeMeeting.id === meeting.id;
            return (
              <button
                key={meeting.id}
                onClick={() => handleAttend(meeting, null)}
                className={`meeting-card ${isActive ? 'active' : ''} ${attended ? 'attended' : ''}`}
              >
                <div className="meeting-card-head">
                  <span className="meeting-card-day">{meeting.day} · {meeting.time}</span>
                  {attended ? (
                    <CheckCircle2 size={16} style={{ color: 'var(--brass-500)' }} />
                  ) : (
                    <Clock size={14} style={{ color: 'var(--ink-500)' }} />
                  )}
                </div>
                <Icon size={22} className="meeting-card-icon" />
                <strong>{meeting.title}</strong>
                <span className="meeting-card-host">{meeting.host}</span>
                {attended && choice ? (
                  <span className="meeting-card-choice">
                    <MessageSquareQuote size={13} />
                    {choice.label}
                  </span>
                ) : (
                  <span className="meeting-card-cta">
                    {isActive ? 'Open for check-in ↓' : 'Tap to check in (+25 XP)'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active meeting deep-dive */}
      <section className="card-editorial meeting-detail" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <GraduationCap size={18} style={{ color: 'var(--forest-700)' }} />
          <span className="mono-stamp" style={{ color: 'var(--forest-700)' }}>NOW VIEWING</span>
        </div>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--ink-950)' }}>
          {activeMeeting.title} <span className="mono-stamp" style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>· {activeMeeting.day} {activeMeeting.time}</span>
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-700)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
          {activeMeeting.agenda}
        </p>

        {attendance[activeMeeting.id]?.choiceId ? (
          <div className="mentor-note">
            <MessageSquareQuote size={16} style={{ color: 'var(--brass-600)', flexShrink: 0 }} />
            <div>
              <strong>Mentor's Note (filed to your passport)</strong>
              <p>
                {activeMeeting.choices.find((c) => c.id === attendance[activeMeeting.id].choiceId)?.note}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--ink-600)' }}>
            Choose your follow-up — it's recorded, and it decides what lands in your notes:
          </div>
        )}

        <div className="meeting-choices">
          {activeMeeting.choices.map((choice) => {
            const chosen = attendance[activeMeeting.id]?.choiceId === choice.id;
            // Once a follow-up is recorded, the other options lock. A plain
            // check-in (no choice yet) leaves every option open.
            const choiceLocked = !!attendance[activeMeeting.id]?.choiceId;
            return (
              <button
                key={choice.id}
                onClick={() => handleAttend(activeMeeting, choice)}
                disabled={choiceLocked && !chosen}
                className={`meeting-choice-btn ${chosen ? 'chosen' : ''} ${choice.muted ? 'muted' : ''} ${choiceLocked && !chosen ? 'dimmed' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{choice.label}</span>
                  <span className="mono-stamp" style={{ color: 'var(--brass-600)', fontSize: '0.65rem' }}>
                    +{choice.xp} XP
                  </span>
                </div>
                {chosen && <p className="meeting-choice-note">{choice.note}</p>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Quest board */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <ClipboardCheck size={20} style={{ color: 'var(--forest-700)' }} />
          <h2 style={{ fontSize: '1.35rem', color: 'var(--ink-950)' }}>Side Quests</h2>
          <span className="mono-stamp" style={{ color: 'var(--ink-500)' }}>FIELD NOTES FILED AS PORTFOLIO EVIDENCE</span>
        </div>

        <div className="quest-grid">
          {QUESTS.map((quest) => {
            const done = (fieldLog.fieldNotes || []).some((n) => n.questId === quest.id);
            return (
              <div key={quest.id} className={`quest-card ${done ? 'done' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink-950)' }}>
                    {quest.title}
                  </strong>
                  <span className="mono-stamp" style={{ color: 'var(--brass-600)', fontSize: '0.6875rem' }}>
                    +{quest.xp} XP
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-600)', lineHeight: '1.55', marginBottom: '0.75rem' }}>
                  {quest.desc}
                </p>
                {done ? (
                  <div className="quest-done">
                    <CheckCircle2 size={14} />
                    <span>Field note filed</span>
                    <span className="quest-done-note">{quest.note}</span>
                  </div>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => handleCompleteQuest(quest)}>
                    <PenLine size={14} />
                    <span>Log the Field Note</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
