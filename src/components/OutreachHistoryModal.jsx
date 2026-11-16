import React from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  MessageSquare,
  Building,
  Briefcase,
} from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';
import { INVITE_STAGES } from '../data/gamificationData';

export function OutreachHistoryModal({
  isOpen,
  onClose,
  outreachMessages = [],
  inviteStatus = {},
  onAdvanceInvite,
}) {
  const dialogRef = useModalBehavior(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="outreach-history-title"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '720px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              RECRUITER OUTREACH CENTER
            </span>
            <h3 id="outreach-history-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
              Candidate Communications & Pipeline ({outreachMessages.length})
            </h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {outreachMessages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Mail size={40} style={{ color: 'var(--ink-400)', margin: '0 auto 1rem' }} />
              <h4 style={{ color: 'var(--ink-900)', marginBottom: '0.5rem' }}>No Outreach Communications Yet</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-600)', maxWidth: '420px', margin: '0 auto' }}>
                Use the "Invite" button on any candidate card in Employer Discovery to send an inquiry-driven outreach note.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {outreachMessages.map((msg) => {
                const liveStatus = inviteStatus[msg.studentId];
                const stage = liveStatus?.stage || msg.stage || INVITE_STAGES[0];
                const stageIdx = Math.max(0, INVITE_STAGES.indexOf(stage));
                const atEnd = stageIdx >= INVITE_STAGES.length - 1;

                return (
                  <div key={msg.id} className="outreach-card">
                    <div className="outreach-card-head">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--ink-950)' }}>
                            {msg.studentName}
                          </strong>
                          <span className="mono-stamp" style={{ fontSize: '0.75rem', color: 'var(--brass-500)' }}>
                            {stage}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--ink-600)', display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Building size={12} /> {msg.companyName}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Briefcase size={12} /> {msg.roleType}
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onAdvanceInvite(msg.studentId)}
                        disabled={atEnd}
                        style={{ opacity: atEnd ? 0.5 : 1, fontSize: '0.75rem' }}
                      >
                        {atEnd ? 'At Offer (Complete)' : `Advance to ${INVITE_STAGES[stageIdx + 1]}`}
                      </button>
                    </div>

                    {/* Pipeline Visual Track */}
                    <div className="invite-pipeline-stages" style={{ margin: '0.85rem 0' }}>
                      {INVITE_STAGES.map((s, i) => (
                        <div
                          key={s}
                          className={`pipeline-stage ${i <= stageIdx ? 'reached' : ''} ${i === stageIdx ? 'current' : ''}`}
                        >
                          {i < stageIdx && <CheckCircle2 size={11} />}
                          {s}
                        </div>
                      ))}
                    </div>

                    {/* Note Content */}
                    <div className="outreach-note-box">
                      <div className="outreach-note-label">
                        <MessageSquare size={12} /> Sent Message:
                      </div>
                      <p style={{ whiteSpace: 'pre-wrap', margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--ink-850)', lineHeight: '1.5' }}>
                        {msg.personalNote}
                      </p>
                    </div>

                    {/* Candidate Response Preview */}
                    {stageIdx >= 1 && (
                      <div className="outreach-reply-box">
                        <div className="outreach-note-label" style={{ color: 'var(--forest-700)' }}>
                          <CheckCircle2 size={12} /> Candidate Response ({stage}):
                        </div>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.825rem', color: 'var(--forest-900)', fontStyle: 'italic' }}>
                          {stage === 'Replied' && `"Thank you for the note regarding my inquiry! I'd welcome an informal conversation to share our latest test data."`}
                          {stage === 'Interview' && `"Interview scheduled. Looking forward to discussing the trade-offs and operational assumptions with your team."`}
                          {stage === 'Offer' && `"Offer extended and under final review! Exploring alignment on team scope and research freedom."`}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
}
