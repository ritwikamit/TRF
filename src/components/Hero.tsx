import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/projects';
import { WhatsAppButton } from './WhatsAppButton';

interface HeroProps {
  onScrollDown: () => void;
  onOpenInquiry?: () => void;
}

const HERO_SLIDES = [
  {
    image: '/assets/images/hero_mandap.jpg',
    title: 'Palace Mandap Vows',
    location: 'Bodh Gaya Heritage Resort',
    objectPosition: 'object-[center_30%]'
  },
  {
    image: '/assets/images/portrait_bride.jpg',
    title: 'Heirloom Bridal Portrait',
    location: 'Candid Emotional Story',
    objectPosition: 'object-[center_22%]'
  },
  {
    image: '/assets/images/varmala.jpg',
    title: 'Royal Varmala Celebration',
    location: 'Maurya Grand Lawn',
    objectPosition: 'object-[center_25%]'
  }
];

const THE_PALETTE = ['#FF6B00', '#F59E0B', '#8B5CF6', '#10B981', '#F43F5E'];

export const Hero: React.FC<HeroProps> = ({ onScrollDown, onOpenInquiry }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    const colorTimer = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % THE_PALETTE.length);
    }, 2200);

    return () => {
      clearInterval(timer);
      clearInterval(colorTimer);
    };
  }, []);

  const word1 = 'ROYAL';
  const word2 = 'FILMS';

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-20 sm:pt-28 pb-8 overflow-hidden select-none text-white bg-black"
    >
      {/* 1. Full-screen Cinematic Background Slider (edge-to-edge, cover, face-safe) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover scale-100 transition-transform duration-10000 ease-out ${
                slide.objectPosition
              } ${activeSlide === idx ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        ))}

        {/* 2. Measured Contrast Scrims & Vignette for Typographic Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Top Editorial Kicker Bar (Transparent on full-screen hero) */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-7xl mx-auto text-xs font-mono text-neutral-300 border-b border-white/15 pb-4 pt-2 gap-2">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse" />
          <span className="text-white font-semibold tracking-wider">THE ROYAL FILMS</span>
          <span className="hidden sm:inline text-neutral-500">·</span>
          <span className="hidden sm:inline text-neutral-400">ESTB. 2018 · GAYA, BIHAR</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-neutral-400">
          <span>TECH-ENABLED CINEMATIC WEDDING FILMS</span>
          <span>·</span>
          <span className="text-white font-medium">RESERVED SEASONS 2026/2027</span>
        </div>
      </div>

      {/* Main Center Typographic Stage */}
      <div className="relative z-10 my-auto max-w-5xl mx-auto w-full flex flex-col items-center py-8 md:py-12">
        {/* Clean Tagline Text (no cylinder container background) */}
        <div
          className="font-mono text-xs md:text-sm text-neutral-200 tracking-widest uppercase mb-4 transition-all duration-700 font-semibold"
          style={{
            opacity: hasMounted ? 1 : 0,
            transform: hasMounted ? 'translateY(0)' : 'translateY(12px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          ROYAL MOMENTS · CANDID EMOTIONS · 4K CINEMA
        </div>

        {/* Monumental Headline: THE ROYAL FILMS */}
        <h1
          className="w-full font-extrabold tracking-tight text-white uppercase overflow-visible leading-[0.95] sm:leading-[0.9] flex flex-wrap justify-center items-center gap-x-[2vw] md:gap-x-[3vw] drop-shadow-2xl px-2 select-none"
          style={{ fontSize: 'clamp(2.35rem, 9.2vw, 9.5rem)', letterSpacing: '-0.025em' }}
        >
          {/* Prefix: THE - Color changes according to website color palette */}
          <span
            className="font-mono text-xs sm:text-sm md:text-xl tracking-[0.35em] block w-full mb-1 sm:mb-2 uppercase font-bold transition-colors duration-700"
            style={{
              color: THE_PALETTE[colorIndex],
              opacity: hasMounted ? 1 : 0,
              transform: hasMounted ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            THE
          </span>

          {/* Word 1: ROYAL */}
          <span className="inline-flex overflow-hidden py-1 px-1">
            {word1.split('').map((char, index) => (
              <span
                key={`r1-${index}`}
                className="inline-block transition-transform duration-1000"
                style={{
                  transform: hasMounted ? 'translateY(0%)' : 'translateY(110%)',
                  opacity: hasMounted ? 1 : 0,
                  transitionDelay: `${index * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {char}
              </span>
            ))}
          </span>

          {/* Word 2: FILMS - Safe padding clearance so S is never cut */}
          <span className="inline-flex overflow-hidden py-1 pl-1 pr-3 -mr-3">
            {word2.split('').map((char, index) => (
              <span
                key={`f2-${index}`}
                className={`inline-block transition-transform duration-1000 ${
                  index === word2.length - 1 ? 'pr-2' : ''
                }`}
                style={{
                  transform: hasMounted ? 'translateY(0%)' : 'translateY(110%)',
                  opacity: hasMounted ? 1 : 0,
                  transitionDelay: `${(word1.length + index) * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Sub-headline: Legible and High-Contrast over the full-bleed image */}
        <p
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto font-normal leading-relaxed tracking-[-0.01em] transition-all duration-1000 delay-700 drop-shadow-md"
          style={{
            opacity: hasMounted ? 1 : 0,
            transform: hasMounted ? 'translateY(0)' : 'translateY(24px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          Documenting royal wedding stories, candid intimacy, and cinematic films with film-school direction. Founded in Gaya, Bihar by <strong className="text-white font-semibold">Niraj Singh</strong> (AAFT Alumnus).
        </p>

        {/* Quick Action CTAs with mobile responsive touch targets */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none px-2 transition-all duration-1000 delay-900"
          style={{ opacity: hasMounted ? 1 : 0 }}
        >
          <button
            onClick={onScrollDown}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
          >
            <span>VIEW WEDDING STORIES</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-6 py-3.5 bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs font-mono hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
            >
              <Heart className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
              <span>CHECK WEDDING DATES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <WhatsAppButton
            variant="inline"
            label="WHATSAPP STUDIO"
            className="w-full sm:w-auto bg-black/60 backdrop-blur-md border border-white/25 hover:border-[#FF6B00] min-h-[44px] justify-center"
          />
        </div>

        {/* Slide Indicators for Multi-Hero Imagery */}
        <div className="flex items-center gap-2 mt-8">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(idx)}
              className={`h-1 transition-all rounded-full ${
                activeSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to hero slide ${idx + 1}: ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Editorial Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end pt-6 border-t border-white/15 gap-4 text-xs font-mono text-neutral-300">
        <div className="text-left flex items-center gap-4">
          <div>
            <p className="text-white font-semibold">500+ CELEBRATIONS FILMED</p>
            <p className="text-neutral-400">GAYA, PATNA & PAN-INDIA</p>
          </div>
          <span className="text-white/20">|</span>
          <div className="hidden md:block">
            <p className="text-white font-semibold">ESTB. 2018</p>
            <p className="text-neutral-400">CHHOTKI NAWADA, GAYA</p>
          </div>
        </div>

        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-2 text-xs font-mono text-white hover:text-neutral-300 transition-colors"
          aria-label="Scroll to exhibition marquee"
        >
          <span className="tracking-widest">CINEMA REEL</span>
          <div className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center group-hover:border-white transition-colors bg-black/40 backdrop-blur-sm">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </button>

        <div className="text-right hidden sm:block">
          <p className="text-white font-semibold">4.6 / 5.0 GOOGLE RATED (100+ REVIEWS)</p>
          <p className="text-neutral-400">DUBAI DESTINATION SHOOTS</p>
        </div>
      </div>
    </section>
  );
};
