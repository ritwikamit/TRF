import React from 'react';
import { PageId } from '../types';
import { STUDIO_INFO } from '../data/projects';
import { Logo } from './Logo';

interface FooterProps {
  onOpenInquiry: () => void;
  onNavigatePage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onNavigatePage }) => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-14 pb-24 sm:pb-12 px-4 sm:px-6 border-t border-white/10 select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Minimal 3-Zone Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Zone 1: Monogram & Quiet Bio */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigatePage('home')}
              className="hover:opacity-85 transition-opacity text-left inline-block"
              aria-label="The Royal Films"
            >
              <Logo size="lg" lightText={true} />
            </button>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Tech-enabled royal wedding photography and 4K cinema films based in Gaya, Bihar. Documenting celebrations across India and Dubai with film-school direction.
            </p>
          </div>

          {/* Zone 2: Essential Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-semibold">
              NAVIGATION
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
              <button
                onClick={() => onNavigatePage('home')}
                className="text-left hover:text-white transition-colors"
              >
                01. Home
              </button>
              <button
                onClick={() => onNavigatePage('works')}
                className="text-left hover:text-white transition-colors"
              >
                02. Wedding Stories
              </button>
              <button
                onClick={() => onNavigatePage('about')}
                className="text-left hover:text-white transition-colors"
              >
                03. About Studio
              </button>
              <button
                onClick={() => onNavigatePage('journal')}
                className="text-left hover:text-white transition-colors"
              >
                04. Guides
              </button>
              <button
                onClick={() => onNavigatePage('contact')}
                className="text-left hover:text-white transition-colors"
              >
                05. Bookings
              </button>
              <button
                onClick={onOpenInquiry}
                className="text-left text-[#FF6B00] hover:underline"
              >
                Check Dates
              </button>
            </div>
          </div>

          {/* Zone 3: Legal & Verified Public Channels (Zero exposed personal emails/phones) */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-semibold">
              LEGAL & SOCIAL
            </p>
            <div className="flex flex-col space-y-2 text-xs font-mono text-neutral-400">
              <button
                onClick={() => onNavigatePage('cookie-policy')}
                className="text-left hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => onNavigatePage('terms')}
                className="text-left hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <div className="pt-2 flex flex-wrap gap-3 text-neutral-400 border-t border-white/10">
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href={STUDIO_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
                <span>·</span>
                <a
                  href={STUDIO_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-center text-center gap-2.5">
          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wide">
            © {new Date().getFullYear()} The Royal Films. All Rights Reserved.
          </p>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wide">
            Designed and Developed by ACCustomLabs
          </p>
          <p className="font-mono text-[11px] text-neutral-600 pt-1">
            THE ROYAL FILMS · GAYA, BIHAR · DUBAI DESTINATIONS
          </p>
        </div>
      </div>
    </footer>
  );
};
