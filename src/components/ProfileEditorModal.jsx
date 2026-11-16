import React, { useState } from 'react';
import { X, UserCheck } from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';

export function ProfileEditorModal({ isOpen, onClose, currentProfile, onSaveProfile }) {
  const dialogRef = useModalBehavior(isOpen, onClose);

  const [name, setName] = useState(currentProfile?.name || 'You');
  const [discipline, setDiscipline] = useState(currentProfile?.discipline || 'Independent Explorer');
  const [university, setUniversity] = useState(currentProfile?.university || 'The Curiosity Passport Cohort');
  const [gradYear, setGradYear] = useState(currentProfile?.gradYear || 'Class of 2026');
  const [location, setLocation] = useState(currentProfile?.location || 'San Francisco, CA');
  const [coverTag, setCoverTag] = useState(currentProfile?.coverTag || 'Self-Direction · First-Principles · Open Questions');
  const [intro, setIntro] = useState(currentProfile?.intro || '');
  const [careerAspirations, setCareerAspirations] = useState(currentProfile?.careerAspirations || '');
  const [interests, setInterests] = useState(
    Array.isArray(currentProfile?.interests)
      ? currentProfile.interests.join(', ')
      : 'Open Questions, First-Principles, Fieldwork'
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedInterests = interests
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    onSaveProfile({
      name: name.trim() || 'You',
      discipline: discipline.trim() || 'Independent Explorer',
      university: university.trim() || 'The Curiosity Passport Cohort',
      gradYear: gradYear.trim() || 'Class of 2026',
      location: location.trim() || 'San Francisco, CA',
      coverTag: coverTag.trim() || 'Self-Direction · First-Principles',
      intro: intro.trim(),
      careerAspirations: careerAspirations.trim(),
      interests: parsedInterests.length ? parsedInterests : ['Open Questions', 'Fieldwork'],
    });
    onClose();
  };

  return (
    <div
      ref={dialogRef}
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-editor-title"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              PASSPORT IDENTITY · +25 XP
            </span>
            <h3 id="profile-editor-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
              Edit Explorer Profile
            </h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Boston, MA"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Discipline / Academic Focus</label>
                <input
                  type="text"
                  className="form-input"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  placeholder="e.g. Computational Energy Systems"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">University / Cohort / Organization</label>
                <input
                  type="text"
                  className="form-input"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. MIT Energy Initiative"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Graduation Year / Level</label>
                <input
                  type="text"
                  className="form-input"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  placeholder="e.g. Class of 2026"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Headline / Focus Tags</label>
                <input
                  type="text"
                  className="form-input"
                  value={coverTag}
                  onChange={(e) => setCoverTag(e.target.value)}
                  placeholder="e.g. Power Electronics · Distributed Energy"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio & Inquiry Philosophy</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="What drives your independent curiosity? What kinds of problems do you enjoy tackling?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Career Aspirations</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={careerAspirations}
                onChange={(e) => setCareerAspirations(e.target.value)}
                placeholder="What roles, teams, or operational challenges are you looking to join?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Curiosity Topics & Skills (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Grid Storage, Stochastic Control, Python, Hardware"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <UserCheck size={14} />
              <span>Save Profile (+25 XP)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
