import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

function buildNote(student) {
  return `Hi ${student?.name || 'there'},\n\nI came across your Curiosity Passport and was thoroughly impressed by your independent investigation into "${student?.trails?.[0]?.question || 'your latest inquiries'}". Your rigor in analyzing unit economics and talking directly to operators stands out. We would love to set up an exploratory conversation with our strategy team.`;
}

function InviteForm({ student, onClose, onSendInvite }) {
  // The key on <InviteForm> (see below) re-initializes these per student,
  // so the pre-filled note always matches the recipient.
  const [companyName, setCompanyName] = useState('Patagonia');
  const [roleType, setRoleType] = useState('Strategy & Operations Associate');
  const [personalNote, setPersonalNote] = useState(buildNote(student));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendInvite({
      studentId: student.id,
      studentName: student.name,
      companyName,
      roleType,
      personalNote,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        {/* Student Preview Bar */}
        <div className="modal-recipient-preview">
          <img
            src={student.avatar}
            alt={student.name}
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <strong style={{ fontSize: '1rem', color: 'var(--ink-950)' }}>{student.name}</strong>
            <div style={{ fontSize: '0.8125rem', color: 'var(--ink-600)' }}>
              {student.discipline} • {student.university}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Your Organization / Venture</label>
            <input
              type="text"
              className="form-input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Patagonia, OpenAI, IDEO"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role Opportunity</label>
            <select
              className="form-select"
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
            >
              <option value="Strategy & Operations Associate">Strategy & Operations Associate</option>
              <option value="Early-Career Fellow">Early-Career Fellow</option>
              <option value="Product Strategy Analyst">Product Strategy Analyst</option>
              <option value="Research & Prototyping Lead">Research & Prototyping Lead</option>
              <option value="Informal Exploratory Chat">Informal Exploratory Chat</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Personalized Outreach Note</label>
          <textarea
            className="form-textarea"
            rows={5}
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            required
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--ink-500)', fontStyle: 'italic' }}>
            Tip: Notes mentioning a student's specific curiosity question receive an 84% response rate.
          </span>
        </div>

        {/* Demo indicator note */}
        <div style={{
          backgroundColor: 'var(--sage-50)',
          border: '1px dashed var(--sage-300)',
          borderRadius: '8px',
          padding: '0.65rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--forest-700)'
        }}>
          <Sparkles size={14} style={{ color: 'var(--forest-600)', flexShrink: 0 }} />
          <span>
            Demo mode: Sending this invitation will generate a realistic confirmation message and mark the student as contacted.
          </span>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary btn-sm">
          <Send size={14} />
          <span>Send Demo Invitation</span>
        </button>
      </div>
    </form>
  );
}

export function InviteModal({ isOpen, student, onClose, onSendInvite }) {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              DEMO RECRUITER OUTREACH
            </span>
            <h3>Invite {student.name} to Connect</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* key re-mounts the form per student so its state re-initializes */}
        <InviteForm key={student.id} student={student} onClose={onClose} onSendInvite={onSendInvite} />
      </div>
    </div>
  );
}
