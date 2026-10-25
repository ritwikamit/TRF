import React, { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { InquiryModal } from './components/InquiryModal';
import { PageTransition } from './components/PageTransition';
import { CookieConsent } from './components/CookieConsent';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatbotModal } from './components/ChatbotModal';

import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsPage } from './pages/TermsPage';

import { Project, PageId } from './types';
import { PAGE_THEMES } from './utils/theme';
import { playShutterClick } from './utils/audio';

const VALID_PAGES: PageId[] = [
  'home',
  'works',
  'about',
  'journal',
  'contact',
  'cookie-policy',
  'terms'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPage, setTargetPage] = useState<PageId | null>(null);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'covering' | 'uncovering'>('idle');

  // Initial loading door-opening sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1350);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL hash changes for direct linking & back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Consistent Camera Shutter Page Transition Handler
  const handleNavigatePage = useCallback((newPage: PageId) => {
    if (newPage === currentPage || isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Play subtle mechanical camera shutter sound
    playShutterClick();

    // Begin circular expanding color transition
    setIsTransitioning(true);
    setTargetPage(newPage);
    setTransitionPhase('covering');

    // Midpoint: Switch page and reset scroll position
    setTimeout(() => {
      setCurrentPage(newPage);
      window.location.hash = newPage;
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitionPhase('uncovering');

      // Finish transition
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionPhase('idle');
        setTargetPage(null);
      }, 500);
    }, 550);
  }, [currentPage, isTransitioning]);

  const activeTheme = PAGE_THEMES[currentPage] || PAGE_THEMES.home;

  return (
    <div className={`min-h-screen ${activeTheme.pageBgClass} font-sans selection:bg-[#FF6B00] selection:text-white relative transition-colors duration-500`}>
      {/* 32px Circular Interactive Difference Cursor with Lerp and 2.5x Hover */}
      <CustomCursor />

      {/* Camera Shutter & Door Opening Consistent Page Transition Overlay */}
      <PageTransition
        isInitialLoading={isInitialLoading}
        isTransitioning={isTransitioning}
        targetPage={targetPage}
        phase={transitionPhase}
        currentPage={currentPage}
      />

      {/* Fixed Header with dark luxury backdrop and navigation */}
      <Header
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Dedicated Page Render with Section Specific Styling */}
      <main className="min-h-screen">
        {currentPage === 'home' && (
          <HomePage
            onSelectProject={(project) => setSelectedProject(project)}
            onNavigatePage={handleNavigatePage}
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}

        {currentPage === 'works' && (
          <WorksPage
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}

        {currentPage === 'journal' && (
          <JournalPage
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'cookie-policy' && (
          <CookiePolicyPage
            onNavigatePage={handleNavigatePage}
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}

        {currentPage === 'terms' && (
          <TermsPage
            onNavigatePage={handleNavigatePage}
            onOpenInquiry={() => setIsInquiryOpen(true)}
          />
        )}
      </main>

      {/* High-Contrast Minimal Footer with Dedicated Page Links */}
      <Footer
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onNavigatePage={handleNavigatePage}
      />

      {/* Photography Case Study Lightbox / EXIF Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenInquiry={() => {
          setSelectedProject(null);
          setIsInquiryOpen(true);
        }}
      />

      {/* Quick Commission Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Floating Scroll to Top button with border progress filling as user scrolls */}
      <ScrollToTop />

      {/* Floating TRF AI Concierge Chatbot Button & Drawer */}
      <ChatbotModal onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Functional Cookie Consent Banner */}
      <CookieConsent onNavigatePage={handleNavigatePage} />
    </div>
  );
}
