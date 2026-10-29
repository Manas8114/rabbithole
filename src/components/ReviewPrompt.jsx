import React, { useState } from 'react';
import { MessageSquareQuote, CheckCircle2, PenLine } from 'lucide-react';

const FOCUS_OPTIONS = [
  'The central question was sharper than the evidence needed',
  'The strongest single source — I would cite it again',
  'The honest "remains uncertain" section is what makes this rigorous',
];

/**
 * A one-card peer review at the end of a trail. Pick one of three focuses
 * and submit — it logs 30 XP the first time per trail and feeds the
 * Mentor stamp. After that the card collapses to the recorded review.
 */
export function ReviewPrompt({ trail, existingReview, onSubmit }) {
  const [selectedFocus, setSelectedFocus] = useState(null);

  if (existingReview) {
    return (
      <section className="review-prompt-card reviewed">
        <div className="review-prompt-head">
          <CheckCircle2 size={16} style={{ color: 'var(--brass-500)' }} />
          <strong>Peer review filed</strong>
        </div>
        <p className="review-recorded">
          Your note on "{trail.title}" — <em>{existingReview.focus}</em> — is recorded in your field log.
        </p>
      </section>
    );
  }

  return (
    <section className="review-prompt-card">
      <div className="review-prompt-head">
        <MessageSquareQuote size={16} style={{ color: 'var(--forest-700)' }} />
        <strong>Leave a Peer Review</strong>
        <span className="mono-stamp" style={{ marginLeft: 'auto', color: 'var(--brass-600)', fontSize: '0.6875rem' }}>+30 XP</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)', margin: '0.35rem 0 0.85rem' }}>
        One line, one focus. It files to your passport as the kind of reader you are.
      </p>
      <div className="review-focus-list">
        {FOCUS_OPTIONS.map((focus) => (
          <button
            key={focus}
            onClick={() => setSelectedFocus(focus)}
            className={`review-focus-btn ${selectedFocus === focus ? 'selected' : ''}`}
          >
            {focus}
          </button>
        ))}
      </div>
      <button
        className="btn btn-primary btn-sm"
        disabled={!selectedFocus}
        style={{ marginTop: '0.85rem', opacity: selectedFocus ? 1 : 0.4 }}
        onClick={() => selectedFocus && onSubmit(selectedFocus)}
      >
        <PenLine size={14} />
        <span>File the Review</span>
      </button>
    </section>
  );
}
