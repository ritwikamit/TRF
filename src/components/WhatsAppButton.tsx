import React from 'react';
import { STUDIO_INFO } from '../data/projects';

interface WhatsAppButtonProps {
  variant?: 'floating' | 'inline' | 'compact';
  label?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  variant = 'floating',
  label = 'WhatsApp Studio',
  className = ''
}) => {
  // SVG Icon for WhatsApp with clean geometric curves
  const WhatsAppIcon = ({ size = 'w-4 h-4' }: { size?: string }) => (
    <svg
      className={`${size} shrink-0 fill-current`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.47C16.32 14.34 15.1 13.74 14.87 13.66C14.65 13.57 14.48 13.53 14.32 13.78C14.15 14.03 13.68 14.58 13.53 14.74C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.09 9.61 11.84C9.46 11.59 9.59 11.45 9.72 11.33C9.83 11.22 9.97 11.04 10.09 10.9C10.21 10.76 10.26 10.65 10.34 10.49C10.42 10.32 10.38 10.18 10.32 10.05C10.26 9.93 9.76 8.7 9.56 8.19C9.36 7.69 9.15 7.76 9 7.75C8.86 7.74 8.69 7.74 8.52 7.74C8.35 7.74 8.08 7.8 7.85 8.05C7.62 8.3 6.98 8.9 6.98 10.12C6.98 11.34 7.87 12.51 8 12.68C8.12 12.85 9.74 15.35 12.23 16.42C12.82 16.68 13.28 16.83 13.64 16.94C14.23 17.13 14.77 17.1 15.2 17.04C15.68 16.97 16.67 16.44 16.88 15.86C17.08 15.28 17.08 14.78 17.02 14.68C16.96 14.58 16.82 14.53 16.57 14.47Z" />
    </svg>
  );

  if (variant === 'floating') {
    return (
      <aside aria-label="Quick Contact">
        <a
          href={STUDIO_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp message to Niraj Singh"
          className={`fixed bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 px-3.5 sm:px-4 py-3 bg-[#121212]/95 hover:bg-black text-white border border-white/20 hover:border-[#FF6B00] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Subtle status indicator dot in brand orange */}
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
          <WhatsAppIcon size="w-4 h-4" />
          <span className="text-xs font-mono tracking-wider uppercase font-semibold hidden sm:inline pr-1">
            {label}
          </span>
        </a>
      </aside>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={STUDIO_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp message to Niraj Singh"
        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#171717] hover:bg-black text-white border border-white/20 hover:border-[#FF6B00] text-xs font-mono transition-all ${className}`}
      >
        <WhatsAppIcon size="w-3.5 h-3.5 text-[#FF6B00]" />
        <span>{label}</span>
      </a>
    );
  }

  // Inline button variant (replacing all legacy bright green buttons)
  return (
    <a
      href={STUDIO_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp message to Niraj Singh"
      className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#151515] hover:bg-black text-white border border-white/20 hover:border-[#FF6B00] text-xs font-mono tracking-wider transition-all duration-300 hover:shadow-lg ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <WhatsAppIcon size="w-4 h-4 text-white group-hover:text-[#FF6B00] transition-colors" />
      <span>{label}</span>
    </a>
  );
};
