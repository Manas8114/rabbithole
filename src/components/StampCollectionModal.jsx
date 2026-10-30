import React, { useRef } from 'react';
import { X, Lock, RotateCcw, Download, Upload, FileText, PackageOpen } from 'lucide-react';
import { STAMP_CATALOG, STAMP_ICONS } from '../data/gamificationData';

/**
 * The stamp collection — every achievement in the catalog, rendered as
 * passport seals. Earned stamps ink in brass/forest; unearned ones render
 * ghosted with their unlock condition. The footer carries the carry-able
 * controls: export / import the field log, print the Curiosity Report, reset.
 */
export function StampCollectionModal({
  isOpen,
  onClose,
  earnedStamps,
  xp,
  onResetLog,
  onExport,
  onImportFile,
  onOpenReport,
  onSeedDemo,
}) {
  // Unconditional (before the early return) — hook order must be stable.
  const fileInput = useRef(null);
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

        <div className="stamp-collection-footer">
          <div className="stamp-footer-controls">
            <span className="mono-stamp" style={{ color: 'var(--brass-600)', fontSize: '0.625rem' }}>
              MAKE IT CARRY-ABLE
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary btn-sm" onClick={onExport} title="Download your field log as JSON">
                <Download size={14} />
                <span>Export Field Log</span>
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => fileInput.current?.click()} title="Import a previously-exported field log">
                <Upload size={14} />
                <span>Import</span>
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImportFile?.(file);
                  e.target.value = '';
                }}
              />
              <button className="btn btn-primary btn-sm" onClick={onOpenReport} title="Open the printable one-page Curiosity Report">
                <FileText size={14} />
                <span>Curiosity Report</span>
              </button>
            </div>
          </div>
          <div className="stamp-footer-demo">
            {onSeedDemo && (
              <button
                onClick={onSeedDemo}
                className="btn btn-secondary btn-sm"
                title="Replace the current log with a rich sample portfolio so every screen has content"
              >
                <PackageOpen size={14} />
                <span>Load demo portfolio</span>
              </button>
            )}
            {onResetLog && (
              <button
                onClick={onResetLog}
                className="btn btn-sm"
                style={{ background: 'none', border: 'none', color: 'var(--ink-500)', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                <RotateCcw size={13} style={{ display: 'inline', verticalAlign: '-2px' }} />
                <span> Reset field log</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
