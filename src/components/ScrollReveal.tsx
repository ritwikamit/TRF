import React, { useEffect, useRef, useState } from 'react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  distance?: number; // in pixels
  threshold?: number; // 0 to 1
  rootMargin?: string;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/**
 * Custom Hook for IntersectionObserver based scroll reveal
 */
export function useScrollReveal(options: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * ScrollReveal Component that fades and translates content into view smoothly
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 750,
  distance = 32,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = false,
  className = '',
  style = {},
  as: Component = 'div'
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate display if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    // Fallback if IntersectionObserver is not available
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    // Whenever user is at top of page, reset any element below viewport so scrolling down replays the reveal
    const handleTopReset = () => {
      if (window.scrollY <= 40 && element) {
        const rect = element.getBoundingClientRect();
        if (rect.top > 120) {
          setIsVisible(false);
          observer.observe(element);
        }
      }
    };

    window.addEventListener('scroll', handleTopReset, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTopReset);
    };
  }, [threshold, rootMargin, once]);

  // Compute transform offset based on chosen direction
  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const computedStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'transform, opacity',
    ...style
  };

  return (
    <Component
      ref={containerRef as any}
      className={`scroll-reveal-item ${className}`}
      style={computedStyle}
    >
      {children}
    </Component>
  );
};

export { TextReveal } from './TextReveal';
