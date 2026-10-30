import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Quote,
  UserCheck,
  Check,
  Lightbulb,
  Bookmark,
  Trophy
} from 'lucide-react';
import { getTrailById, trailsData } from '../data/curiosityTrailData';
import { ReviewPrompt } from './ReviewPrompt';

export function CuriosityTrailView({
  trailId = 'sustainable-fashion',
  onSelectTrail,
  onBackToPassport,
  onOpenInviteModal,
  onShowToast,
  onAwardXp,
  onLogReview,
  onNoteActivity,
  reviewedFocus
}) {
  const trail = getTrailById(trailId);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  // Reset active node when trailId changes
  useEffect(() => {
    setActiveNodeIndex(0);
  }, [trailId]);

  const activeNode = trail.nodes?.[activeNodeIndex] || trail.nodes?.[0] || {
    stepNumber: "01",
    phase: "Investigation",
    title: "Stage Overview",
    date: "2025",
    body: "Data loaded.",
    keyTakeaway: "Curiosity drives insight."
  };

  // Field log XP: opening a trail files it once; each stage read pays once.
  useEffect(() => {
    onAwardXp?.(`openTrail:${trailId}`, 'Trail filed');
    onAwardXp?.(`readStage:${trailId}:stage-1`, 'Stage documented');
    onNoteActivity?.(trailId, 1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailId]);

  // Select a stage (timeline click or stepper). Pays stage XP once; reaching
  // the final stage pays the full-trace completion bonus.
  const selectNode = (index) => {
    if (index < 0 || index > (trail.nodes?.length || 1) - 1) return;
    setActiveNodeIndex(index);
    const nodeCount = trail.nodes?.length || 1;
    const isComplete = index === nodeCount - 1 && nodeCount > 1;
    onAwardXp?.(`readStage:${trailId}:stage-${index + 1}`, 'Stage documented');
    onNoteActivity?.(trailId, index + 1, isComplete);
    if (isComplete) {
      onAwardXp?.(`completeTrail:${trailId}`, 'Inquiry trace complete');
    }
  };

  const handleNextNode = () => {
    if (activeNodeIndex < (trail.nodes?.length || 1) - 1) {
      selectNode(activeNodeIndex + 1);
    }
  };

  const handlePrevNode = () => {
    if (activeNodeIndex > 0) {
      selectNode(activeNodeIndex - 1);
    }
  };

  const handleCopyLink = () => {
    onShowToast?.(`Link to "${trail.title}" copied to clipboard!`);
  };

  // Quick switcher — derived from the single source of truth (trailsData),
  // not a hand-maintained list. Adding a trail to the data file is enough.
  const availableTrails = Object.values(trailsData).map((t) => ({
    id: t.id,
    label: t.shortLabel || t.title,
    author: t.studentName,
    tag: t.tags?.[0] || '',
  }));

  return (
    <div className="trail-view-container">
      <div className="content-wrap">

        {/* Top Breadcrumb & Switcher Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button 
            onClick={() => onBackToPassport(trail.studentId)}
            className="trail-breadcrumb"
            style={{ border: 'none', background: 'none' }}
            id="back-to-passport-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to {trail.studentName}'s Passport</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              title="Share this trail"
            >
              <Share2 size={14} />
              <span>Share Trail</span>
            </button>
            <button 
              onClick={() => onOpenInviteModal({ id: trail.studentId, name: trail.studentName, discipline: trail.studentRole, avatar: trail.studentAvatar })}
              className="btn btn-primary btn-sm"
            >
              <UserCheck size={14} />
              <span>Connect with {trail.studentName.split(' ')[0]}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TRAIL SWITCHER PILLS (Allows instant exploration across any curiosity trail)
            ========================================================================= */}
        <div style={{
          background: 'var(--cream-card)',
          border: '1px solid rgba(var(--border-ink), 0.1)',
          borderRadius: '14px',
          padding: '0.85rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <span className="mono-stamp" style={{ color: 'var(--forest-700)', fontWeight: 700, marginRight: '0.25rem' }}>
            Switch Inquiry Trail:
          </span>
          {availableTrails.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTrail(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: trail.id === item.id ? '700' : '500',
                backgroundColor: trail.id === item.id ? 'var(--forest-800)' : 'var(--cream-50)',
                color: trail.id === item.id ? 'var(--cream-50)' : 'var(--ink-800)',
                border: '1px solid ' + (trail.id === item.id ? 'var(--forest-900)' : 'rgba(var(--border-ink), 0.12)'),
                transition: 'all 150ms ease'
              }}
              id={`switch-trail-btn-${item.id}`}
            >
              {trail.id === item.id && <Check size={13} style={{ color: 'var(--brass-300)' }} />}
              <span>{item.label}</span>
              <span style={{ 
                fontSize: '0.6875rem', 
                opacity: 0.8,
                color: trail.id === item.id ? 'var(--sage-200)' : 'var(--ink-500)' 
              }}>
                ({item.author.split(' ')[0]})
              </span>
            </button>
          ))}
        </div>

        {/* =========================================================================
            TRAIL HERO CARD
            ========================================================================= */}
        <div className="trail-hero-card">
          <div className="trail-meta-badge-row">
            <span className="tag-pill-brass">
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              {trail.curiosityRating}
            </span>
            <span className="tag-pill" style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {trail.status}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--sage-300)' }}>
              <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
              {trail.readTime}
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--brass-300)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            THE CENTRAL INQUIRY
          </div>

          <h1 className="trail-core-question">
            "{trail.title}"
          </h1>

          <p className="trail-core-subtitle">
            {trail.subtitle}
          </p>

          <div className="trail-student-attribution">
            <div 
              className="author-chip" 
              onClick={() => onBackToPassport(trail.studentId)}
              style={{ cursor: 'pointer' }}
              title="Click to view student passport"
            >
              <img src={trail.studentAvatar} alt={trail.studentName} />
              <div>
                <div className="author-chip-name">{trail.studentName} <ExternalLink size={12} style={{ display: 'inline', opacity: 0.7 }} /></div>
                <div className="author-chip-role">{trail.studentRole}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {trail.tags.map((tag, idx) => (
                <span key={idx} className="tag-pill" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--paper-soft)', borderColor: 'rgba(255,255,255,0.15)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            WHY THE STUDENT WAS CURIOUS ABOUT IT (Personal Spark)
            ========================================================================= */}
        <div className="card-editorial" style={{ marginBottom: '2.5rem', backgroundColor: 'var(--cream-card)', borderLeft: '4px solid var(--forest-700)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <HelpCircle size={18} style={{ color: 'var(--forest-700)' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--ink-950)' }}>
              Why {trail.studentName.split(' ')[0]} was curious about this
            </h3>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-800)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
            {trail.whyCurious}
          </p>
        </div>

        {/* =========================================================================
            EXPLORATION MAP & INTERACTIVE TIMELINE
            ========================================================================= */}
        <section className="trail-exploration-nav">
          <div className="exploration-map-header">
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--ink-950)' }}>
                Exploration Map & Milestones
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-500)' }}>
                Select any node below to trace the research sequence, field interviews, and models
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="mono-stamp" style={{ color: 'var(--forest-700)' }}>
                STAGE {activeNodeIndex + 1} OF {trail.nodes.length}
              </span>
            </div>
          </div>

          {/* Step Nodes Track */}
          <div className="exploration-nodes-track" style={{ gridTemplateColumns: `repeat(${Math.min(trail.nodes.length, 6)}, 1fr)` }}>
            {trail.nodes.map((node, index) => (
              <button
                key={node.id}
                onClick={() => selectNode(index)}
                className={`node-step-btn ${activeNodeIndex === index ? 'active' : ''}`}
                id={`timeline-node-${node.stepNumber}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span className="node-num">STAGE {node.stepNumber}</span>
                  <span style={{ fontSize: '0.625rem', opacity: 0.8 }}>{node.date}</span>
                </div>
                <div className="node-phase">{node.phase}</div>
                <div className="node-title-snippet">{node.title}</div>
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================================
            ACTIVE NODE DEEP DIVE SPOTLIGHT
            ========================================================================= */}
        <section className="active-node-spotlight">
          <div className="spotlight-header">
            <div>
              <span className="mono-stamp" style={{ color: 'var(--forest-600)', marginBottom: '0.25rem', display: 'block' }}>
                STAGE {activeNode.stepNumber} • {activeNode.phase} • {activeNode.date}
              </span>
              <h2 className="spotlight-title">{activeNode.title}</h2>
            </div>
            <span className="tag-pill" style={{ backgroundColor: 'var(--forest-50)', color: 'var(--forest-700)', border: '1px solid var(--forest-200)' }}>
              {activeNode.evidenceType}
            </span>
          </div>

          <p className="spotlight-body-text">
            {activeNode.body}
          </p>

          {activeNode.quote && (
            <div className="spotlight-quote-box">
              <Quote size={20} style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />
              "{activeNode.quote}"
            </div>
          )}

          <div className="spotlight-takeaway-box">
            <div className="takeaway-label">Stage Takeaway & Synthesis</div>
            <div className="takeaway-text">{activeNode.keyTakeaway}</div>
          </div>

          {/* Stepper controls */}
          <div className="spotlight-nav-actions">
            <button
              onClick={handlePrevNode}
              disabled={activeNodeIndex === 0}
              className="btn btn-secondary btn-sm"
              style={{ opacity: activeNodeIndex === 0 ? 0.4 : 1, cursor: activeNodeIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
              <ArrowLeft size={15} />
              <span>Previous Stage</span>
            </button>

            <span style={{ fontSize: '0.8125rem', color: 'var(--ink-500)', fontFamily: 'var(--font-mono)' }}>
              {activeNode.evidenceType} Documented
            </span>

            <button
              onClick={handleNextNode}
              disabled={activeNodeIndex === trail.nodes.length - 1}
              className="btn btn-primary btn-sm"
              style={{ opacity: activeNodeIndex === trail.nodes.length - 1 ? 0.4 : 1, cursor: activeNodeIndex === trail.nodes.length - 1 ? 'not-allowed' : 'pointer' }}
            >
              <span>Next Stage</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* =========================================================================
            RELATED SUB-QUESTIONS & CORE DISCOVERIES
            ========================================================================= */}
        <div className="trail-subsections-grid">
          {/* Related Questions Explored */}
          <div className="trail-sub-card">
            <h3 className="trail-sub-title">
              <HelpCircle size={20} style={{ color: 'var(--forest-700)' }} />
              <span>Related Sub-Questions Explored</span>
            </h3>

            <div className="related-q-list">
              {trail.relatedQuestions.map((item, idx) => (
                <div key={idx} className="related-q-item">
                  <div className="q-heading">"{item.q}"</div>
                  <div className="q-insight">{item.insight}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Discoveries & Mental Models */}
          <div className="trail-sub-card">
            <h3 className="trail-sub-title">
              <Lightbulb size={20} style={{ color: 'var(--forest-700)' }} />
              <span>Structural Research Discoveries</span>
            </h3>

            <div className="discoveries-list">
              {trail.discoveries.map((disc, idx) => (
                <div key={idx} className="discovery-item">
                  <h4>{disc.title}</h4>
                  <p>{disc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RESULTING MINI-PROJECT HIGHLIGHT
            ========================================================================= */}
        {trail.miniProject && (
          <section className="card-editorial" style={{ marginBottom: '3rem', backgroundColor: 'var(--cream-card)', border: '1.5px solid var(--forest-300)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="brand-icon-seal" style={{ width: '30px', height: '30px' }}>
                  <Trophy size={16} />
                </div>
                <span className="mono-stamp" style={{ color: 'var(--forest-700)', fontWeight: 700 }}>
                  RESULTING PORTFOLIO MINI-PROJECT
                </span>
              </div>

              <span className="tag-pill-brass">
                {trail.miniProject.badge}
              </span>
            </div>

            <h3 style={{ fontSize: '1.75rem', color: 'var(--ink-950)', marginBottom: '0.75rem' }}>
              {trail.miniProject.title}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--ink-700)', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              {trail.miniProject.description}
            </p>

            {/* Metrics bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1.25rem',
              backgroundColor: 'var(--cream-50)',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest-700)' }}>
                  {trail.miniProject.metric1}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-500)', textTransform: 'uppercase' }}>Scope</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest-700)' }}>
                  {trail.miniProject.metric2}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-500)', textTransform: 'uppercase' }}>Validation</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--forest-700)' }}>
                  {trail.miniProject.metric3}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ink-500)', textTransform: 'uppercase' }}>Framework</div>
              </div>
            </div>

            {/* Project Outcomes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--forest-700)', marginBottom: '0.5rem' }}>
                Key Outcomes & Real-World Validations:
              </h5>
              <ul className="project-outcomes-list">
                {trail.miniProject.outcomes.map((out, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  alert(`Demo Artifact Download: "${trail.miniProject.title}"\nIn production, this opens the project repository, interactive spreadsheet, or technical paper.`);
                  onShowToast?.(`Downloaded "${trail.miniProject.title}" artifact summary!`);
                }}
                className="btn btn-primary btn-sm"
              >
                <Download size={15} />
                <span>Download Artifact Summary (Demo File)</span>
              </button>
              <button
                onClick={() => onBackToPassport(trail.studentId)}
                className="btn btn-secondary btn-sm"
              >
                <span>View in {trail.studentName}'s Passport</span>
              </button>
            </div>
          </section>
        )}

        {/* =========================================================================
            SOURCES, CITATIONS & FIELD NOTES
            ========================================================================= */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--ink-950)' }}>
                Primary Sources, Interviews & Field Notes
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-500)' }}>
                Direct citations and confidential operator interviews supporting this inquiry
              </p>
            </div>
            <span className="mono-stamp" style={{ color: 'var(--forest-600)' }}>
              {trail.sources.length} CURATED CITATIONS
            </span>
          </div>

          <div className="sources-grid">
            {trail.sources.map((src, idx) => (
              <div key={idx} className="source-item-card">
                <div>
                  <div className="source-type-pill">{src.type} • {src.author}</div>
                  <h4 className="source-item-title">{src.title}</h4>
                  <p className="source-quote">"{src.quote}"</p>
                </div>
                <div className="source-annotation">
                  <strong>Analytical Note:</strong> {src.annotation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            LESSONS LEARNED
            ========================================================================= */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.45rem', color: 'var(--ink-950)', marginBottom: '1.25rem' }}>
            Lessons Learned & Enduring Mental Models
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {trail.lessonsLearned.map((lesson, idx) => (
              <div key={idx} className="card-editorial" style={{ backgroundColor: 'var(--cream-card)' }}>
                <span className="mono-stamp" style={{ color: 'var(--forest-600)', marginBottom: '0.4rem', display: 'block' }}>
                  PRINCIPLE {lesson.number}
                </span>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--ink-950)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {lesson.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)', lineHeight: '1.55' }}>
                  {lesson.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            INTELLECTUAL HONESTY: WHAT REMAINS UNCERTAIN
            ========================================================================= */}
        <section className="uncertainty-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={20} style={{ color: 'var(--accent-coral)' }} />
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--ink-950)' }}>
                Intellectual Honesty: What Remains Uncertain
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-500)' }}>
                Every rigorous inquiry produces new boundaries. Here is where the data becomes ambiguous.
              </p>
            </div>
          </div>

          <div className="uncertainty-grid">
            {trail.uncertainties.map((item, idx) => (
              <div key={idx} className="uncertainty-card">
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            THE NEXT QUESTION BANNER
            ========================================================================= */}
        <section className="next-question-banner">
          <div className="next-q-content">
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.4rem' }}>
              WHERE THE INQUIRY LEADS NEXT
            </span>
            <h3>
              "{trail.nextQuestion.question}"
            </h3>
            <p>
              {trail.nextQuestion.hypothesisPreview}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
            <button 
              onClick={() => onShowToast?.("Saved 'Next Question' to your curiosity watchlist!")}
              className="btn btn-secondary"
              style={{ backgroundColor: 'var(--cream-50)', color: 'var(--ink-950)' }}
            >
              <Bookmark size={15} />
              <span>Track This Next Question</span>
            </button>
            <button
              onClick={() => onBackToPassport(trail.studentId)}
              className="btn btn-sage"
              style={{ color: 'var(--ink-950)' }}
            >
              Return to {trail.studentName}'s Passport
            </button>
          </div>
        </section>

        {/* Peer review (files to the player's passport) */}
        <div style={{ marginBottom: '3rem' }}>
          <ReviewPrompt
            trail={trail}
            existingReview={reviewedFocus ? { focus: reviewedFocus } : null}
            onSubmit={(focus) => onLogReview?.(trailId, focus)}
          />
        </div>

      </div>
    </div>
  );
}
