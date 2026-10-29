import React from 'react';
import {
  ArrowRight,
  HelpCircle,
  Search,
  Lightbulb,
  Trophy,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Building,
  GraduationCap
} from 'lucide-react';
import { students } from '../data/studentsData';

export function LandingView({ onNavigateToPassport, onNavigateToTrail, onNavigateToEmployer }) {
  const alex = students.find(s => s.id === 'alex-morgan') || students[0];

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-view">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="hero-section">
        <div className="content-wrap">
          <div className="hero-grid">
            {/* Left Copy */}
            <div>
              <div className="hero-tagline-badge">
                <Sparkles size={14} />
                <span>The Alternative Portfolio for Early-Career Talent</span>
              </div>

              <h1 className="hero-title">
                Your curiosity is your <em>experience.</em>
              </h1>

              <p className="hero-description">
                Standard resumes only show where you've already been. Curiosity Passport lets students turn deep questions, independent research, and messy discoveries into an undeniable, living portfolio that forward-thinking employers can actually explore.
              </p>

              <div className="hero-actions">
                <button 
                  onClick={() => onNavigateToPassport('alex-morgan')} 
                  className="btn btn-primary btn-lg"
                  id="hero-explore-passport-btn"
                >
                  <span>Explore a passport</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  onClick={scrollToHowItWorks} 
                  className="btn btn-secondary btn-lg"
                  id="hero-how-it-works-btn"
                >
                  <span>See how it works</span>
                </button>
              </div>

              {/* Trust bar / Credibility Stats */}
              <div className="hero-trust-bar">
                <div className="trust-stat-item">
                  <span className="trust-stat-number">1,400+</span>
                  <span className="trust-stat-label">Inquiries Explored</span>
                </div>
                <div className="trust-stat-item">
                  <span className="trust-stat-number">48</span>
                  <span className="trust-stat-label">Universities</span>
                </div>
                <div className="trust-stat-item">
                  <span className="trust-stat-number">0 yrs</span>
                  <span className="trust-stat-label">Work Experience Needed</span>
                </div>
              </div>
            </div>

            {/* Right: Visually Rich Student Profile Teaser */}
            <div>
              <div className="hero-passport-teaser">
                {/* Stamp watermark */}
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem' }}>
                  <div className="passport-stamp">
                    <span className="passport-stamp-code">CAL-BERK-2025</span>
                    <span className="passport-stamp-date">VERIFIED EXPLORER</span>
                  </div>
                </div>

                <div className="teaser-passport-header">
                  <div className="teaser-student-row">
                    <img 
                      src={alex.avatar} 
                      alt={alex.name} 
                      className="teaser-avatar"
                    />
                    <div>
                      <h3 className="teaser-name">{alex.name}</h3>
                      <p className="teaser-school">{alex.discipline}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--ink-500)' }}>{alex.university}</p>
                    </div>
                  </div>
                </div>

                {/* Live Curiosity Question Callout */}
                <div 
                  className="teaser-curiosity-callout"
                  onClick={() => onNavigateToTrail('sustainable-fashion')}
                  style={{ cursor: 'pointer' }}
                  title="Click to open this interactive curiosity trail"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="label">Active Curiosity Trail • 5 Mo. Research</div>
                    <ExternalLink size={13} style={{ color: 'var(--forest-600)' }} />
                  </div>
                  <div className="question">
                    "Why do some sustainable fashion brands grow faster than others?"
                  </div>
                </div>

                {/* Snapshot Metrics */}
                <div className="teaser-stats-row">
                  <div>
                    <div className="teaser-stat-val">{alex.stats.trailsActive}</div>
                    <div className="teaser-stat-lbl">Inquiry Trails</div>
                  </div>
                  <div>
                    <div className="teaser-stat-val">{alex.stats.projectsBuilt}</div>
                    <div className="teaser-stat-lbl">Projects Built</div>
                  </div>
                  <div>
                    <div className="teaser-stat-val">{alex.stats.milestoneStamps}</div>
                    <div className="teaser-stat-lbl">Field Stamps</div>
                  </div>
                </div>

                {/* Bottom Teaser Actions */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => onNavigateToPassport('alex-morgan')}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Alex's Full Passport
                  </button>
                  <button 
                    onClick={() => onNavigateToTrail('sustainable-fashion')}
                    className="btn btn-sage btn-sm"
                    style={{ flex: 1 }}
                  >
                    Inspect Field Trail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE FOUR STEPS SECTION: The Curiosity Passport Framework
          ========================================================================= */}
      <section className="section-steps" id="how-it-works-section">
        <div className="content-wrap">
          <div className="section-header-centered">
            <span className="section-super-title">The Methodology</span>
            <h2 className="section-main-title">How curiosity becomes demonstrable proof</h2>
            <p className="section-subtext">
              Employers don't just want to see what you were assigned in class. They want to see how you think when nobody is giving you a rubric.
            </p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number-watermark">01</div>
              <div className="step-icon-wrap">
                <HelpCircle size={22} />
              </div>
              <h3 className="step-card-title">Question</h3>
              <p className="step-card-desc">
                Identify a genuine tension, paradox, or unanswered problem in an industry you care about. Not a homework prompt, but an inquiry you cannot stop thinking about.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number-watermark">02</div>
              <div className="step-icon-wrap">
                <Search size={22} />
              </div>
              <h3 className="step-card-title">Explore</h3>
              <p className="step-card-desc">
                Go beyond surface search. Dig through SEC filings, run technical benchmark tests, conduct cold interviews with operators, and document raw field notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number-watermark">03</div>
              <div className="step-icon-wrap">
                <Lightbulb size={22} />
              </div>
              <h3 className="step-card-title">Discover</h3>
              <p className="step-card-desc">
                Synthesize insights and unearth counter-intuitive truths. Embrace intellectual honesty by explicitly articulating what remains uncertain or contradictory.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-number-watermark">04</div>
              <div className="step-icon-wrap">
                <Trophy size={22} />
              </div>
              <h3 className="step-card-title">Showcase</h3>
              <p className="step-card-desc">
                Produce tangible artifacts: open financial teardown sheets, hardware prototypes, whitepapers, or interactive code that proves your execution taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BENEFITS SECTION: Dual Audience Value Props
          ========================================================================= */}
      <section className="section-benefits">
        <div className="content-wrap">
          <div className="section-header-centered">
            <span className="section-super-title">Mutual Discovery</span>
            <h2 className="section-main-title">A better signal for both sides of hiring</h2>
            <p className="section-subtext">
              Replacing the resume keyword arms race with genuine intellectual curiosity.
            </p>
          </div>

          <div className="benefits-split-grid">
            {/* For Students */}
            <div className="benefit-column">
              <div className="benefit-col-badge student">
                <GraduationCap size={14} />
                <span>For Students & Graduates</span>
              </div>
              <h3 className="benefit-col-title">Break out of the "no experience" catch-22</h3>
              
              <ul className="benefit-points-list">
                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Evidence over pedigree</strong>
                    <p>Demonstrate your analytical depth, technical taste, and agency even if you haven't held a prestigious summer internship yet.</p>
                  </div>
                </li>

                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Own your intellectual narrative</strong>
                    <p>Transform your idiosyncratic rabbit holes and weekend projects into structured, verified milestones that reflect your real passions.</p>
                  </div>
                </li>

                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Attract high-conviction teams</strong>
                    <p>Skip generic applicant tracking systems and let founders, researchers, and recruiters reach out directly based on your specific inquiries.</p>
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: '2rem' }}>
                <button 
                  onClick={() => onNavigateToPassport('alex-morgan')}
                  className="btn btn-secondary btn-sm"
                >
                  Inspect Alex's Sample Passport
                </button>
              </div>
            </div>

            {/* For Employers */}
            <div className="benefit-column">
              <div className="benefit-col-badge employer">
                <Building size={14} />
                <span>For Hiring Teams & Founders</span>
              </div>
              <h3 className="benefit-col-title">Discover high-agency candidates before anyone else</h3>
              
              <ul className="benefit-points-list">
                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Unfiltered problem-solving signal</strong>
                    <p>See how a candidate asks questions, structures hypotheses, navigates dead ends, and synthesizes messy real-world data.</p>
                  </div>
                </li>

                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Identify true intrinsic motivation</strong>
                    <p>Differentiate students who merely memorized coursework from self-directed explorers who naturally build and investigate on their own time.</p>
                  </div>
                </li>

                <li className="benefit-point-item">
                  <div className="point-icon">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="point-text">
                    <strong>Context-rich outreach</strong>
                    <p>Send personalized invitations citing specific trails and teardowns, dramatically increasing positive response rates.</p>
                  </div>
                </li>
              </ul>

              <div style={{ marginTop: '2rem' }}>
                <button 
                  onClick={onNavigateToEmployer}
                  className="btn btn-primary btn-sm"
                >
                  Explore Employer Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="content-wrap" style={{ paddingBottom: '3rem' }}>
        <div className="cta-banner-section">
          <h2>Ready to discover tomorrow's thinkers?</h2>
          <p>
            Browse through interdisciplinary student passports across business, materials engineering, and cognitive science.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onNavigateToEmployer}
              className="btn btn-secondary btn-lg"
              style={{ backgroundColor: 'var(--cream-50)', color: 'var(--ink-950)' }}
            >
              Open Employer Discovery Portal
            </button>
            <button 
              onClick={() => onNavigateToPassport('alex-morgan')}
              className="btn btn-sage btn-lg"
              style={{ color: 'var(--ink-950)' }}
            >
              Explore Alex's Passport
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
