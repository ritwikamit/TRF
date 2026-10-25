import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 44px SVG circle with 18px radius
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.1px
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label={`Scroll to top - currently scrolled ${Math.round(scrollProgress)}%`}
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        className="group relative flex items-center justify-center w-12 h-12 bg-black/85 hover:bg-black text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        {/* SVG Progress Circle Border */}
        <svg
          className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          {/* Base background circle track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2.5"
          />
          {/* Animated active progress stroke that fills as you scroll down and un-fills when scrolling up */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#FF6B00"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Up Arrow Icon */}
        <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-300 stroke-[2.5]" />
      </button>
    </div>
  );
};
