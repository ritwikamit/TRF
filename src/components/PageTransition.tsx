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
  // 'intro': viewer stands in front of the door, page is constantly visible behind
  // 'approaching': viewer flies forward into the door as the doors swing open
  // 'revealing': viewer passes behind the door onto the page, doors fly past screen peripheries
  const [stage, setStage] = useState<'idle' | 'intro' | 'approaching' | 'revealing'>('idle');

  const activePageId = targetPage || currentPage || 'home';
  const theme = PAGE_THEMES[activePageId] || PAGE_THEMES.home;
  const isHome = activePageId === 'home';

  // Exact theme color of the door (pure white for home, vibrant theme color for other pages)
  const doorColor = isHome ? '#FFFFFF' : theme.primaryColor;
  const doorBorderColor = isHome ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.4)';
  const handleColor = isHome ? '#111111' : '#FFFFFF';

  // Initial Load Sequence
  useEffect(() => {
    if (isInitialLoading) {
      setStage('intro');

      // Viewer starts advancing through the door as it swings open
      const t1 = setTimeout(() => {
        setStage('approaching');
      }, 350);

      // Viewer moves behind the door directly onto the page
      const t2 = setTimeout(() => {
        setStage('revealing');
      }, 950);

      // Transition finished
      const t3 = setTimeout(() => {
        setStage('idle');
      }, 1400);

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
        }, 150);
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
        perspective: '1200px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* 1. Cinematic Ambient Lighting Overlay - Keeps the pages CONSTANTLY visible behind the door with subtle depth vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.55) 100%)',
          backdropFilter: isIntro ? 'blur(1.5px)' : 'none',
          opacity: isRevealing ? 0 : 1
        }}
      />

      {/* 2. Sleek Horizontal Line in Screen Middle */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 pointer-events-none overflow-hidden transition-all duration-600 ease-out"
        style={{
          opacity: isRevealing ? 0 : isIntro ? 0.9 : 0.3,
          transform: isApproaching ? 'translateY(-50%) scaleX(1.8)' : 'translateY(-50%) scaleX(1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[1px]" />
        <div
          className="h-full mx-auto bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-600 ease-out"
          style={{
            width: isIntro || isApproaching ? '100%' : '0%'
          }}
        />
      </div>

      {/* 3. The 3D Doorway: Viewer flies forward through the doorway as doors open */}
      <div
        className="relative z-30 flex items-center justify-center will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          // Viewer fly-through motion: starts at distance, zooms massive past screen as viewer goes behind it
          transform: isIntro
            ? 'scale(1) translateZ(0px)'
            : isApproaching
            ? 'scale(3.2) translateZ(280px)'
            : 'scale(7.5) translateZ(650px)',
          opacity: isRevealing ? 0 : 1,
          transition: isIntro
            ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out'
            : isApproaching
            ? 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease-out'
            : 'transform 450ms ease-in, opacity 350ms ease-out'
        }}
      >
        {/* Door Outer Curved Frame */}
        <div
          className="relative w-[135px] h-[190px] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex p-[3px] transition-all duration-500"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(10, 10, 10, 0.35)',
            border: `1.5px solid ${doorBorderColor}`
          }}
        >
          {/* Transparent Portal Opening: The page behind is visible right through the center doorway */}
          <div className="absolute inset-1 rounded-xl overflow-hidden pointer-events-none flex items-center justify-center">
            {/* Soft tint that matches the page color */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundColor: doorColor,
                opacity: isApproaching ? 0.15 : 0.05
              }}
            />
          </div>

          {/* LEFT DOOR LEAF: Swings open to the left in 3D perspective and parts away */}
          <div
            className="w-1/2 h-full rounded-l-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: doorColor,
              transformOrigin: 'left center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(-118deg) translateX(-18px)'
                : 'rotateY(-140deg) translateX(-80px)',
              boxShadow: isApproaching || isRevealing ? '0 12px 36px rgba(0,0,0,0.85)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              borderRight: '1px solid rgba(0,0,0,0.15)'
            }}
          >
            {/* Subtle wood/metal door panel bevels */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute top-2 bottom-2 left-2 right-1 border border-black/10 rounded-lg pointer-events-none" />
            {/* Door Handle */}
            <div
              className="absolute top-1/2 right-1.5 w-1 h-5 -translate-y-1/2 rounded-full shadow-sm"
              style={{ backgroundColor: handleColor }}
            />
          </div>

          {/* RIGHT DOOR LEAF: Swings open to the right in 3D perspective and parts away */}
          <div
            className="w-1/2 h-full rounded-r-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: doorColor,
              transformOrigin: 'right center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(118deg) translateX(18px)'
                : 'rotateY(140deg) translateX(80px)',
              boxShadow: isApproaching || isRevealing ? '0 12px 36px rgba(0,0,0,0.85)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              borderLeft: '1px solid rgba(0,0,0,0.15)'
            }}
          >
            {/* Subtle wood/metal door panel bevels */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute top-2 bottom-2 right-2 left-1 border border-black/10 rounded-lg pointer-events-none" />
            {/* Door Handle */}
            <div
              className="absolute top-1/2 left-1.5 w-1 h-5 -translate-y-1/2 rounded-full shadow-sm"
              style={{ backgroundColor: handleColor }}
            />
          </div>
        </div>
      </div>

      {/* 4. Elegant Minimal Studio Tagline floating below the door */}
      <div
        className="absolute top-[calc(50%+120px)] text-center transition-all duration-400 font-mono text-[11px] tracking-widest uppercase text-white/70"
        style={{
          opacity: isIntro ? 1 : 0,
          transform: isIntro ? 'translateY(0)' : 'translateY(12px) scale(0.95)'
        }}
      >
        <span className="font-semibold text-white">TRF</span>
        <span className="mx-2 text-white/40">·</span>
        <span>{theme.name}</span>
      </div>
    </div>
  );
};
