import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Compass,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import { useModalBehavior } from '../hooks/useModalBehavior';

const SAMPLE_TEMPLATES = [
  {
    label: 'Energy & Grid Resilience',
    title: 'Can residential battery microgrids stabilize regional frequency swings at sub-second latency?',
    shortLabel: 'Microgrid Frequency Resilience',
    subtitle: 'An empirical investigation into grid-forming inverter dispatch and stochastic response latency.',
    tags: 'Energy Tech, Grid Resilience, Embedded Controls, Unit Economics',
    whyCurious: 'During grid strains, peaker plants run at $1,200/MWh while thousands of neighborhood battery storage units sit idle due to latency in telemetry aggregation. I wanted to see if peer-to-peer droop control could bypass centralized dispatch entirely.',
    stages: [
      {
        phase: 'Spark & Field Observation',
        title: 'Peaker Economics vs. Distributed Idle Storage',
        date: 'Nov 2024',
        evidenceType: 'Market Analysis & Telemetry',
        summary: 'Analyzed ISO-NE real-time LMP pricing during high-volatility events against neighborhood solar-battery telemetry.',
        body: 'Telemetry showed residential storage response took 4.2 seconds to initiate under cloud aggregator API calls—just slow enough to miss the primary frequency response window.',
        keyTakeaway: 'Centralized API aggregators are fundamentally unsuited for primary frequency response; sub-200ms local autonomous response is required.',
      },
      {
        phase: 'Hardware Prototype & Testbench',
        title: 'Benchtop Droop Control on 48V Micro-Inverter Rig',
        date: 'Dec 2024',
        evidenceType: 'Hardware Testbench',
        summary: 'Built a hardware-in-the-loop testbench measuring local line frequency with 0.005Hz precision at 100Hz sampling rate.',
        body: 'By computing local frequency derivative (RoCoF) on an STM32 MCU, the inverter autonomous trigger kicked in within 68ms—cutting peaker reliance by 80% in simulated grid drops.',
        keyTakeaway: 'Autonomous local sensing eliminates network jitter and proves grid-forming resilience at edge nodes.',
      },
      {
        phase: 'Synthesized Framework & Artifact',
        title: 'The Edge-Grid Dispatch Protocol & Open Model',
        date: 'Feb 2025',
        evidenceType: 'Simulation & Whitepaper',
        summary: 'Published the simulation suite and open hardware schematics for edge-triggered micro-inverters.',
        body: 'Presented findings to regional operators. The model shows an aggregate 5MW microgrid cluster can displace a 20MW peaker unit during the critical 10-second transition window.',
        keyTakeaway: 'The future grid is bottom-up, decentralized, and governed by autonomous local physics.',
      },
    ],
    projectTitle: 'EdgeDroop: Sub-100ms Frequency Controller',
    projectSummary: 'Open-source embedded firmware and Python simulation model demonstrating autonomous frequency support on microgrids.',
    projectLink: 'https://github.com/curiosity-cohort/edgedroop-firmware',
    keyInsight: 'Autonomous edge sensing replaces telemetry latency with physics-driven local actuation.',
  },
  {
    label: 'Bio-Materials & Packaging',
    title: 'Can agro-industrial cellulose waste replace expanded polystyrene in cold-chain shipping?',
    shortLabel: 'Agricultural Cellulose Insulation',
    subtitle: 'Testing thermal conductivity and compression fatigue of compressed rice-husk aerogels.',
    tags: 'Materials Science, Bio-Packaging, Circular Economy, Cold Chain',
    whyCurious: 'Pharmaceutical cold-chain logistics discards 300,000 tons of EPS foam annually. I tested whether treated agricultural waste could match EPS R-values under humid conditions.',
    stages: [
      {
        phase: 'Problem Statement & Sourcing',
        title: 'The EPS Cold-Chain Landfill Burden',
        date: 'Oct 2024',
        evidenceType: 'Supply Chain Audit',
        summary: 'Audited regional biomedical courier disposal logs and thermal performance benchmarks.',
        body: 'Standard EPS coolers perform well thermally (R-4 per inch) but cannot be recycled post-biological sample transport, creating an unavoidable hazardous-adjacent waste stream.',
        keyTakeaway: 'The barrier is not raw insulation capacity, but hydrophobic barrier integrity under freeze-thaw condensation cycles.',
      },
      {
        phase: 'Bench Formulation & Testing',
        title: 'Rice-Husk Sodium Silicate Aerogel Matrix',
        date: 'Dec 2024',
        evidenceType: 'Lab Testbench',
        summary: 'Synthesized 12 sample pucks varying binder ratio and silane surface functionalization.',
        body: 'Pucks with 8% silane coating showed zero mass gain after 72 hours at 95% RH while maintaining R-3.8 thermal resistance.',
        keyTakeaway: 'Hydrophobic functionalization enables organic biomass to survive moist refrigerated conditions without rotting.',
      },
      {
        phase: 'Validation & Real-World Drop Test',
        title: 'Courier Trial & ASTM Drop Certification',
        date: 'Feb 2025',
        evidenceType: 'Drop Test & Thermal Logger',
        summary: 'Packed cold-pack sensor vials in molded husk coolers and ran 48-hour domestic freight test.',
        body: 'Temperature remained strictly within 2°C–8°C window across 52 hours, surviving 6 corner drops from 1 meter height.',
        keyTakeaway: 'Composite rice-husk aerogels achieve commercial parity with EPS at 35% lower embodied carbon.',
      },
    ],
    projectTitle: 'HuskInsulate: Circular Cold-Chain Cooler',
    projectSummary: 'Standardized CAD tooling molds and open thermal test logs for bio-based pharmaceutical shipping coolers.',
    projectLink: 'https://github.com/curiosity-cohort/husk-insulate',
    keyInsight: 'Silane-functionalized cellulose matches synthetic foam insulation while dissolving harmlessly in soil.',
  },
];

export function TrailCreatorModal({ isOpen, onClose, onPublishTrail }) {
  const dialogRef = useModalBehavior(isOpen, onClose);
  const [activeStep, setActiveStep] = useState(1);

  // Form State
  const [question, setQuestion] = useState('');
  const [shortLabel, setShortLabel] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState('First-Principles, Field Research');
  const [whyCurious, setWhyCurious] = useState('');
  const [keyInsight, setKeyInsight] = useState('');

  // Stages
  const [stages, setStages] = useState([
    {
      phase: 'Spark & Observation',
      title: 'First Encounter & The Anomaly',
      date: '2024',
      evidenceType: 'Primary Observation',
      summary: '',
      body: '',
      keyTakeaway: '',
    },
    {
      phase: 'Field Investigation',
      title: 'Operator Interviews & Data Gathering',
      date: '2025',
      evidenceType: 'Operator Interviews',
      summary: '',
      body: '',
      keyTakeaway: '',
    },
    {
      phase: 'Synthesis & Discovery',
      title: 'The Breakthrough Finding',
      date: '2025',
      evidenceType: 'Synthesized Model',
      summary: '',
      body: '',
      keyTakeaway: '',
    },
  ]);

  // Project Artifact
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [projectLink, setProjectLink] = useState('');

  if (!isOpen) return null;

  const loadTemplate = (tmpl) => {
    setQuestion(tmpl.title);
    setShortLabel(tmpl.shortLabel);
    setSubtitle(tmpl.subtitle);
    setTags(tmpl.tags);
    setWhyCurious(tmpl.whyCurious);
    setStages(tmpl.stages);
    setProjectTitle(tmpl.projectTitle);
    setProjectSummary(tmpl.projectSummary);
    setProjectLink(tmpl.projectLink);
    setKeyInsight(tmpl.keyInsight);
  };

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        phase: 'Field Investigation',
        title: `Investigation Stage ${stages.length + 1}`,
        date: '2025',
        evidenceType: 'Field Research',
        summary: '',
        body: '',
        keyTakeaway: '',
      },
    ]);
  };

  const handleRemoveStage = (index) => {
    if (stages.length <= 2) return;
    setStages(stages.filter((_, i) => i !== index));
  };

  const handleUpdateStage = (index, field, value) => {
    setStages(stages.map((st, i) => (i === index ? { ...st, [field]: value } : st)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 36) || `trail-${Date.now()}`;

    const newTrail = {
      id: `user-trail-${slug}`,
      title: question.trim(),
      shortLabel: shortLabel.trim() || question.slice(0, 28),
      subtitle: subtitle.trim() || 'An independent inquiry documented in the Curiosity Passport.',
      status: 'Synthesized & Published',
      startedDate: stages[0]?.date || '2024',
      completedDate: stages[stages.length - 1]?.date || '2025',
      readTime: `${Math.max(4, stages.length * 2)} min explore`,
      tags: parsedTags.length ? parsedTags : ['Original Research'],
      curiosityRating: 'Original Inquiry',
      whyCurious: whyCurious.trim() || 'I observed a gap between standard textbook assumptions and real-world behavior, and set out to investigate.',
      nodes: stages.map((st, idx) => ({
        id: `node-${idx + 1}`,
        stepNumber: String(idx + 1).padStart(2, '0'),
        phase: st.phase || 'Investigation',
        title: st.title || `Stage ${idx + 1}`,
        date: st.date || '2025',
        summary: st.summary || 'Field findings and experimental observations.',
        body: st.body || st.summary || 'Detailed inquiry notes.',
        keyTakeaway: st.keyTakeaway || 'First-principles reasoning uncovers what conventional models overlook.',
        evidenceType: st.evidenceType || 'Fieldwork',
        readiness: 'Complete',
      })),
      resultingProjectTitle: projectTitle.trim() || null,
      resultingProjectSummary: projectSummary.trim() || null,
      resultingProjectLink: projectLink.trim() || null,
      keyInsight: keyInsight.trim() || stages[stages.length - 1]?.keyTakeaway || 'Curiosity is an undeniable differentiator.',
    };

    onPublishTrail(newTrail);
    onClose();
  };

  return (
    <div
      ref={dialogRef}
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trail-creator-title"
    >
      <div
        className="modal-dialog trail-creator-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="mono-stamp" style={{ color: 'var(--brass-300)', display: 'block', marginBottom: '0.2rem' }}>
              AUTHORING STUDIO · +100 XP
            </span>
            <h3 id="trail-creator-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
              Author an Original Curiosity Trail
            </h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Template Quickloader */}
        <div style={{
          backgroundColor: 'var(--cream-subtle)',
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid rgba(var(--border-ink), 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ink-600)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={13} style={{ color: 'var(--brass-500)' }} />
            Inspiration Templates:
          </span>
          {SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.label}
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
              onClick={() => loadTemplate(tmpl)}
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        {/* Step Navigation Tabs */}
        <div className="trail-creator-tabs">
          <button
            type="button"
            className={`trail-tab-btn ${activeStep === 1 ? 'active' : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <Compass size={14} />
            <span>1. Core Question</span>
          </button>
          <button
            type="button"
            className={`trail-tab-btn ${activeStep === 2 ? 'active' : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <Layers size={14} />
            <span>2. Research Stages ({stages.length})</span>
          </button>
          <button
            type="button"
            className={`trail-tab-btn ${activeStep === 3 ? 'active' : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <CheckCircle2 size={14} />
            <span>3. Tangible Artifact & Publish</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {/* STEP 1: Core Question & Motivation */}
            {activeStep === 1 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">
                    Central Curiosity Question *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. Can residential battery microgrids stabilize regional frequency swings?"
                    required
                  />
                  <span className="form-hint">
                    Make it a genuine puzzle, not a resume title. Good questions challenge a standard assumption.
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Short Label (for tabs & switchers)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={shortLabel}
                      onChange={(e) => setShortLabel(e.target.value)}
                      placeholder="e.g. Microgrid Frequency"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Discipline / Topic Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. Energy Tech, Grid Resilience, Hardware"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subtitle & Framing</label>
                  <input
                    type="text"
                    className="form-input"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. An empirical investigation into grid-forming inverter dispatch and latency."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">The Spark — Why were you curious?</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={whyCurious}
                    onChange={(e) => setWhyCurious(e.target.value)}
                    placeholder="Describe the moment or anomaly that triggered this investigation. What didn't make sense?"
                  />
                  <span className="form-hint">
                    Recruiters read this first. Personal conviction and curiosity beat corporate jargon.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2: Research Stages (Nodes) */}
            {activeStep === 2 && (
              <div className="form-step-pane">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ink-700)', margin: 0 }}>
                    Trace your inquiry chronologically through 2 to 5 distinct milestones.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddStage}
                    className="btn btn-secondary btn-sm"
                    disabled={stages.length >= 6}
                  >
                    <Plus size={14} />
                    <span>Add Stage</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {stages.map((stage, idx) => (
                    <div key={idx} className="stage-builder-card">
                      <div className="stage-builder-head">
                        <span className="mono-stamp" style={{ color: 'var(--forest-700)', fontSize: '0.8rem' }}>
                          STAGE {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="badge-tag">{stage.phase}</span>
                          {stages.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveStage(idx)}
                              className="stage-remove-btn"
                              title="Delete stage"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                        <div>
                          <label className="form-label-micro">Stage Headline</label>
                          <input
                            type="text"
                            className="form-input form-input-sm"
                            value={stage.title}
                            onChange={(e) => handleUpdateStage(idx, 'title', e.target.value)}
                            placeholder="e.g. The $140 Anomaly & Market Paradox"
                          />
                        </div>

                        <div>
                          <label className="form-label-micro">Phase Category</label>
                          <select
                            className="form-select form-select-sm"
                            value={stage.phase}
                            onChange={(e) => handleUpdateStage(idx, 'phase', e.target.value)}
                          >
                            <option value="Spark & Observation">Spark & Observation</option>
                            <option value="Field Investigation">Field Investigation</option>
                            <option value="Lab & Hardware Rig">Lab & Hardware Rig</option>
                            <option value="Financial & Unit Model">Financial & Unit Model</option>
                            <option value="Synthesis & Discovery">Synthesis & Discovery</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label-micro">Evidence Type</label>
                          <input
                            type="text"
                            className="form-input form-input-sm"
                            value={stage.evidenceType}
                            onChange={(e) => handleUpdateStage(idx, 'evidenceType', e.target.value)}
                            placeholder="e.g. Operator Interview"
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: '0.75rem' }}>
                        <label className="form-label-micro">Summary / Findings</label>
                        <textarea
                          className="form-textarea form-textarea-sm"
                          rows={2}
                          value={stage.summary}
                          onChange={(e) => handleUpdateStage(idx, 'summary', e.target.value)}
                          placeholder="What did you test, observe, or uncover in this phase?"
                        />
                      </div>

                      <div style={{ marginTop: '0.75rem' }}>
                        <label className="form-label-micro">Key Takeaway (The punchline insight)</label>
                        <input
                          type="text"
                          className="form-input form-input-sm"
                          value={stage.keyTakeaway}
                          onChange={(e) => handleUpdateStage(idx, 'keyTakeaway', e.target.value)}
                          placeholder="e.g. Centralized API aggregators are fundamentally unsuited for sub-second primary response."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Tangible Artifact & Publish */}
            {activeStep === 3 && (
              <div className="form-step-pane">
                <div className="callout-box" style={{ marginBottom: '1.25rem' }}>
                  <Lightbulb size={18} style={{ color: 'var(--brass-600)', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-800)' }}>
                    <strong>The Tangible Artifact:</strong> The highest-converting signal on Curiosity Passport is a tangible thing—a published sheet, GitHub repo, CAD file, or interactive model proving your inquiry was real.
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tangible Project / Artifact Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. EdgeDroop: Sub-100ms Frequency Controller"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Artifact Summary & Scope</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    placeholder="What did you build or release so someone else could replicate your work?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Deliverable URL (GitHub repo, live demo, paper PDF)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ExternalLink size={16} style={{ color: 'var(--forest-600)' }} />
                    <input
                      type="url"
                      className="form-input"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Overall Breakthrough Insight</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={keyInsight}
                    onChange={(e) => setKeyInsight(e.target.value)}
                    placeholder="In one sentence, what is the core thesis this trail proved?"
                  />
                </div>

                {/* Preview Card */}
                <div className="trail-preview-box">
                  <span className="mono-stamp" style={{ color: 'var(--forest-700)', fontSize: '0.75rem' }}>
                    READY TO PUBLISH
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', margin: '0.35rem 0', color: 'var(--ink-950)' }}>
                    "{question || 'Your Curiosity Question'}"
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-600)', margin: 0 }}>
                    {stages.length} milestones · Tangible Artifact: {projectTitle || 'In Progress'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="modal-footer" style={{ borderTop: '1px solid rgba(var(--border-ink), 0.08)' }}>
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="btn btn-secondary btn-sm"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                Cancel
              </button>
            )}

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeStep === 1 && !question.trim()) {
                      alert('Please write your central curiosity question.');
                      return;
                    }
                    setActiveStep(activeStep + 1);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={!question.trim()}
                >
                  <Sparkles size={14} />
                  <span>Publish Trail (+100 XP)</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
