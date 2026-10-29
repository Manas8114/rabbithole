import React from 'react';
import { X, Lock, RotateCcw } from 'lucide-react';
import { STAMP_CATALOG, STAMP_ICONS } from '../data/gamificationData';

/**
 * The stamp collection — every achievement in the catalog, rendered as
 * passport seals. Earned stamps ink in brass/forest; unearned ones render
 * ghosted with their unlock condition.
 */
export function StampCollectionModal({ isOpen, onClose, earnedStamps, xp, onResetLog }) {
  if (!isOpen) return null;

  const earnedSet = new Set(earnedStamps || []);
  const earnedCount = earnedSet.size;

  return (
    <div className="modal-overlay stamp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog stamp-collection-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              FIELD OFFICE RECORDS
            </span>
            <h3>
              Stamp Collection{' '}
              <span className="stamp-collection-count">{earnedCount}/{STAMP_CATALOG.length}</span>
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-600)', marginTop: '0.25rem' }}>
              {xp} XP logged · seals are permanent once earned.
            </p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close stamp collection">
            <X size={20} />
          </button>
        </div>

        <div className="stamp-grid">
          {STAMP_CATALOG.map((stamp, idx) => {
            const Icon = STAMP_ICONS[stamp.icon] || STAMP_ICONS.Compass;
            const earned = earnedSet.has(stamp.id);
            return (
              <div
                key={stamp.id}
                className={`stamp-card ${earned ? 'stamp-earned' : 'stamp-locked'}`}
                style={{ animationDelay: `${Math.min(idx * 45, 400)}ms` }}
              >
                <div className="stamp-seal">
                  {earned ? <Icon size={26} /> : <Lock size={20} />}
                </div>
                <div className="stamp-card-body">
                  <div className="stamp-card-top">
                    <strong>{stamp.name}</strong>
                    <span className="mono-stamp">{stamp.stampCode}</span>
                  </div>
                  <p>{stamp.desc}</p>
                  <div className="stamp-bonus">+{stamp.bonusXp} XP on earn</div>
                </div>
              </div>
            );
          })}
        </div>

        {onResetLog && (
          <div className="stamp-collection-footer">
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-500)' }}>
              Demo controls — the field log lives in this browser only.
            </span>
            <button onClick={onResetLog} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} />
              <span>Reset Field Log</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
