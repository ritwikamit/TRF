import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { PAGE_THEMES } from '../utils/theme';

interface PageTransitionProps {
  isInitialLoading?: boolean;
  isTransitioning: boolean;
  targetPage: PageId | null;
  phase: 'idle' | 'covering' | 'uncovering';
  currentPage: PageId;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isInitialLoading = false,
  isTransitioning,
  targetPage,
  phase,
  currentPage
}) => {
  // Animation stages:
  // 'idle': completely hidden, viewer is on the page
  // 'intro': viewer stands in front of the door with specific page color backdrop
  // 'approaching': viewer flies forward into the door as doors swing wide open in 3D
  // 'revealing': viewer passes behind the door onto the page, doors fly past screen peripheries
  const [stage, setStage] = useState<'idle' | 'intro' | 'approaching' | 'revealing'>('idle');

  const activePageId = targetPage || currentPage || 'home';
  const theme = PAGE_THEMES[activePageId] || PAGE_THEMES.home;
  const isHome = activePageId === 'home';
  const isYellowContact = activePageId === 'contact';

  // Specific theme color for the background AND doors of this page
  // Home: Pure White (#FFFFFF)
  // Works: Vibrant Orange (#EA580C)
  // About: Royal Purple (#7C3AED)
  // Journal: Parrot Green (#16A34A)
  // Contact: Warm Yellow (#EAB308)
  // Cookie Policy: Sky Blue (#0EA5E9)
  // Terms: Slate (#475569)
  const pageColor = isHome ? '#FFFFFF' : theme.primaryColor;

  // Adaptive contrast tokens based on the specific page color
  const isDarkContent = isHome || isYellowContact;
  const textColor = isDarkContent ? 'text-black' : 'text-white';
  const subTextColor = isDarkContent ? 'text-neutral-700' : 'text-white/80';
  const doorBorderColor = isDarkContent ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)';
  const handleColor = isDarkContent ? '#111111' : '#FFFFFF';
  const lineColor = isDarkContent
    ? 'from-transparent via-black/35 to-transparent'
    : 'from-transparent via-white/70 to-transparent';

  // Initial Load Sequence
  useEffect(() => {
    if (isInitialLoading) {
      setStage('intro');

      // Super smooth easing: viewer moves through door
      const t1 = setTimeout(() => {
        setStage('approaching');
      }, 380);

      const t2 = setTimeout(() => {
        setStage('revealing');
      }, 1050);

      const t3 = setTimeout(() => {
        setStage('idle');
      }, 1550);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isInitialLoading]);

  // Page-to-Page Navigation Sequence
  useEffect(() => {
    if (isTransitioning) {
      if (phase === 'covering') {
        setStage('intro');
        const t1 = setTimeout(() => {
          setStage('approaching');
        }, 160);
        return () => clearTimeout(t1);
      } else if (phase === 'uncovering') {
        setStage('revealing');
        const t2 = setTimeout(() => {
          setStage('idle');
        }, 450);
        return () => clearTimeout(t2);
      }
    } else if (!isInitialLoading) {
      setStage('idle');
    }
  }, [isTransitioning, phase, isInitialLoading]);

  if (!isInitialLoading && !isTransitioning && stage === 'idle') {
    return null;
  }

  const isIntro = stage === 'intro';
  const isApproaching = stage === 'approaching';
  const isRevealing = stage === 'revealing';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden select-none"
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* 1. Coordinated Ambient Depth Veil - Page is Clearly Visible Behind the Door */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          opacity: isRevealing ? 0 : isApproaching ? 0.2 : 0.65,
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
          background: isDarkContent
            ? `radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.35) 45%, ${pageColor} 100%)`
            : `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 45%, ${pageColor} 100%)`
        }}
      />

      {/* 2. Sleek Horizontal Line in Screen Middle */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 pointer-events-none overflow-hidden transition-all duration-700"
        style={{
          opacity: isRevealing ? 0 : isIntro ? 0.9 : 0.35,
          transform: isApproaching ? 'translateY(-50%) scaleX(1.8)' : 'translateY(-50%) scaleX(1)',
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <div
          className={`h-full mx-auto bg-gradient-to-r ${lineColor} transition-all duration-700`}
          style={{
            width: isIntro || isApproaching ? '100%' : '0%',
            transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
          }}
        />
      </div>

      {/* 3. The 3D Curved Doorway: approaches the screen and viewer flies forward through it */}
      <div
        className="relative z-30 flex items-center justify-center will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          // Super smooth 3D camera travel: starts at center, advances forward, flies past screen
          transform: isIntro
            ? 'scale(1) translate3d(0, 0, 0px)'
            : isApproaching
            ? 'scale(3.5) translate3d(0, 0, 280px)'
            : 'scale(8.5) translate3d(0, 0, 650px)',
          opacity: isRevealing ? 0 : 1,
          transition: isIntro
            ? 'transform 400ms cubic-bezier(0.19, 1, 0.22, 1), opacity 300ms ease-out'
            : isApproaching
            ? 'transform 750ms cubic-bezier(0.19, 1, 0.22, 1), opacity 500ms ease-out'
            : 'transform 500ms ease-in, opacity 400ms ease-out'
        }}
      >
        {/* Door Outer Curved Architectural Frame */}
        <div
          className="relative w-[140px] h-[195px] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.45)] flex p-[3.5px] transition-all duration-600"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: isDarkContent ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)',
            border: `1.5px solid ${doorBorderColor}`
          }}
        >
          {/* Center Portal - Crystal clear transparent opening showing the page directly through the doorway */}
          <div className="absolute inset-1 rounded-xl overflow-hidden pointer-events-none flex items-center justify-center" />

          {/* LEFT DOOR LEAF - Swings open to the left in 3D space */}
          <div
            className="w-1/2 h-full rounded-l-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: pageColor,
              transformOrigin: 'left center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(-120deg) translateX(-20px)'
                : 'rotateY(-145deg) translateX(-90px)',
              boxShadow: isApproaching || isRevealing ? '0 16px 40px rgba(0,0,0,0.5)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
              borderRight: isDarkContent ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Panel highlight & bevel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isDarkContent
                  ? 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)'
                  : 'linear-gradient(to right, rgba(255,255,255,0.18), transparent)'
              }}
            />
            <div
              className="absolute top-2.5 bottom-2.5 left-2 right-1.5 rounded-lg pointer-events-none border"
              style={{ borderColor: isDarkContent ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.25)' }}
            />
            {/* Minimal Door Handle */}
            <div
              className="absolute top-1/2 right-2 w-1.5 h-6 -translate-y-1/2 rounded-full shadow-md transition-colors"
              style={{ backgroundColor: handleColor }}
            />
          </div>

          {/* RIGHT DOOR LEAF - Swings open to the right in 3D space */}
          <div
            className="w-1/2 h-full rounded-r-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: pageColor,
              transformOrigin: 'right center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(120deg) translateX(20px)'
                : 'rotateY(145deg) translateX(90px)',
              boxShadow: isApproaching || isRevealing ? '0 16px 40px rgba(0,0,0,0.5)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
              borderLeft: isDarkContent ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Panel highlight & bevel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isDarkContent
                  ? 'linear-gradient(to left, rgba(0,0,0,0.08), transparent)'
                  : 'linear-gradient(to left, rgba(255,255,255,0.18), transparent)'
              }}
            />
            <div
              className="absolute top-2.5 bottom-2.5 right-2 left-1.5 rounded-lg pointer-events-none border"
              style={{ borderColor: isDarkContent ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.25)' }}
            />
            {/* Minimal Door Handle */}
            <div
              className="absolute top-1/2 left-2 w-1.5 h-6 -translate-y-1/2 rounded-full shadow-md transition-colors"
              style={{ backgroundColor: handleColor }}
            />
          </div>
        </div>
      </div>

      {/* 4. Coordinated Minimal Studio Badge Below the Door */}
      <div
        className={`absolute top-[calc(50%+125px)] text-center transition-all duration-500 font-mono text-[11px] tracking-widest uppercase ${textColor}`}
        style={{
          opacity: isIntro ? 1 : 0,
          transform: isIntro ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0) scale(0.95)',
          transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      >
        <span className="font-bold">TRF</span>
        <span className={`mx-2 ${subTextColor}`}>·</span>
        <span className={subTextColor}>{theme.name}</span>
      </div>
    </div>
  );
};
