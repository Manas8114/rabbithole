import React, { useState } from 'react';
import { MessageSquareQuote, CheckCircle2, PenLine, Sparkles } from 'lucide-react';

const FOCUS_OPTIONS = [
  'The central question was sharper than the evidence needed',
  'The strongest single source — I would cite it again',
  'The honest "remains uncertain" section is what makes this rigorous',
  'The tangible artifact directly falsifies the default industry assumption',
];

/**
 * A one-card peer review at the end of a trail. Pick a focus and optionally
 * add written feedback. Filing logs XP and unlocks Mentor & Peer Critic stamps.
 */
export function ReviewPrompt({ trail, existingReview, onSubmit }) {
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [customNote, setCustomNote] = useState('');

  if (existingReview) {
    return (
      <section className="review-prompt-card reviewed">
        <div className="review-prompt-head">
          <CheckCircle2 size={16} style={{ color: 'var(--brass-500)' }} />
          <strong>Peer review filed to cohort ledger</strong>
        </div>
        <p className="review-recorded">
          Your note on "{trail?.shortLabel || trail?.title || 'this inquiry'}" — <em>"{existingReview.focus}"</em>
        </p>
        {existingReview.note && (
          <blockquote className="review-quote-bubble">
            "{existingReview.note}"
          </blockquote>
        )}
      </section>
    );
  }

  const handleFile = () => {
    if (!selectedFocus) return;
    onSubmit(selectedFocus, customNote.trim());
  };

  return (
    <section className="review-prompt-card">
      <div className="review-prompt-head">
        <MessageSquareQuote size={16} style={{ color: 'var(--forest-700)' }} />
        <strong>Leave a Peer Review</strong>
        <span className="mono-stamp" style={{ marginLeft: 'auto', color: 'var(--brass-600)', fontSize: '0.6875rem' }}>
          +30 XP {customNote.trim() ? '(+40 XP bonus)' : ''}
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)', margin: '0.35rem 0 0.85rem' }}>
        Select a core reaction and optionally leave peer commentary to file onto this inquiry.
      </p>

      <div className="review-focus-list">
        {FOCUS_OPTIONS.map((focus) => (
          <button
            key={focus}
            type="button"
            onClick={() => setSelectedFocus(focus)}
            className={`review-focus-btn ${selectedFocus === focus ? 'selected' : ''}`}
          >
            {focus}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '0.85rem' }}>
        <label className="form-label-micro" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={11} style={{ color: 'var(--brass-500)' }} />
          In-depth commentary or constructive question (optional):
        </label>
        <textarea
          className="form-textarea form-textarea-sm"
          rows={2}
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          placeholder="e.g. How does this finding translate when operational temperature swings by 20°C?"
        />
      </div>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        disabled={!selectedFocus}
        style={{ marginTop: '0.85rem', opacity: selectedFocus ? 1 : 0.4 }}
        onClick={handleFile}
      >
        <PenLine size={14} />
        <span>File Review to Ledger</span>
      </button>
    </section>
  );
}
