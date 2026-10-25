import React from 'react';
import { PageId } from '../types';
import { PAGE_THEMES } from '../utils/theme';
import { Logo } from './Logo';

interface PageTransitionProps {
  isTransitioning: boolean;
  targetPage: PageId | null;
  phase: 'idle' | 'covering' | 'uncovering';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  isTransitioning,
  targetPage,
  phase
}) => {
  if (!isTransitioning || !targetPage) return null;

  const theme = PAGE_THEMES[targetPage] || PAGE_THEMES.home;
  const isCovering = phase === 'covering';
  const isHome = targetPage === 'home';

  // Home uses pure white for its loading circle; other pages use their theme primary color
  const transitionColor = isHome ? '#FFFFFF' : theme.primaryColor;
  const textColor = isHome ? 'text-black' : 'text-white';
  const subTextColor = isHome ? 'text-neutral-600 font-medium' : 'text-white/80 font-medium';
  const barBg = isHome ? 'bg-black' : 'bg-white';
  const barTrack = isHome ? 'bg-black/10' : 'bg-white/25';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Minimal Dark Shutter Backdrop */}
      <div
        className="absolute inset-0 bg-[#080808] transition-opacity duration-500 ease-out"
        style={{
          opacity: isCovering ? 1 : 0,
          transitionDelay: phase === 'uncovering' ? '80ms' : '0ms'
        }}
      />

      {/* 2. Super Smooth Center-Originating Color Circle Zoom (White for Home, Theme Color for Others) */}
      <div
        className="absolute rounded-full will-change-transform shadow-2xl flex items-center justify-center"
        style={{
          backgroundColor: transitionColor,
          width: '120px',
          height: '120px',
          transform: isCovering ? 'scale(40)' : 'scale(0.01)',
          opacity: phase === 'uncovering' ? 0 : 1,
          transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out`,
          transitionDelay: phase === 'uncovering' ? '40ms' : '0ms'
        }}
      />

      {/* 3. Ultra-Minimal Editorial Overlay */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-6 transition-all duration-400 max-w-sm mx-auto ${textColor}`}
        style={{
          opacity: isCovering ? 1 : 0,
          transform: isCovering ? 'scale(1)' : 'scale(0.92)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Brand Logo (Two Dots + TRF) */}
        <div className="mb-3">
          <Logo size="md" lightText={!isHome} />
        </div>

        {/* Minimal Section Indicator & Title */}
        <div className={`font-mono-meta text-xs tracking-widest uppercase ${subTextColor} mb-1`}>
          <span>{theme.number} · {theme.name}</span>
        </div>

        {/* Minimal Smooth Progress Line */}
        <div className={`w-36 h-[2px] overflow-hidden rounded-full mt-3 ${barTrack}`}>
          <div
            className={`h-full ${barBg} transition-all duration-500 ease-out`}
            style={{
              width: isCovering ? '100%' : '15%'
            }}
          />
        </div>
      </div>
    </div>
  );
};
