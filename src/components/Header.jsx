import React, { useState } from 'react';
import { Compass, Bookmark, Menu, X } from 'lucide-react';
import { RankMeter } from './RankMeter';
import { ThemeToggle } from './ThemeToggle';

export function Header({ currentView, setCurrentView, shortlistCount, onOpenShortlist, fieldLog, onOpenStamps, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'passport', label: "Student Passport" },
    { id: 'trail', label: 'Curiosity Trail' },
    { id: 'office', label: 'Field Office' },
    { id: 'employer', label: 'Employer Discovery' },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="content-wrap site-header-inner">
        {/* Brand Seal */}
        <div 
          className="brand-badge" 
          onClick={() => handleNavClick('landing')}
          role="button"
          tabIndex={0}
          title="Return to Curiosity Passport Home"
        >
          <div className="brand-icon-seal">
            <Compass size={20} strokeWidth={2.2} />
          </div>
          <div className="brand-text-col">
            <span className="brand-name">Curiosity Passport</span>
            <span className="brand-tagline-micro">Proof of Self-Direction</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link-btn ${currentView === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions & Demo Badges */}
        <div className="header-actions">
          {fieldLog ? (
            <RankMeter
              rank={fieldLog.rank}
              nextRank={fieldLog.nextRank}
              progressPct={fieldLog.progressPct}
              cq={fieldLog.cq}
              xp={fieldLog.xp}
              streak={fieldLog.streak}
              earnedStamps={fieldLog.earnedStamps}
              onOpenStamps={onOpenStamps}
            />
          ) : (
            <div className="demo-pill">
              <span>Interactive Demo</span>
            </div>
          )}

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            onClick={() => {
              if (currentView !== 'employer') {
                setCurrentView('employer');
              }
              onOpenShortlist?.();
            }}
            className="shortlist-badge-btn"
            title="View shortlisted students"
          >
            <Bookmark size={15} />
            <span>Shortlist</span>
            <span className="shortlist-count-circle">{shortlistCount}</span>
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--cream-card)',
          borderBottom: '1px solid rgba(var(--border-ink), 0.12)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: currentView === item.id ? '600' : '500',
                backgroundColor: currentView === item.id ? 'var(--forest-50)' : 'transparent',
                color: currentView === item.id ? 'var(--forest-900)' : 'var(--ink-700)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
