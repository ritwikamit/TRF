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
  // 'idle': completely hidden
  // 'intro': black screen, horizontal line expands, small door sits in the center
  // 'approaching': door rushes forward toward the screen & doors swing wide open
  // 'revealing': door leaves fly past screen edges, backdrop dissolves, revealing page behind
  const [stage, setStage] = useState<'idle' | 'intro' | 'approaching' | 'revealing'>('idle');

  const activePageId = targetPage || currentPage || 'home';
  const theme = PAGE_THEMES[activePageId] || PAGE_THEMES.home;
  const isHome = activePageId === 'home';

  // Exact theme color of the door (pure white for home, vibrant theme color for other pages)
  const doorColor = isHome ? '#FFFFFF' : theme.primaryColor;
  const doorBorderColor = isHome ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)';

  // Initial Load Sequence
  useEffect(() => {
    if (isInitialLoading) {
      setStage('intro');

      // Door begins approaching screen and swinging open
      const t1 = setTimeout(() => {
        setStage('approaching');
      }, 350);

      // Doors fly past screen edges, revealing page behind
      const t2 = setTimeout(() => {
        setStage('revealing');
      }, 900);

      // Animation complete
      const t3 = setTimeout(() => {
        setStage('idle');
      }, 1350);

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
      {/* 1. Black Screen Background Curtain - Fades away as the door opens to reveal the page behind */}
      <div
        className="absolute inset-0 bg-[#060606] transition-opacity duration-600 ease-out"
        style={{
          opacity: isRevealing ? 0 : 1
        }}
      />

      {/* 2. Sleek Horizontal Line in Screen Middle */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 pointer-events-none overflow-hidden transition-all duration-500 ease-out"
        style={{
          opacity: isRevealing ? 0 : isIntro ? 1 : 0.6,
          transform: isApproaching ? 'translateY(-50%) scaleX(1.4)' : 'translateY(-50%) scaleX(1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-[1px]" />
        <div
          className="h-full mx-auto bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-500 ease-out"
          style={{
            width: isIntro || isApproaching ? '100%' : '0%'
          }}
        />
      </div>

      {/* 3. The 3D Door Rig: Rushes forward toward screen as the doors swing open */}
      <div
        className="relative z-30 flex items-center justify-center will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isIntro
            ? 'scale(0.85) translateZ(-80px)'
            : isApproaching
            ? 'scale(2.2) translateZ(120px)'
            : 'scale(4.8) translateZ(400px)',
          opacity: isRevealing ? 0 : 1,
          transition: isIntro
            ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out'
            : isApproaching
            ? 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out'
            : 'transform 500ms ease-in, opacity 350ms ease-out'
        }}
      >
        {/* Door Frame Outer Arch with Curved Edges */}
        <div
          className="relative w-[130px] h-[180px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex p-[3px] transition-all duration-500"
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(10, 10, 10, 0.6)',
            border: `1.5px solid ${doorBorderColor}`
          }}
        >
          {/* Inner Portal Cutout - As doors open, the page appears right behind the door */}
          <div className="absolute inset-1 rounded-xl overflow-hidden pointer-events-none flex items-center justify-center">
            {/* Soft inner glow matching page theme color */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                backgroundColor: doorColor,
                opacity: isApproaching || isRevealing ? 0.35 : 0.08
              }}
            />
          </div>

          {/* LEFT DOOR LEAF - Swings outward to the left into 3D perspective */}
          <div
            className="w-1/2 h-full rounded-l-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: doorColor,
              transformOrigin: 'left center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(-115deg) translateX(-10px)'
                : 'rotateY(-135deg) translateX(-60px)',
              boxShadow: isApproaching || isRevealing ? '0 10px 30px rgba(0,0,0,0.8)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              borderRight: '1px solid rgba(0,0,0,0.15)'
            }}
          >
            {/* Door Panel Bevel & Shadow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute top-2 bottom-2 left-2 right-1 border border-black/10 rounded-lg pointer-events-none" />
            {/* Minimal Door Handle / Latch */}
            <div
              className="absolute top-1/2 right-1.5 w-1 h-5 -translate-y-1/2 rounded-full shadow-sm"
              style={{ backgroundColor: isHome ? '#111111' : '#FFFFFF' }}
            />
          </div>

          {/* RIGHT DOOR LEAF - Swings outward to the right into 3D perspective */}
          <div
            className="w-1/2 h-full rounded-r-xl relative overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: doorColor,
              transformOrigin: 'right center',
              transform: isIntro
                ? 'rotateY(0deg)'
                : isApproaching
                ? 'rotateY(115deg) translateX(10px)'
                : 'rotateY(135deg) translateX(60px)',
              boxShadow: isApproaching || isRevealing ? '0 10px 30px rgba(0,0,0,0.8)' : 'none',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              borderLeft: '1px solid rgba(0,0,0,0.15)'
            }}
          >
            {/* Door Panel Bevel & Shadow */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute top-2 bottom-2 right-2 left-1 border border-black/10 rounded-lg pointer-events-none" />
            {/* Minimal Door Handle / Latch */}
            <div
              className="absolute top-1/2 left-1.5 w-1 h-5 -translate-y-1/2 rounded-full shadow-sm"
              style={{ backgroundColor: isHome ? '#111111' : '#FFFFFF' }}
            />
          </div>
        </div>
      </div>

      {/* 4. Elegant Studio Typography Label that fades out as the door swings open */}
      <div
        className="absolute top-[calc(50%+115px)] text-center transition-all duration-400 font-mono text-[11px] tracking-widest uppercase text-white/75"
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
