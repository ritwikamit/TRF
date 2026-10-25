import React from 'react';
import { PhotographicCanvas } from './PhotographicCanvas';

interface ArtCanvasProps {
  artType: 'monolith' | 'monograph' | 'sculpture' | 'kinetic' | 'industrial' | 'archive' | 'grid' | 'waveform';
  imageUrl?: string;
  aspectRatio?: string;
  className?: string;
  showDetails?: boolean;
}

export const ArtCanvas: React.FC<ArtCanvasProps> = (props) => {
  return <PhotographicCanvas {...props} />;
};
