import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  lightText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', lightText = true }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl sm:text-5xl md:text-6xl'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3.5 h-3.5'
  };

  const gapBetweenDots = {
    sm: 'gap-[2px]',
    md: 'gap-[2.5px]',
    lg: 'gap-[3px]',
    xl: 'gap-[4px]'
  };

  const gapToText = {
    sm: 'gap-1.5',
    md: 'gap-1.5',
    lg: 'gap-2',
    xl: 'gap-2.5'
  };

  return (
    <span
      className={`inline-flex items-center ${gapToText[size]} font-bold tracking-tight select-none leading-none ${sizeClasses[size]} ${className}`}
      style={{
        color: lightText ? '#FFFFFF' : '#111111',
        isolation: 'isolate'
      }}
      aria-label="The Royal Films - trf"
    >
      {/* Two connected colored dots: Purple (#8B5CF6) and Orange (#FF6B00) immediately before text */}
      <span
        className={`inline-flex items-center ${gapBetweenDots[size]} shrink-0 translate-y-[-0.5px]`}
        aria-hidden="true"
      >
        <span
          className={`${dotSizes[size]} rounded-full shrink-0`}
          style={{
            backgroundColor: '#8B5CF6',
            boxShadow: '0 0 6px rgba(139, 92, 246, 0.45)'
          }}
          title="The Royal Films Purple Accent"
        />
        <span
          className={`${dotSizes[size]} rounded-full shrink-0`}
          style={{
            backgroundColor: '#FF6B00',
            boxShadow: '0 0 6px rgba(255, 107, 0, 0.45)'
          }}
          title="The Royal Films Orange Accent"
        />
      </span>

      {/* trf typography, vertically aligned */}
      <span
        className="tracking-tighter font-extrabold lowercase leading-none"
        style={{ color: lightText ? '#FFFFFF' : '#111111' }}
      >
        trf
      </span>
    </span>
  );
};
