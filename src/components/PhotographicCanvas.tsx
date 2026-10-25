import React, { useState } from 'react';

export interface PhotographicCanvasProps {
  artType?: 'monolith' | 'monograph' | 'sculpture' | 'kinetic' | 'industrial' | 'archive' | 'grid' | 'waveform';
  imageUrl?: string;
  aspectRatio?: string;
  className?: string;
  showDetails?: boolean;
  isPlaying?: boolean;
}

const DEFAULT_IMAGES: Record<string, string> = {
  monolith: '/assets/images/varmala.jpg',
  sculpture: '/assets/images/sangeet.jpg',
  monograph: '/assets/images/prewedding.jpg',
  kinetic: '/assets/images/baraat.jpg',
  industrial: '/assets/images/haldi.jpg',
  grid: '/assets/images/album.jpg',
  archive: '/assets/images/mandap_decor.jpg',
  waveform: '/assets/images/bidaai_candid.jpg',
};

const SCENE_CAPTIONS: Record<string, string> = {
  monolith: 'Pheras & Varmala // Maurya Palace',
  sculpture: 'Sangeet Celebration Choreography',
  monograph: 'Ganges Riverfront Sunset Pre-Wedding',
  kinetic: 'Royal Baraat Entry Celebration',
  industrial: 'Haldi Marigold Rituals',
  grid: 'Handcrafted Italian Leather Album',
  archive: 'Royal Mandap Floral Architecture',
  waveform: 'Candid Bridal Emotions & Bidaai',
};

// Face-safe focal positioning tuned per wedding scene to avoid awkward forehead or chin crops
const FOCAL_POSITIONS: Record<string, string> = {
  monolith: 'object-[center_22%]',
  sculpture: 'object-[center_25%]',
  monograph: 'object-[center_30%]',
  kinetic: 'object-[center_28%]',
  industrial: 'object-[center_25%]',
  grid: 'object-center',
  archive: 'object-center',
  waveform: 'object-[center_22%]',
};

export const PhotographicCanvas: React.FC<PhotographicCanvasProps> = ({
  artType = 'monolith',
  imageUrl,
  aspectRatio = 'aspect-[4/3]',
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = imageUrl || DEFAULT_IMAGES[artType] || DEFAULT_IMAGES.monolith;
  const caption = SCENE_CAPTIONS[artType] || 'The Royal Films Wedding Story';
  const focalPos = FOCAL_POSITIONS[artType] || 'object-[center_25%]';

  return (
    <div
      className={`group/photo relative w-full overflow-hidden bg-[#0A0A0A] select-none ${aspectRatio} ${className}`}
    >
      {/* Real High-Resolution Photograph: Face-safe alignment, Black & White by default, colorful on hover */}
      <img
        src={imageSrc}
        alt={caption}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover ${focalPos} scale-100 photo-bw-to-color grayscale contrast-105 group-hover:grayscale-0 group-hover/photo:grayscale-0 hover:grayscale-0 group-hover/photo:scale-105 group-hover:scale-105 transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Clean, subtle hover sheen */}
      <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/10 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};
