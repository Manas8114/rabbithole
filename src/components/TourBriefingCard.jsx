import React from 'react';
import { Compass, CheckCircle2, Circle, Map } from 'lucide-react';

/**
 * The 90-second guided tour: a briefing card on the landing view that shows
 * four goals — read two trail stages, check into a Field Office meeting,
 * invite a candidate, and open your own passport. All four met unlocks the
 * Wayfinder stamp (+50 XP). Shown once, then never again.
 */
export function TourBriefingCard({ fieldLog, goals, onComplete, onSkip }) {
  if (fieldLog.tourDone || fieldLog.tourSkipped) return null;

  return (
    <div className="tour-card">
      <div className="tour-card-head">
        <Map size={18} style={{ color: 'var(--brass-500)' }} />
        <div>
          <span className="mono-stamp" style={{ color: 'var(--brass-600)' }}>FIRST VISIT · 90-SECOND TOUR</span>
          <h3>Try the whole loop, once</h3>
        </div>
      </div>
      <p className="tour-card-copy">
        This is the pitch in miniature: chase a question, show up for work, reach out,
        and collect the trail into your own passport.
      </p>

      <div className="tour-goals">
        {goals.map((goal) => (
          <button
            key={goal.id}
            className={`tour-goal ${goal.done ? 'done' : ''}`}
            onClick={() => goal.action && goal.action()}
            disabled={goal.done}
          >
            {goal.done ? <CheckCircle2 size={15} /> : <Circle size={15} />}
            <span>{goal.label}</span>
          </button>
        ))}
      </div>

      <div className="tour-card-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={onComplete}
          disabled={!goals.every((g) => g.done)}
          style={{ opacity: goals.every((g) => g.done) ? 1 : 0.5 }}
        >
          <Compass size={14} />
          <span>Finish the tour · +50 XP</span>
        </button>
        <button className="btn btn-secondary btn-sm tour-skip-btn" onClick={onSkip}>
          <span>Not now</span>
        </button>
      </div>
    </div>
  );
}
