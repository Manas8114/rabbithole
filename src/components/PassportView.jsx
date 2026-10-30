import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  Bookmark,
  Send,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  Clock,
  UserCheck,
  PenLine
} from 'lucide-react';
import { students } from '../data/studentsData';
import { STAMP_CATALOG } from '../data/gamificationData';
import { trailsData } from '../data/curiosityTrailData';

export function PassportView({
  studentId = 'alex-morgan',
  onSelectStudent,
  onNavigateToTrail,
  onToggleShortlist,
  isShortlisted,
  onOpenInviteModal,
  fieldLog,
  onWriteInquiry
}) {
  // Find current student or default to Alex Morgan
  const activeStudent = students.find(s => s.id === studentId) || students[0];
  const [draftInquiry, setDraftInquiry] = useState('');

  // The "you" passport is live: its numbers come from the field log, never
  // from the seed record. Other passports keep their authored stats.
  const isYou = activeStudent.id === 'you' && !!fieldLog;
  const liveCq = isYou ? `${fieldLog.cq}/100` : activeStudent.stats.cqIndex;
  const yourTrails = isYou
    ? Object.entries(fieldLog.exploredTrails || {}).map(([id, rec]) => ({
        id,
        total: trailsData[id]?.nodes?.length || rec.stagesRead,
        ...rec,
      }))
    : [];
  const liveStats = isYou
    ? {
        trailsActive: yourTrails.length,
        projectsBuilt: 0,
        fieldNotes: fieldLog.fieldNotes.length,
        milestoneStamps: fieldLog.earnedStamps.length,
      }
    : activeStudent.stats;

  // Your own written inquiries, filed onto the "What I want to explore next" card
  const yourInquiries = (fieldLog?.inquiries || []).map((q) => ({
    question: q.text,
    whyInterested: 'Your own question, filed to this passport from the Field Office.',
    targetMethod: 'Open',
    isYours: true,
  }));

  // The seals you have actually earned, shown in the milestones section.
  const yourStamps = (fieldLog?.earnedStamps || [])
    .map((id) => STAMP_CATALOG.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="passport-view-wrap">
      <div className="content-wrap">

        {/* Passport Switcher / Cohort Tabs for Easy Demo Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="mono-stamp" style={{ color: 'var(--ink-500)' }}>Demo Cohort:</span>
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: activeStudent.id === student.id ? '700' : '500',
                  backgroundColor: activeStudent.id === student.id ? 'var(--forest-800)' : 'var(--cream-card)',
                  color: activeStudent.id === student.id ? 'var(--cream-50)' : 'var(--ink-700)',
                  border: '1px solid rgba(var(--border-ink), 0.12)',
                  transition: 'all 150ms ease'
                }}
              >
                {student.name} {student.id === 'alex-morgan' ? '(Primary)' : ''}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => onToggleShortlist(activeStudent.id)}
              className={`btn btn-sm ${isShortlisted ? 'btn-sage' : 'btn-secondary'}`}
              id="passport-shortlist-btn"
            >
              <Bookmark size={15} fill={isShortlisted ? 'currentColor' : 'none'} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Student'}</span>
            </button>

            <button
              onClick={() => onOpenInviteModal(activeStudent)}
              className="btn btn-primary btn-sm"
              id="passport-invite-btn"
            >
              <Send size={15} />
              <span>Invite to Connect</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            THE PASSPORT DOCUMENT CANVAS
            ========================================================================= */}
        <div className="passport-sheet">
          {/* Top Brass & Forest Green Heritage Band */}
          <div className="passport-header-band">
            <div>
              <div className="passport-id-label">OFFICIAL STUDENT REPOSITORY • NO. CP-{activeStudent.id.toUpperCase().replace('-', '')}-2025</div>
              <h2 style={{ color: 'var(--paper)', fontSize: '1.4rem', marginTop: '0.2rem' }}>
                CURIOSITY PASSPORT
              </h2>
            </div>

            <div className="passport-seal-icon">
              <Compass size={18} style={{ color: 'var(--brass-300)' }} />
              <span>Verified Inquiries & Artifacts</span>
            </div>
          </div>

          {/* Main 2-Column Passport Layout */}
          <div className="passport-body-grid">
            
            {/* ===================================================================
                LEFT COLUMN: Personal Bio, Aspirations, Interests & Stats
                =================================================================== */}
            <aside className="passport-sidebar">
              {/* Portrait & Core Identity */}
              <div className="passport-portrait-wrap">
                <img 
                  src={activeStudent.avatar} 
                  alt={activeStudent.name} 
                  className="passport-portrait-img"
                />
                <h1 className="passport-student-name">{activeStudent.name}</h1>
                <p className="passport-discipline">{activeStudent.discipline}</p>
                <p className="passport-university">
                  <GraduationCap size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {activeStudent.university} • {activeStudent.gradYear}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="passport-cq-badge">
                    <Sparkles size={13} />
                    <span>CQ Rating: {liveCq}</span>
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--forest-700)',
                  backgroundColor: 'var(--sage-100)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}>
                  <UserCheck size={13} />
                  <span>{activeStudent.statusText}</span>
                </div>
              </div>

              {/* Personal Introduction */}
              <div>
                <h4 className="sidebar-section-title">Personal Statement</h4>
                <p className="sidebar-text">
                  {activeStudent.intro}
                </p>
              </div>

              {/* Career Aspirations */}
              <div>
                <h4 className="sidebar-section-title">Career Aspirations</h4>
                <p className="sidebar-text" style={{ fontStyle: 'italic', color: 'var(--forest-700)' }}>
                  "{activeStudent.careerAspirations}"
                </p>
              </div>

              {/* Interests Tag Cloud */}
              <div>
                <h4 className="sidebar-section-title">Core Disciplines & Interests</h4>
                <div className="interest-tag-cloud">
                  {activeStudent.interests.map((interest, idx) => (
                    <span key={idx} className="tag-pill">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Exploration Stats Grid */}
              <div>
                <h4 className="sidebar-section-title">Exploration Ledger</h4>
                <div className="stat-pills-row">
                  <div className="mini-stat-card">
                    <div className="mini-stat-num">{liveStats.trailsActive}</div>
                    <div className="mini-stat-label">Curiosity Trails</div>
                  </div>
                  <div className="mini-stat-card">
                    <div className="mini-stat-num">{liveStats.projectsBuilt}</div>
                    <div className="mini-stat-label">Open Projects</div>
                  </div>
                  <div className="mini-stat-card">
                    <div className="mini-stat-num">{liveStats.fieldNotes}</div>
                    <div className="mini-stat-label">Field Notes</div>
                  </div>
                  <div className="mini-stat-card">
                    <div className="mini-stat-num">{liveStats.milestoneStamps}</div>
                    <div className="mini-stat-label">Stamps Earned</div>
                  </div>
                </div>
              </div>

              {/* Stamp of Origin */}
              <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                <div className="passport-stamp" style={{ width: '100%' }}>
                  <span className="passport-stamp-code">SAN FRANCISCO • REG. 2025</span>
                  <span className="passport-stamp-date">PASS ID: CP-BERK-9942</span>
                </div>
              </div>
            </aside>

            {/* ===================================================================
                RIGHT COLUMN: Trails, Projects, Milestones, Explore Next
                =================================================================== */}
            <main className="passport-main">

              {/* ---------------------------------------------------------------
                  SECTION 1: Three Curiosity Trails
                  --------------------------------------------------------------- */}
              <section>
                <div className="passport-section-heading">
                  <div>
                    <h3>Curiosity Trails</h3>
                    <span className="subtitle">Real-world questions explored independently outside class curricula</span>
                  </div>
                  <span className="mono-stamp" style={{ color: 'var(--forest-600)' }}>
                    {isYou ? liveStats.trailsActive : activeStudent.trails.length} ACTIVE INQUIRIES
                  </span>
                </div>

                <div className="trails-stack">
                  {isYou && yourTrails.length > 0 && (
                    yourTrails.map((rec) => {
                      const t = trailsData[rec.id];
                      const pct = Math.min(100, Math.round((rec.stagesRead / rec.total) * 100));
                      const reviewed = (fieldLog.reviews || []).find((r) => r.trailId === rec.id);
                      return (
                        <div key={rec.id} className="trail-card-preview you-trail-card" onClick={() => onNavigateToTrail(rec.id)}>
                          <div className="trail-header-meta">
                            <span className="tag-pill">Exploring · {t?.studentName || 'Field'}</span>
                            <span className="trail-status-pill">{rec.complete ? 'Trace Complete' : 'In Progress'}</span>
                          </div>
                          <h4 className="trail-question-title">
                            "{t?.title || rec.id}"
                          </h4>
                          <p className="trail-summary-snippet">
                            {rec.stagesRead} of {rec.total} stages documented
                            {rec.complete ? ' · full trace complete' : ' · keep going to complete the trace'}
                            {reviewed ? ' · peer review filed' : ''}
                          </p>
                          <div className="you-trail-progress" aria-hidden="true">
                            <div className="you-trail-progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })
                  )}
                  {isYou && yourTrails.length === 0 && (
                    <div className="trail-card-preview you-empty-card">
                      <h4 className="trail-question-title" style={{ fontSize: '1.05rem' }}>
                        No trails filed yet — your first open inquiry becomes trail one.
                      </h4>
                      <p className="trail-summary-snippet">
                        Open any explorer's trail from the Curiosity Trail view and it files to your ledger;
                        write your own question below and it becomes the one you chase.
                      </p>
                      <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }} onClick={() => onNavigateToTrail('sustainable-fashion')}>
                        <Compass size={14} />
                        <span>Inspect a Trail</span>
                      </button>
                    </div>
                  )}
                  {activeStudent.trails.map((trail) => (
                    <div
                      key={trail.id}
                      className={`trail-card-preview ${trail.isFeatured ? 'featured' : ''}`}
                      onClick={() => onNavigateToTrail(trail.id)}
                      id={`trail-card-${trail.id}`}
                    >
                      {trail.isFeatured && (
                        <div className="trail-featured-badge">
                          ★ Featured Interactive Trail
                        </div>
                      )}

                      <div className="trail-header-meta">
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          {trail.tags.map((t, idx) => (
                            <span key={idx} className="tag-pill">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="trail-status-pill">{trail.status}</span>
                      </div>

                      <h4 className="trail-question-title">
                        "{trail.question}"
                      </h4>

                      <p className="trail-summary-snippet">
                        {trail.summary}
                      </p>

                      <div style={{
                        backgroundColor: 'var(--cream-50)',
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        borderLeft: '3px solid var(--forest-600)',
                        marginBottom: '0.85rem'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest-700)', textTransform: 'uppercase' }}>
                          Key Synthesis Insight
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--ink-950)', fontWeight: 500 }}>
                          {trail.keyInsight}
                        </div>
                      </div>

                      <div className="trail-footer-meta">
                        <div className="trail-stats-micro">
                          <span><Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />{trail.dateSpan}</span>
                          <span><Layers size={12} style={{ display: 'inline', marginRight: '3px' }} />{trail.milestoneCount} Milestones</span>
                          <span><FileText size={12} style={{ display: 'inline', marginRight: '3px' }} />{trail.fieldNotesCount} Field Notes</span>
                        </div>

                        <span style={{ 
                          fontSize: '0.8125rem', 
                          fontWeight: 600, 
                          color: 'var(--forest-700)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}>
                          Open Exploration Map <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ---------------------------------------------------------------
                  SECTION 2: Two Independent Projects
                  --------------------------------------------------------------- */}
              <section>
                <div className="passport-section-heading">
                  <div>
                    <h3>Independent Projects</h3>
                    <span className="subtitle">Tangible proofs of execution built to answer specific hypotheses</span>
                  </div>
                  <span className="mono-stamp" style={{ color: 'var(--forest-600)' }}>
                    {isYou ? `${activeStudent.projects.length} ARTIFACTS` : `${activeStudent.projects.length} VERIFIED ARTIFACTS`}
                  </span>
                </div>

                <div className="projects-grid">
                  {isYou && (
                    <div className="project-card you-empty-card">
                      <div className="project-category">Field Office</div>
                      <h4 className="project-title">Your first artifact hasn't shipped yet</h4>
                      <p className="project-problem-text" style={{ marginTop: '0.5rem' }}>
                        A completed side quest in the Field Office becomes your first field note; a finished
                        mini-project you build becomes the artifact recruiters will actually open.
                      </p>
                      <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }} onClick={() => onNavigateToTrail('sustainable-fashion')}>
                        <Layers size={14} />
                        <span>See an Example Artifact</span>
                      </button>
                    </div>
                  )}
                  {activeStudent.projects.map((proj) => (
                    <div key={proj.id} className="project-card">
                      <div>
                        <div className="project-category">{proj.category} • {proj.date}</div>
                        <h4 className="project-title">{proj.title}</h4>
                        
                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-500)', display: 'block', marginBottom: '0.2rem' }}>
                            Problem Tackled:
                          </span>
                          <p className="project-problem-text">
                            {proj.problemStatement}
                          </p>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-500)', display: 'block', marginBottom: '0.2rem' }}>
                            Methodology & Sourcing:
                          </span>
                          <p style={{ fontSize: '0.8125rem', color: 'var(--ink-700)', lineHeight: '1.45' }}>
                            {proj.methodology}
                          </p>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--forest-700)', display: 'block', marginBottom: '0.4rem' }}>
                            Tangible Outcomes & Proof:
                          </span>
                          <ul className="project-outcomes-list">
                            {proj.outcomes.map((outcome, idx) => (
                              <li key={idx}>
                                <CheckCircle2 size={14} />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ 
                        marginTop: '1.25rem', 
                        paddingTop: '1rem', 
                        borderTop: '1px dashed rgba(var(--border-ink), 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--ink-500)' }}>
                          {proj.timeInvested}
                        </span>
                        <a 
                          href="#artifact"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Demo Artifact Preview: "${proj.title}"\nIn the live platform, this opens the candidate's GitHub repository, interactive model, or published PDF.`);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.8125rem',
                            color: 'var(--forest-700)',
                            fontWeight: 600
                          }}
                        >
                          View Artifact <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ---------------------------------------------------------------
                  SECTION 3: Learning Milestones (Passport Stamps)
                  --------------------------------------------------------------- */}
              <section>
                <div className="passport-section-heading">
                  <div>
                    <h3>Learning Milestones & Field Stamps</h3>
                    <span className="subtitle">Chronological evidence of skill acquisition, field interviews, and public presentations</span>
                  </div>
                  <span className="mono-stamp" style={{ color: 'var(--forest-600)' }}>
                    CHRONOLOGY
                  </span>
                </div>

                <div className="milestones-strip">
                  {isYou ? (
                    yourStamps.length > 0 ? (
                      yourStamps.map((stamp) => (
                        <div key={stamp.id} className="milestone-stamp-card">
                          <div className="milestone-date-code">
                            <span>Field Office</span>
                            <span>{stamp.stampCode}</span>
                          </div>
                          <h5 className="milestone-title">{stamp.name}</h5>
                          <p className="milestone-desc">{stamp.desc} +{stamp.bonusXp} XP on earn.</p>
                        </div>
                      ))
                    ) : (
                      <div className="milestone-stamp-card you-empty-card">
                        <h5 className="milestone-title">No seals yet</h5>
                        <p className="milestone-desc">
                          Open a trail, attend a meeting, or file a field note — your first stamp
                          lands here, and it is permanent.
                        </p>
                      </div>
                    )
                  ) : (
                    activeStudent.milestones.map((m) => (
                      <div key={m.id} className="milestone-stamp-card">
                        <div className="milestone-date-code">
                          <span>{m.date}</span>
                          <span>{m.stampCode}</span>
                        </div>
                        <h5 className="milestone-title">{m.title}</h5>
                        <p className="milestone-desc">{m.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* ---------------------------------------------------------------
                  SECTION 4: What I Want to Explore Next
                  --------------------------------------------------------------- */}
              <section>
                <div className="passport-section-heading">
                  <div>
                    <h3>What I Want to Explore Next</h3>
                    <span className="subtitle">Active hypotheses queued for future investigation</span>
                  </div>
                  <span className="mono-stamp" style={{ color: 'var(--forest-600)' }}>
                    FUTURE HORIZONS
                  </span>
                </div>

                <div className="explore-next-grid">
                  {(isYou ? [...activeStudent.exploreNext, ...yourInquiries] : activeStudent.exploreNext).map((item, idx) => (
                    <div key={idx} className={`explore-next-card ${item.isYours ? 'your-inquiry-card' : ''}`}>
                      <div className="mono-stamp" style={{ color: 'var(--forest-600)', marginBottom: '0.35rem' }}>
                        {item.isYours ? `Your Inquiry #${idx - activeStudent.exploreNext.length + 1} · FILED BY YOU` : `Inquiry #${idx + 1}`}
                      </div>
                      <h4 className="question-text">
                        "{item.question}"
                      </h4>
                      <p className="detail-text" style={{ marginBottom: '0.5rem' }}>
                        <strong>Why:</strong> {item.whyInterested}
                      </p>
                      <p className="detail-text" style={{ fontStyle: 'italic', color: 'var(--ink-500)' }}>
                        <strong>Approach:</strong> {item.targetMethod}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write-your-own-question card — "you" only */}
                {isYou && (
                  <div className="write-inquiry-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <PenLine size={16} style={{ color: 'var(--brass-600)' }} />
                      <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink-950)' }}>
                        Write your next question
                      </strong>
                      <span className="mono-stamp" style={{ marginLeft: 'auto', color: 'var(--brass-600)', fontSize: '0.6875rem' }}>+15 XP (first)</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)', marginBottom: '0.75rem' }}>
                      A question you would actually chase — not a topic a syllabus hands out. It files straight
                      onto this passport and recruiters can see it.
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <input
                        className="form-input"
                        style={{ flex: '1 1 260px' }}
                        placeholder='e.g. "Do farmers pay more for drought insurance than the drought itself costs them?"'
                        value={draftInquiry}
                        onChange={(e) => setDraftInquiry(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && draftInquiry.trim()) {
                            onWriteInquiry(draftInquiry);
                            setDraftInquiry('');
                          }
                        }}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={!draftInquiry.trim()}
                        onClick={() => {
                          onWriteInquiry(draftInquiry);
                          setDraftInquiry('');
                        }}
                      >
                        <Send size={14} />
                        <span>File the Question</span>
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* Bottom Quick-Action Bar */}
              <div style={{
                background: 'var(--cream-paper)',
                border: '1px solid rgba(var(--border-ink), 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink-950)' }}>
                    Want to see how Alex arrived at these conclusions?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)' }}>
                    Dive into the step-by-step investigation of sustainable fashion unit economics.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => onNavigateToTrail('sustainable-fashion')}
                    className="btn btn-primary btn-sm"
                  >
                    Open Interactive Trail
                    <ArrowRight size={15} />
                  </button>
                  <button 
                    onClick={() => onOpenInviteModal(activeStudent)}
                    className="btn btn-sage btn-sm"
                  >
                    Invite to Connect
                  </button>
                </div>
              </div>

            </main>
          </div>
        </div>

      </div>
    </div>
  );
}
