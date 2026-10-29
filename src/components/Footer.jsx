import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export function Footer({ setCurrentView }) {
  const navigateTo = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-icon-seal" style={{ width: '32px', height: '32px' }}>
                <Compass size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--paper)', fontWeight: 600 }}>
                Curiosity Passport
              </span>
            </div>
            <p>
              The public portfolio platform where students turn questions explored into proof of agency, analytical taste, and real potential.
            </p>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.75rem', 
              color: 'var(--brass-300)',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid rgba(223, 178, 79, 0.25)'
            }}>
              <ShieldCheck size={14} />
              <span>Fictional Demonstration Prototype</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="footer-heading">Platform Views</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => navigateTo('landing')}>
                  Landing Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('passport')}>
                  Student Passport (Alex Morgan)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('trail')}>
                  Featured Curiosity Trail
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('office')}>
                  Field Office (Meetings & Quests)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('employer')}>
                  Employer Discovery Portal
                </button>
              </li>
            </ul>
          </div>

          {/* The Curiosity Framework */}
          <div>
            <h4 className="footer-heading">The Four Steps</h4>
            <ul className="footer-links-list">
              <li><span style={{ color: 'var(--sage-300)' }}>01. Question:</span> Honest Inquiries</li>
              <li><span style={{ color: 'var(--sage-300)' }}>02. Explore:</span> Primary Field Sourcing</li>
              <li><span style={{ color: 'var(--sage-300)' }}>03. Discover:</span> Contradictions & Syntheses</li>
              <li><span style={{ color: 'var(--sage-300)' }}>04. Showcase:</span> Tangible Artifacts</li>
            </ul>
          </div>

          {/* Demonstration Notice */}
          <div>
            <h4 className="footer-heading">Product Vision</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--sage-300)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
              Built for hiring managers who want to see how early-career talent thinks under ambiguity before they ever review a standard resume.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--brass-400)' }}>
              SEED STAGE CONCEPT • 2025
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div>
            © 2025 Curiosity Passport Inc. • Tagline: <em>Your curiosity is your experience.</em>
          </div>
          <div>
            Sample student profiles, trails, and employer endorsements are designed as realistic demo assets.
          </div>
        </div>
      </div>
    </footer>
  );
}
