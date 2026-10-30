import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { PassportView } from './components/PassportView';
import { CuriosityTrailView } from './components/CuriosityTrailView';
import { EmployerDiscoveryView } from './components/EmployerDiscoveryView';
import { FieldOfficeView } from './components/FieldOfficeView';
import { InviteModal } from './components/InviteModal';
import { StampCollectionModal } from './components/StampCollectionModal';
import { RankUpModal } from './components/RankUpModal';
import { TourBriefingCard } from './components/TourBriefingCard';
import { CuriosityReportModal } from './components/CuriosityReportModal';
import { Toast } from './components/Toast';
import { students } from './data/studentsData';
import { useFieldLog } from './hooks/useFieldLog';
import { scrollToTop } from './lib/scrollToTop';

// Initial theme: persisted choice wins, otherwise follow the OS preference.
// index.html also runs this read before paint to avoid a flash.
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('curiosity-passport-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('landing');
  const [selectedStudentId, setSelectedStudentId] = useState('alex-morgan');
  const [selectedTrailId, setSelectedTrailId] = useState('sustainable-fashion');

  // Theme (light/dark) — persisted, applied via the <html data-theme> attr.
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('curiosity-passport-theme', theme);
    } catch {}
  }, [theme]);

  const handleToggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // Field log: the persistent gamification source of truth (XP, rank,
  // streak, shortlist, invites). Survives refresh via localStorage.
  const fieldLog = useFieldLog();

  // Shortlist & Invites now live in the field log, so they persist.
  const shortlist = fieldLog.shortlist;
  const invitedStudents = fieldLog.invited;
  const [filterShortlistedOnly, setFilterShortlistedOnly] = useState(false);

  const [inviteModalStudent, setInviteModalStudent] = useState(null);
  const [stampModalOpen, setStampModalOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [activeRankUp, setActiveRankUp] = useState(null);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, tone) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, tone: tone || 'default' }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Announce XP gains, stamp earns, and promotions from a field-log
  // mutation result (the shape returned by award / toggleShortlist /
  // registerInvite / attendMeeting / completeQuest / logReview / writeInquiry).
  const announceXp = (result, verbLabel) => {
    if (result && result.earned > 0) {
      addToast(`${verbLabel} · +${result.earned} XP`, 'xp');
    }
    (result?.newStamps || []).forEach((stamp) => {
      addToast(`Stamp earned: ${stamp.name} (${stamp.stampCode})`, 'stamp');
    });
    // Promotions get the full ceremony modal instead of a toast.
    if (result && result.rankUp) {
      setActiveRankUp(result.rankUp);
    }
  };

  // Mark today as a field-log visit day (drives the streak counter) and
  // settle any stamp whose predicate newly holds on load (e.g. the return
  // streak). Toasts earned stamps so a comeback day has a reward.
  useEffect(() => {
    fieldLog.touchVisit();
    const earned = fieldLog.settleStamps();
    earned.forEach((stamp) => addToast(`Stamp earned: ${stamp.name} (${stamp.stampCode})`, 'stamp'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Opening the player's own passport counts toward the guided tour.
  useEffect(() => {
    if (selectedStudentId === 'you') fieldLog.markPassportVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudentId]);

  // Navigation handlers
  const handleNavigateToPassport = (studentId = 'alex-morgan') => {
    setSelectedStudentId(studentId);
    setCurrentView('passport');
    scrollToTop();
  };

  const handleNavigateToTrail = (trailId = 'sustainable-fashion') => {
    setSelectedTrailId(trailId);
    setCurrentView('trail');
    scrollToTop();
  };

  const handleNavigateToEmployer = () => {
    setCurrentView('employer');
    setFilterShortlistedOnly(false);
    scrollToTop();
  };

  const handleNavigateToOffice = () => {
    setCurrentView('office');
    scrollToTop();
  };

  const handleOpenShortlistFromHeader = () => {
    setCurrentView('employer');
    setFilterShortlistedOnly(true);
    scrollToTop();
  };

  // Shortlist toggle — persisted via the field log; additions award XP.
  const handleToggleShortlist = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const studentName = student ? student.name : 'Student';
    const wasShortlisted = shortlist.includes(studentId);

    const result = fieldLog.toggleShortlist(studentId);

    if (wasShortlisted) {
      addToast(`Removed ${studentName} from your shortlist.`);
    } else {
      addToast(`Added ${studentName} to your candidate shortlist.`);
    }
    announceXp(result, 'Shortlist');
  };

  // Invite Modal & Handlers
  const handleOpenInviteModal = (student) => {
    setInviteModalStudent(student);
  };

  const handleCloseInviteModal = () => {
    setInviteModalStudent(null);
  };

  const handleSendInvite = ({ studentId, studentName, companyName, roleType }) => {
    const result = fieldLog.registerInvite(studentId);
    setInviteModalStudent(null);
    addToast(`Demo invitation sent to ${studentName} for "${roleType}" on behalf of ${companyName}!`);
    announceXp(result, 'Outreach');
  };

  // Demo pipeline: while the user is on the employer view, each active invite
  // advances a stage on a gentle timer so the showcase feels alive. The
  // recruiter can also advance by hand (button on each card).
  useEffect(() => {
    if (currentView !== 'employer') return undefined;
    const id = setInterval(() => {
      const statuses = fieldLog.inviteStatus;
      const moving = Object.entries(statuses).find(
        ([, st]) => st.stage !== 'Offer'
      );
      if (!moving) return;
      const [studentId] = moving;
      const result = fieldLog.advanceInvite(studentId);
      if (result?.moved) {
        const name = students.find((s) => s.id === studentId)?.name || 'A candidate';
        addToast(`${name} moved to "${result.stage}"`, result.stage === 'Offer' ? 'stamp' : 'xp');
        announceXp(result, 'Pipeline');
      }
    }, 20000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView, fieldLog.inviteStatus]);

  const handleAdvanceInvite = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const result = fieldLog.advanceInvite(studentId);
    if (!result) return;
    if (result.moved) {
      addToast(`${student?.name || 'Candidate'} moved to "${result.stage}"`, result.stage === 'Offer' ? 'stamp' : 'xp');
      announceXp(result, 'Pipeline');
    } else {
      addToast(`${student?.name || 'Candidate'} is at the final stage.`);
    }
  };

  // Guided tour goals — each ticks off as the underlying log facts land.
  const exploredTrails = fieldLog.exploredTrails || {};
  const tourGoals = [
    {
      id: 'trail',
      label: 'Open a trail and read 2+ stages',
      done: Object.values(exploredTrails).some((t) => (t.stagesRead || 0) >= 2),
      action: () => handleNavigateToTrail('sustainable-fashion'),
    },
    {
      id: 'meeting',
      label: 'Check into a Field Office meeting',
      done: (fieldLog.attendanceTotal || 0) >= 1,
      action: () => handleNavigateToOffice(),
    },
    {
      id: 'invite',
      label: 'Send a recruiter invite',
      done: (fieldLog.invited || []).length >= 1,
      action: () => handleNavigateToEmployer(),
    },
    {
      id: 'you',
      label: 'Open your own passport',
      done: !!fieldLog.yourPassportVisited,
      action: () => handleNavigateToPassport('you'),
    },
  ];

  const handleCompleteTour = () => {
    const result = fieldLog.completeTour();
    addToast('Tour complete — Wayfinder stamp in your collection.');
    announceXp(result, 'Tour complete');
  };

  const handleSkipTour = () => fieldLog.skipTour();

  // Carry-able: download the field log, restore a previous export, or open
  // the printable one-page report.
  const handleExportLog = () => {
    fieldLog.exportFieldLog();
    addToast('Field log downloaded as JSON.');
  };

  const handleImportLog = async (file) => {
    const result = await fieldLog.importFieldLog(file);
    if (result.ok) {
      addToast(`Field log restored · ${result.xp} XP.`, 'xp');
    } else {
      addToast(result.error || 'Import failed.', 'default');
    }
  };

  const handleSeedDemo = () => {
    const result = fieldLog.seedDemo();
    addToast(
      `Demo portfolio loaded · ${result.xp} XP, ${result.newStamps.length} seals.`,
      'stamp'
    );
    announceXp(result, 'Demo portfolio');
    setStampModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* Keyboard/screen-reader shortcut past the navigation */}
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Universal Sticky Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'employer') setFilterShortlistedOnly(false);
          scrollToTop();
        }}
        shortlistCount={shortlist.length}
        onOpenShortlist={handleOpenShortlistFromHeader}
        fieldLog={fieldLog}
        onOpenStamps={() => setStampModalOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* View Router */}
      <main id="main-content" className="main-content">
        {currentView === 'landing' && (
          <>
            <LandingView
              onNavigateToPassport={handleNavigateToPassport}
              onNavigateToTrail={handleNavigateToTrail}
              onNavigateToEmployer={handleNavigateToEmployer}
            />
            {/* First-visit 90-second tour — hides itself once finished or skipped */}
            <TourBriefingCard
              fieldLog={fieldLog}
              goals={tourGoals}
              onComplete={handleCompleteTour}
              onSkip={handleSkipTour}
            />
          </>
        )}

        {currentView === 'passport' && (
          <PassportView
            studentId={selectedStudentId}
            onSelectStudent={(id) => setSelectedStudentId(id)}
            onNavigateToTrail={handleNavigateToTrail}
            onToggleShortlist={handleToggleShortlist}
            isShortlisted={shortlist.includes(selectedStudentId)}
            onOpenInviteModal={handleOpenInviteModal}
            fieldLog={selectedStudentId === 'you' ? fieldLog : null}
            onWriteInquiry={(text) => {
              const result = fieldLog.writeInquiry(text);
              addToast('Your question has been filed to your passport.');
              announceXp(result, 'Question filed');
            }}
          />
        )}

        {currentView === 'trail' && (
          <CuriosityTrailView
            trailId={selectedTrailId}
            onSelectTrail={handleNavigateToTrail}
            onBackToPassport={(studentId) => handleNavigateToPassport(studentId || selectedStudentId)}
            onOpenInviteModal={handleOpenInviteModal}
            onShowToast={addToast}
            onAwardXp={(actionKey, label) => announceXp(fieldLog.award(actionKey), label)}
            onLogReview={(trailId, focus) => {
              const result = fieldLog.logReview(trailId, focus);
              addToast('Peer review filed to your passport.');
              announceXp(result, 'Peer review');
            }}
            onNoteActivity={fieldLog.noteTrailActivity}
            reviewedFocus={(fieldLog.reviews || []).find((r) => r.trailId === selectedTrailId)?.focus}
          />
        )}

        {currentView === 'office' && (
          <FieldOfficeView
            fieldLog={fieldLog}
            onShowToast={addToast}
            onAwardLabel={(result) => announceXp(result, 'Field Office')}
          />
        )}

        {currentView === 'employer' && (
          <EmployerDiscoveryView
            onNavigateToPassport={handleNavigateToPassport}
            onNavigateToTrail={handleNavigateToTrail}
            shortlist={shortlist}
            onToggleShortlist={handleToggleShortlist}
            onOpenInviteModal={handleOpenInviteModal}
            invitedStudents={invitedStudents}
            inviteStatus={fieldLog.inviteStatus}
            onAdvanceInvite={handleAdvanceInvite}
            filterShortlistedOnly={filterShortlistedOnly}
            setFilterShortlistedOnly={setFilterShortlistedOnly}
          />
        )}
      </main>

      {/* Recruiter Outreach Simulation Modal */}
      <InviteModal
        isOpen={!!inviteModalStudent}
        student={inviteModalStudent}
        onClose={handleCloseInviteModal}
        onSendInvite={handleSendInvite}
      />

      {/* Field Office: Stamp Collection (carry-able controls + reset) */}
      <StampCollectionModal
        isOpen={stampModalOpen}
        onClose={() => setStampModalOpen(false)}
        earnedStamps={fieldLog.earnedStamps}
        xp={fieldLog.xp}
        onResetLog={() => {
          if (window.confirm('Reset your field log? This clears all XP, stamps, attendance, and notes for this demo.')) {
            fieldLog.resetLog();
          }
        }}
        onExport={handleExportLog}
        onImportFile={handleImportLog}
        onOpenReport={() => setReportOpen(true)}
        onSeedDemo={handleSeedDemo}
      />

      {/* The printable one-page portfolio */}
      <CuriosityReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        fieldLog={fieldLog}
      />

      {/* Rank promotion ceremony */}
      <RankUpModal rankUp={activeRankUp} onClose={() => setActiveRankUp(null)} />

      {/* Global Toast Notification System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Universal Editorial Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
