import React, { useEffect, useRef, useState } from 'react';

export interface TextRevealProps {
  children: React.ReactNode;
  /**
   * 'slide-up': text smoothly slides up from an overflow mask (classic editorial look)
   * 'words': splits text by words and cascades them in with staggered timing
   * 'fade-blur': text rises up while dissolving from soft blur to sharp focus
   */
  variant?: 'slide-up' | 'words' | 'fade-blur';
  delay?: number; // ms
  duration?: number; // ms
  stagger?: number; // ms between words
  className?: string;
  as?: React.ElementType;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 850,
  stagger = 35,
  className = '',
  as: Component = 'div',
  once = false
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px' // triggers cleanly as element scrolls into view
      }
    );

    observer.observe(el);

    // Whenever user is at top of page, reset any element below viewport so scrolling down replays the reveal
    const handleTopReset = () => {
      if (window.scrollY <= 40 && el) {
        const rect = el.getBoundingClientRect();
        if (rect.top > 120) {
          setIsVisible(false);
          observer.observe(el);
        }
      }
    };

    window.addEventListener('scroll', handleTopReset, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTopReset);
    };
  }, [once]);

  // Variant 1: Word-by-word staggered reveal
  if (variant === 'words' && typeof children === 'string') {
    const words = children.trim().split(/\s+/);

    return (
      <Component
        ref={containerRef as any}
        className={`inline select-text ${className}`}
      >
        {words.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden mr-[0.28em] align-top pb-[0.14em] -mb-[0.14em]"
          >
            <span
              className="inline-block will-change-transform"
              style={{
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
                opacity: isVisible ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay + idx * stagger}ms`
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Variant 2: Fade Blur (rises up while clarifying from soft blur)
  if (variant === 'fade-blur') {
    return (
      <Component
        ref={containerRef as any}
        className={`will-change-transform ${className}`}
        style={{
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 32px, 0)',
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'blur(0px)' : 'blur(8px)',
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        }}
      >
        {children}
      </Component>
    );
  }

  // Variant 3: Classic Editorial Masked Slide-Up
  return (
    <Component
      ref={containerRef as any}
      className={`overflow-hidden ${className}`}
    >
      <div
        className="will-change-transform"
        style={{
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
          opacity: isVisible ? 1 : 0,
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
        }}
      >
        {children}
      </div>
    </Component>
  );
};
