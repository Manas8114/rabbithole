import React from 'react';
import { X, Printer, Compass } from 'lucide-react';
import { STAMP_CATALOG, STAMP_ICONS } from '../data/gamificationData';
import { trailsData } from '../data/curiosityTrailData';
import { useModalBehavior } from '../hooks/useModalBehavior';

// Page-load date, formatted once at module scope: the printed report's
// "Field Log Report · <date>" line, stable across re-renders.
const GENERATED_ON = new Date().toLocaleDateString();

/**
 * The Curiosity Report: a printable, one-page career document assembled from
 * the field log. It is the carry-able artifact — the thing a student hands a
 * recruiter instead of a resume. Printing (or Save-as-PDF) shows only this
 * report via the @media print rules in index.css.
 */
export function CuriosityReportModal({ isOpen, onClose, fieldLog }) {
  const dialogRef = useModalBehavior(isOpen, onClose);
  if (!isOpen) return null;

  const explored = Object.entries(fieldLog.exploredTrails || {}).map(([id, rec]) => ({
    id,
    total: trailsData[id]?.nodes?.length || rec.stagesRead,
    ...rec,
  }));
  const questsDone = (fieldLog.fieldNotes || []);
  const stamps = (fieldLog.earnedStamps || []).map((id) => STAMP_CATALOG.find((s) => s.id === id)).filter(Boolean);
  const inquiries = fieldLog.inquiries || [];

  return (
    <div ref={dialogRef} className="modal-overlay report-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="curiosity-report-title">
      <div className="modal-dialog report-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="report-toolbar no-print">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              CARRYABLE ARTIFACT
            </span>
            <h3 id="curiosity-report-title">Curiosity Report</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-600)', marginTop: '0.25rem' }}>
              A one-page record of your field log. Print it or save it as a PDF to share.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close report">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ===================== THE PRINTABLE REPORT ===================== */}
        <div className="report-doc">
          <header className="report-doc-head">
            <div className="report-doc-brand">
              <div className="report-seal">
                <Compass size={22} />
              </div>
              <div>
                <div className="report-doc-title">CURIOSITY PASSPORT</div>
                <div className="report-doc-sub">Field Log Report · {GENERATED_ON}</div>
              </div>
            </div>
            <div className="report-doc-meta">
              <div><span>Curiosity Quotient</span><strong>{fieldLog.cq}/100</strong></div>
              <div><span>Field Rank</span><strong>{fieldLog.rank?.name}</strong></div>
              <div><span>Return Streak</span><strong>{fieldLog.streak}d</strong></div>
            </div>
          </header>

          <div className="report-grid">
            <section className="report-section">
              <h4>Exploration Trails</h4>
              {explored.length ? (
                <ul>
                  {explored.map((t) => {
                    const trail = trailsData[t.id];
                    const pct = Math.min(100, Math.round((t.stagesRead / t.total) * 100));
                    return (
                      <li key={t.id} className="report-trail-item">
                        <div className="report-trail-head">
                          <span>{trail?.title || t.id}</span>
                          <strong>{t.complete ? 'Complete' : `${pct}%`}</strong>
                        </div>
                        <div className="report-progress"><span style={{ width: `${pct}%` }} /></div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="report-empty">No trails opened yet — open one to begin your record.</p>
              )}
            </section>

            <section className="report-section">
              <h4>Seals Earned</h4>
              {stamps.length ? (
                <div className="report-stamps">
                  {stamps.map((s) => {
                    const Icon = STAMP_ICONS[s.icon] || Compass;
                    return (
                      <div key={s.id} className="report-stamp" title={s.desc}>
                        <Icon size={15} />
                        <span>{s.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="report-empty">No seals yet.</p>
              )}
            </section>

            <section className="report-section">
              <h4>Field Notes</h4>
              {questsDone.length ? (
                <ul>{questsDone.map((n, i) => <li key={i}>Field note filed · {new Date(n.ts).toLocaleDateString()}</li>)}</ul>
              ) : (
                <p className="report-empty">No field notes filed yet.</p>
              )}
            </section>

            <section className="report-section">
              <h4>Peer Reviews</h4>
              {(fieldLog.reviews || []).length ? (
                <ul>{(fieldLog.reviews || []).map((r, i) => (
                  <li key={i}>{trailsData[r.trailId]?.title || r.trailId} — {r.focus}</li>
                ))}</ul>
              ) : (
                <p className="report-empty">No peer reviews yet.</p>
              )}
            </section>

            <section className="report-section">
              <h4>Your Open Questions</h4>
              {inquiries.length ? (
                <ul>{inquiries.map((q, i) => <li key={i}>"{q.text}"</li>)}</ul>
              ) : (
                <p className="report-empty">Write a question onto your passport to list it here.</p>
              )}
            </section>

            <section className="report-section">
              <h4>Recruiter Outreach</h4>
              {Object.keys(fieldLog.inviteStatus || {}).length ? (
                <ul>
                  {Object.entries(fieldLog.inviteStatus || {}).map(([id, st]) => (
                    <li key={id}>{st.stage} · {id}</li>
                  ))}
                </ul>
              ) : (
                <p className="report-empty">No outreach logged yet.</p>
              )}
            </section>
          </div>

          <footer className="report-doc-foot">
            <span>Generated from the Curiosity Passport field log · a living record of curiosity as experience.</span>
          </footer>
        </div>
        {/* =================== END PRINTABLE REPORT =================== */}
      </div>
    </div>
  );
}
