import React, { useState, useEffect } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import { STUDIO_INFO } from '../data/projects';
import { Logo } from './Logo';
import { WhatsAppButton } from './WhatsAppButton';

interface HeaderProps {
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigatePage,
  onOpenInquiry
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeIST, setTimeIST] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeIST(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (page: PageId) => {
    setIsMenuOpen(false);
    onNavigatePage(page);
  };

  const navLinks: { id: PageId; number: string; label: string }[] = [
    { id: 'home', number: '01', label: 'Home' },
    { id: 'works', number: '02', label: 'Wedding Stories' },
    { id: 'about', number: '03', label: 'About Studio' },
    { id: 'journal', number: '04', label: 'Guides' },
    { id: 'contact', number: '05', label: 'Bookings' }
  ];

  return (
    <>
      {/* Fully Transparent Fixed Header Bar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-transparent px-5 py-4 sm:px-8 md:px-12 transition-colors ${
          isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <div className="flex items-center justify-between w-full text-white">
          {/* Zone 1: Brand logo 'two dots and trf' with constant purple & orange colors */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('home')}
              className="hover:opacity-85 transition-opacity flex items-center pointer-events-auto"
              aria-label="The Royal Films Home"
            >
              <Logo size="md" lightText={true} />
            </button>
            <span className="hidden xl:inline text-xs font-mono text-neutral-300">
              THE ROYAL FILMS · GAYA (ESTB. 2018)
            </span>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs pointer-events-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative py-1 whitespace-nowrap transition-opacity hover:opacity-100 ${
                  currentPage === link.id
                    ? 'opacity-100 font-bold border-b border-white'
                    : 'opacity-80 text-white'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Zone 3: Direct Inquiry Button & Menu toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="hidden lg:inline-block px-3.5 py-1.5 border border-white text-white text-xs font-mono hover:bg-white hover:text-black transition-colors pointer-events-auto"
            >
              CHECK WEDDING DATES
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 hover:opacity-75 transition-all group pointer-events-auto cursor-pointer touch-manipulation"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              <div
                className={`transform transition-transform duration-500 ${
                  isMenuOpen ? 'rotate-45' : 'rotate-0'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <Plus className="w-6 h-6 stroke-[2]" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0A] text-white flex flex-col justify-between p-5 sm:p-8 md:p-16 overflow-y-auto transition-all duration-700 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Top spacing ensuring menu items are never obstructed by mobile headers */}
        <div className="h-20 sm:h-24 shrink-0" />

        {/* Menu Navigation Links */}
        <div className="max-w-5xl mx-auto w-full my-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <nav className="md:col-span-8 flex flex-col space-y-2 sm:space-y-4 md:space-y-6">
            {[
              { id: 'home' as const, number: '01', label: 'Home & Overview' },
              { id: 'works' as const, number: '02', label: 'Wedding Stories & Films' },
              { id: 'about' as const, number: '03', label: 'Studio & Niraj Singh' },
              { id: 'journal' as const, number: '04', label: 'Wedding Guides' },
              { id: 'contact' as const, number: '05', label: 'Bookings & Studio Visit' }
            ].map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`group flex items-baseline text-left transition-transform duration-300 hover:translate-x-3 w-full py-2.5 sm:py-3.5 cursor-pointer touch-manipulation select-none ${
                  currentPage === item.id ? 'translate-x-2' : ''
                }`}
                style={{ transitionDelay: `${idx * 30}ms` }}
              >
                <span className="font-mono text-xs md:text-sm text-neutral-500 mr-4 md:mr-6 group-hover:text-white transition-colors shrink-0">
                  {item.number}
                </span>
                <span className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter transition-colors ${
                  currentPage === item.id ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right column: Studio Location & Contact */}
          <div className="md:col-span-4 flex flex-col justify-between border-l border-white/10 pl-8 space-y-8">
            <div>
              <p className="font-mono text-xs text-neutral-500 mb-2">GAYA, BIHAR // IST</p>
              <p className="font-mono text-2xl font-bold text-white">{timeIST || '12:00:00'}</p>
              <p className="text-xs text-neutral-400 mt-1">Chhotki Nawada, Near Gandhi More</p>
            </div>

            <div className="space-y-2 font-mono text-xs text-neutral-300">
              <p className="text-neutral-500">STUDIO CONSULTATION</p>
              <p className="text-white font-semibold">Gaya Atelier Lounge</p>
              <p className="text-neutral-400">Personal appointments available Mon – Sat</p>
            </div>

            <div className="space-y-3">
              <WhatsAppButton
                variant="inline"
                label="CHAT ON WHATSAPP"
                className="w-full"
              />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 px-4 bg-white text-black text-xs font-mono hover:bg-neutral-200 transition-colors"
              >
                OPEN WEDDING INQUIRY FORM
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar inside menu */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs font-mono gap-4">
          <span>THE ROYAL FILMS · ESTB. 2018 · GAYA, BIHAR · DUBAI</span>
          <div className="flex flex-wrap gap-6">
            <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href={STUDIO_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YOUTUBE</a>
            <a href={STUDIO_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FACEBOOK</a>
            <a href={STUDIO_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">THEROYALFILMS.IN</a>
          </div>
        </div>
      </div>
    </>
  );
};
