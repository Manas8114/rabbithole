import React from 'react';
import { Award, Flame, Stamp } from 'lucide-react';

/**
 * Live career-track meter for the player's field log. Shows current rank,
 * the XP bar toward the next rank, the CQ, the earned-stamp tally, and the
 * return streak. Clicking it opens the stamp collection.
 */
export function RankMeter({ rank, nextRank, progressPct, cq, xp, streak, earnedStamps = [], onOpenStamps }) {
  const stampCount = earnedStamps.length;

  return (
    <button
      className="rank-meter"
      onClick={onOpenStamps}
      title={`Field log: ${xp} XP · CQ ${cq}/100${streak > 1 ? ` · ${streak}-day streak` : ''} · View stamp collection`}
      aria-label="Open your stamp collection"
    >
      <div className="rank-meter-top">
        <div className="rank-meter-label">
          <Award size={13} style={{ color: 'var(--brass-500)' }} />
          <span className="rank-meter-rank">{rank.name}</span>
        </div>
        <div className="rank-meter-cq">CQ {cq}</div>
      </div>

      <div className="rank-meter-track" aria-hidden="true">
        <div className="rank-meter-fill" style={{ width: `${progressPct}%` }}
          role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} />
      </div>

      <div className="rank-meter-sub">
        <span className="rank-stamps">
          <Stamp size={11} style={{ color: 'var(--brass-500)' }} />
          {stampCount}
        </span>
        <span className="mono-stamp" style={{ fontSize: '0.625rem' }}>
          {nextRank ? `Next: ${nextRank.name} @ ${nextRank.threshold} XP` : 'Top rank reached'}
        </span>
        {streak > 1 && (
          <span className="rank-streak">
            <Flame size={11} style={{ color: 'var(--brass-500)' }} />
            {streak}d
          </span>
        )}
      </div>
    </button>
  );
}
