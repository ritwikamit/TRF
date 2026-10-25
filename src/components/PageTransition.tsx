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
  // Internal animation stage for the door opening & color zoom
  // Stages: 'idle' | 'draw' (line + rectangle appear) | 'open' (doors swing open + color zooms) | 'exit' (fade overlay out)
  const [animStage, setAnimStage] = useState<'idle' | 'draw' | 'open' | 'exit'>('idle');

  // Determine active theme color based on transition target or initial page
  const activePageId = targetPage || currentPage || 'home';
  const theme = PAGE_THEMES[activePageId] || PAGE_THEMES.home;
  const isHome = activePageId === 'home';

  // Exact color of the page: Home is pure white #FFFFFF, others use their distinct theme color
  const pageColor = isHome ? '#FFFFFF' : theme.primaryColor;

  // Handle Initial Load Sequence
  useEffect(() => {
    if (isInitialLoading) {
      setAnimStage('draw');
      // After line draws, swing the door open and zoom color
      const timer1 = setTimeout(() => {
        setAnimStage('open');
      }, 350);

      const timer2 = setTimeout(() => {
        setAnimStage('exit');
      }, 1050);

      const timer3 = setTimeout(() => {
        setAnimStage('idle');
      }, 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInitialLoading]);

  // Handle Page-to-Page Navigation Transition
  useEffect(() => {
    if (isTransitioning) {
      if (phase === 'covering') {
        setAnimStage('draw');
        const timer1 = setTimeout(() => {
          setAnimStage('open');
        }, 150);
        return () => clearTimeout(timer1);
      } else if (phase === 'uncovering') {
        setAnimStage('exit');
        const timer2 = setTimeout(() => {
          setAnimStage('idle');
        }, 400);
        return () => clearTimeout(timer2);
      }
    } else if (!isInitialLoading) {
      setAnimStage('idle');
    }
  }, [isTransitioning, phase, isInitialLoading]);

  const shouldRender = isInitialLoading || isTransitioning || animStage !== 'idle';
  if (!shouldRender) return null;

  const isDrawn = animStage === 'draw' || animStage === 'open' || animStage === 'exit';
  const isDoorOpen = animStage === 'open' || animStage === 'exit';
  const isExiting = animStage === 'exit';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden select-none"
      style={{
        perspective: '1400px' // High-fidelity 3D perspective for realistic door swinging
      }}
    >
      {/* 1. Black Screen Background Overlay */}
      <div
        className="absolute inset-0 bg-[#050505] transition-opacity duration-500 ease-out"
        style={{
          opacity: isExiting ? 0 : 1
        }}
      />

      {/* 2. Horizontal Line Across the Screen Middle */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 overflow-hidden transition-all duration-500"
        style={{
          opacity: isExiting ? 0 : isDrawn ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Glow backdrop behind line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-[1px]" />
        {/* High-precision center white line that expands outward */}
        <div
          className="h-full mx-auto bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-700 ease-out"
          style={{
            width: isDrawn ? '100%' : '0%'
          }}
        />
      </div>

      {/* 3. Smooth Zooming Color Layer - Originates from center rectangle and smoothly zooms to bathe entire screen */}
      <div
        className="absolute rounded-2xl will-change-transform shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        style={{
          backgroundColor: pageColor,
          width: '120px',
          height: '160px',
          transform: isDoorOpen ? 'scale(45)' : isDrawn ? 'scale(1)' : 'scale(0.8)',
          opacity: isExiting ? 0 : isDoorOpen ? 1 : isDrawn ? 0.95 : 0,
          transition: `transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease-out`,
          transformOrigin: 'center center'
        }}
      />

      {/* 4. Small Colored Rectangle with Curved Edges that Opens Like a Door */}
      <div
        className="relative z-20 w-[120px] h-[160px] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex transition-all duration-500"
        style={{
          transform: isDrawn ? 'scale(1)' : 'scale(0.7)',
          opacity: isExiting ? 0 : isDrawn ? 1 : 0,
          transformStyle: 'preserve-3d',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Outer glowing border rim around the curved rectangle */}
        <div
          className="absolute -inset-[1px] rounded-2xl border border-white/30 pointer-events-none transition-opacity duration-300"
          style={{ opacity: isDoorOpen ? 0 : 1 }}
        />

        {/* LEFT DOOR LEAF */}
        <div
          className="w-1/2 h-full rounded-l-2xl border-r border-black/15 shadow-lg relative overflow-hidden transition-all duration-700 ease-out"
          style={{
            backgroundColor: pageColor,
            transformOrigin: 'left center',
            transform: isDoorOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
            opacity: isDoorOpen ? 0.4 : 1,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Subtle door panel highlight & handle notch */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/2 right-1.5 w-1 h-4 -translate-y-1/2 rounded-full bg-black/20" />
        </div>

        {/* RIGHT DOOR LEAF */}
        <div
          className="w-1/2 h-full rounded-r-2xl border-l border-black/15 shadow-lg relative overflow-hidden transition-all duration-700 ease-out"
          style={{
            backgroundColor: pageColor,
            transformOrigin: 'right center',
            transform: isDoorOpen ? 'rotateY(110deg)' : 'rotateY(0deg)',
            opacity: isDoorOpen ? 0.4 : 1,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Subtle door panel highlight & handle notch */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1.5 w-1 h-4 -translate-y-1/2 rounded-full bg-black/20" />
        </div>
      </div>

      {/* 5. Minimal Studio Tagline Floating Below the Rectangle During Reveal */}
      <div
        className="absolute top-[calc(50%+100px)] text-center transition-all duration-500 font-mono text-[11px] tracking-widest uppercase text-white/70"
        style={{
          opacity: isDoorOpen || isExiting ? 0 : isDrawn ? 1 : 0,
          transform: isDrawn ? 'translateY(0)' : 'translateY(8px)'
        }}
      >
        <span className="font-semibold text-white">TRF</span>
        <span className="mx-2 text-white/40">·</span>
        <span>{theme.name}</span>
      </div>
    </div>
  );
};
