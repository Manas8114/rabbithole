import React from 'react';
import { CheckCircle2, Award, Stamp, X } from 'lucide-react';

export function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="alert" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-pill ${toast.tone ? `toast-${toast.tone}` : ''}`}>
          {toast.tone === 'rankup' ? (
            <Award size={18} className="toast-icon-check" />
          ) : toast.tone === 'stamp' ? (
            <Stamp size={18} className="toast-icon-check" />
          ) : toast.tone === 'xp' ? (
            <Award size={18} className="toast-icon-check toast-icon-xp" />
          ) : (
            <CheckCircle2 size={18} className="toast-icon-check" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              marginLeft: '0.5rem',
              color: 'var(--sage-300)',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
