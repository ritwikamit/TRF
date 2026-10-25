import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Mouse coordinate refs for smooth lerp
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-interactive]');
      const cardInteractive = target.closest('[data-cursor-card]');

      if (cardInteractive) {
        setIsHovered(true);
        const customText = cardInteractive.getAttribute('data-cursor-label') || 'VIEW';
        setCursorText(customText);
      } else if (interactive) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Lerp loop with requestAnimationFrame
    const lerpFactor = 0.18; // smooth lagging effect
    const loop = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovered ? 2.5 : 1
        })`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isHovered]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 flex items-center justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: '#FFFFFF',
        mixBlendMode: 'difference',
        willChange: 'transform',
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease'
      }}
    >
      {cursorText && (
        <span
          className="text-[4px] font-bold tracking-widest uppercase select-none text-black font-mono"
          style={{ transform: 'scale(0.8)' }}
        >
          {cursorText}
        </span>
      )}
    </div>
  );
};
