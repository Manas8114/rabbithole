import React, { useState, useMemo } from 'react';
import {
  Search,
  Bookmark,
  Send,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Layers,
  RefreshCw,
  Building
} from 'lucide-react';
import { students } from '../data/studentsData';

export function EmployerDiscoveryView({ 
  onNavigateToPassport, 
  onNavigateToTrail,
  shortlist, 
  onToggleShortlist, 
  onOpenInviteModal,
  invitedStudents,
  filterShortlistedOnly,
  setFilterShortlistedOnly
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('All');

  const interestFilters = [
    'All',
    'Circular & Sustainability',
    'Human-AI & Cognitive Systems',
    'Materials & Hardware',
    'Data & Financial Modeling',
  ];

  // Filtering logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // 1. Shortlist filter
      if (filterShortlistedOnly && !shortlist.includes(student.id)) {
        return false;
      }

      // 2. Interest / discipline filter
      if (selectedInterest !== 'All') {
        const matchesInterest = 
          student.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase().slice(0, 5))) ||
          student.discipline.toLowerCase().includes(selectedInterest.toLowerCase().slice(0, 5));
        if (!matchesInterest) return false;
      }

      // 3. Search text query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const nameMatch = student.name.toLowerCase().includes(query);
        const disciplineMatch = student.discipline.toLowerCase().includes(query);
        const universityMatch = student.university.toLowerCase().includes(query);
        const bioMatch = student.intro.toLowerCase().includes(query);
        const questionsMatch = student.trails.some(t => t.question.toLowerCase().includes(query));
        const projectMatch = student.projects.some(p => p.title.toLowerCase().includes(query));
        const skillMatch = student.interests.some(i => i.toLowerCase().includes(query));

        return nameMatch || disciplineMatch || universityMatch || bioMatch || questionsMatch || projectMatch || skillMatch;
      }

      return true;
    });
  }, [searchQuery, selectedInterest, filterShortlistedOnly, shortlist]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedInterest('All');
    setFilterShortlistedOnly(false);
  };

  return (
    <div className="employer-view-container">
      <div className="content-wrap">
        
        {/* =========================================================================
            HEADER & DEMO BANNER
            ========================================================================= */}
        <div className="employer-hero-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span className="demo-pill">
              <Building size={14} />
              <span>Employer Discovery Portal • Fictional Talent Showcase</span>
            </span>
          </div>

          <h1 className="employer-title">
            Discover thinkers by the questions they chase
          </h1>
          <p className="employer-subtitle">
            Evaluate high-conviction students from diverse disciplines based on their self-directed curiosity trails, open-source models, and tangible prototypes.
          </p>
        </div>

        {/* =========================================================================
            CONTROLS: SEARCH, FILTERS & SHORTLIST TOGGLE
            ========================================================================= */}
        <div className="employer-controls-panel">
          <div className="controls-row-top">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={18} className="search-input-icon" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, curiosity question, skill, or university..."
                className="search-input"
                id="employer-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.75rem',
                    color: 'var(--ink-400)'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Shortlist Filter Toggle */}
            <button
              onClick={() => setFilterShortlistedOnly(!filterShortlistedOnly)}
              className={`shortlist-toggle-switch ${filterShortlistedOnly ? 'active' : ''}`}
              id="filter-shortlist-toggle"
            >
              <Bookmark size={15} fill={filterShortlistedOnly ? 'currentColor' : 'none'} />
              <span>
                {filterShortlistedOnly ? 'Showing Shortlisted Only' : 'View Shortlist Only'} ({shortlist.length})
              </span>
            </button>
          </div>

          {/* Interest Chips Filter */}
          <div className="interest-filters-row">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--forest-700)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.25rem' }}>
              Discipline:
            </span>
            {interestFilters.map((interest) => (
              <button
                key={interest}
                onClick={() => setSelectedInterest(interest)}
                className={`filter-chip-btn ${selectedInterest === interest ? 'active' : ''}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {(searchQuery || selectedInterest !== 'All' || filterShortlistedOnly) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--sage-50)',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            color: 'var(--forest-700)'
          }}>
            <div>
              Showing {filteredStudents.length} candidate{filteredStudents.length === 1 ? '' : 's'} matching: 
              <strong> {selectedInterest !== 'All' ? `[${selectedInterest}] ` : ''}</strong>
              {searchQuery ? `"${searchQuery}" ` : ''}
              {filterShortlistedOnly ? '(Shortlisted only)' : ''}
            </div>
            <button 
              onClick={clearFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: 'var(--forest-700)',
                fontWeight: 600
              }}
            >
              <RefreshCw size={13} /> Reset Filters
            </button>
          </div>
        )}

        {/* =========================================================================
            STUDENT PROFILES GRID (Alex Morgan, Priya Chen, Marcus Vance)
            ========================================================================= */}
        {filteredStudents.length > 0 ? (
          <div className="candidate-grid">
            {filteredStudents.map((student) => {
              const isBookmarked = shortlist.includes(student.id);
              const isInvited = invitedStudents.includes(student.id);
              const primaryTrail = student.trails[0] || null;

              return (
                <div key={student.id} className="candidate-card" id={`student-card-${student.id}`}>
                  <div>
                    {/* Card Header & Avatar */}
                    <div className="candidate-card-header">
                      <div className="candidate-profile-meta">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="candidate-avatar"
                        />
                        <div>
                          <h3 className="candidate-name">{student.name}</h3>
                          <div className="candidate-discipline-sub">{student.discipline}</div>
                          <div className="candidate-school-sub">
                            {student.university} • {student.gradYear}
                          </div>
                        </div>
                      </div>

                      {/* Shortlist Bookmark Toggle */}
                      <button
                        onClick={() => onToggleShortlist(student.id)}
                        className={`shortlist-toggle-btn ${isBookmarked ? 'bookmarked' : ''}`}
                        title={isBookmarked ? 'Remove from shortlist' : 'Add to shortlist'}
                        aria-label={`Shortlist ${student.name}`}
                      >
                        <Bookmark size={17} fill={isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <span className="passport-stamp" style={{ padding: '0.3rem 0.65rem' }}>
                        <span className="passport-stamp-code">{student.badge} • CQ {student.stats.cqIndex}</span>
                      </span>
                      {isInvited && (
                        <span style={{ 
                          marginLeft: '0.5rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '9999px',
                          backgroundColor: 'var(--forest-100)',
                          color: 'var(--forest-700)',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          <CheckCircle2 size={13} /> Invited
                        </span>
                      )}
                    </div>

                    {/* Active Curiosity Inquiry Spotlight (or their filed question) */}
                    {primaryTrail ? (
                      <div
                        className="candidate-inquiry-box"
                        onClick={() => onNavigateToTrail(primaryTrail.id)}
                        style={{ cursor: 'pointer', transition: 'all 150ms ease' }}
                        title={`Click to open "${primaryTrail.question}"`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="inquiry-label-micro">Active Curiosity Trail • Explore</div>
                          <ExternalLink size={12} style={{ color: 'var(--forest-600)' }} />
                        </div>
                        <div className="inquiry-headline">
                          "{primaryTrail.question}"
                        </div>
                      </div>
                    ) : (
                      <div className="candidate-inquiry-box" style={{ opacity: 0.9 }}>
                        <div className="inquiry-label-micro">Currently Exploring</div>
                        <div className="inquiry-headline">
                          {student.exploreNext?.[0]?.question || 'Formulating their first open inquiry.'}
                        </div>
                      </div>
                    )}

                    {/* Projects Preview */}
                    <div className="candidate-projects-preview">
                      <div className="preview-label-micro">Tangible Artifacts ({student.projects.length})</div>
                      {student.projects.slice(0, 2).map((proj) => (
                        <div key={proj.id} className="candidate-project-item">
                          <Layers size={13} style={{ color: 'var(--forest-600)', flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {proj.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Skills & Interest Tags */}
                    <div className="candidate-skills-cloud">
                      {student.interests.slice(0, 4).map((interest, idx) => (
                        <span key={idx} className="tag-pill">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="candidate-card-actions">
                    <button
                      onClick={() => onNavigateToPassport(student.id)}
                      className="btn btn-secondary btn-sm"
                      id={`open-passport-btn-${student.id}`}
                    >
                      <span>Open Passport</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => onOpenInviteModal(student)}
                      className={`btn btn-sm ${isInvited ? 'btn-sage' : 'btn-primary'}`}
                      id={`invite-btn-${student.id}`}
                    >
                      <Send size={14} />
                      <span>{isInvited ? 'Invite Sent' : 'Invite'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--cream-card)',
            borderRadius: '16px',
            border: '1px dashed rgba(var(--border-ink), 0.15)'
          }}>
            <Search size={36} style={{ color: 'var(--ink-400)', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--ink-950)', marginBottom: '0.5rem' }}>
              No student profiles match your search criteria
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-600)', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
              Try adjusting your query, removing the shortlist filter, or resetting to "All Disciplines".
            </p>
            <button onClick={clearFilters} className="btn btn-primary btn-sm">
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
