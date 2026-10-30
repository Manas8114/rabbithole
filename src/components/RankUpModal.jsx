import React from 'react';
import { Award, Compass } from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';

/**
 * The promotion ceremony: when the field log crosses a rank threshold,
 * the new seal is "stamped" onto the screen instead of just a toast.
 */
export function RankUpModal({ rankUp, onClose }) {
  const dialogRef = useModalBehavior(!!rankUp, onClose);
  if (!rankUp) return null;

  return (
    <div ref={dialogRef} className="modal-overlay rankup-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="rankup-title">
      <div className="rankup-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="rankup-seal">
          <Award size={44} />
          <span className="rankup-seal-code">{rankUp.stampCode}</span>
        </div>
        <div className="mono-stamp rankup-kicker">FIELD PROMOTION</div>
        <h2 className="rankup-name" id="rankup-title">{rankUp.name}</h2>
        <p className="rankup-sub">
          The seal is inked onto your passport and it is permanent. Your rank is how the
          cohort and hiring teams read your momentum at a glance.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          <Compass size={15} />
          <span>Continue the work</span>
        </button>
      </div>
    </div>
  );
}
