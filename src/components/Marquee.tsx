import React from 'react';
import { MARQUEE_ITEMS, PROJECTS } from '../data/projects';
import { ArtCanvas } from './ArtCanvas';
import { Project } from '../types';
import { Sparkles } from 'lucide-react';

interface MarqueeProps {
  onSelectProject: (project: Project) => void;
}

export const Marquee: React.FC<MarqueeProps> = ({ onSelectProject }) => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const handleCardClick = (title: string) => {
    const found = PROJECTS.find((p) => p.title.toLowerCase().includes(title.toLowerCase().slice(0, 4))) || PROJECTS[0];
    onSelectProject(found);
  };

  return (
    <section
      id="marquee"
      className="relative w-full py-16 md:py-24 overflow-hidden bg-white border-y border-black/10 select-none pause-on-hover"
    >
      {/* Section Header Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono-meta text-[#525252] gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-black font-semibold">CONTINUOUS REEL // WEDDING HIGHLIGHTS</span>
        </div>
        <span className="text-neutral-400">HOVER TO PAUSE STREAM · CLICK TO VIEW STORY</span>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        <div
          className="animate-marquee flex items-center gap-8 pl-8"
          style={{
            animationDuration: '30s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleCardClick(item.title)}
              data-cursor-card="true"
              data-cursor-label="STORY"
              className={`group relative shrink-0 w-[260px] sm:w-[300px] md:w-[340px] aspect-[5/7] bg-[#111111] overflow-hidden border border-black/15 shadow-sm transition-all duration-700 cursor-pointer ${item.cardClass}`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Art Canvas with Grayscale to Color and 1.05x hover scale */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="w-full h-full editorial-image-hover">
                  <ArtCanvas
                    artType={item.artType}
                    imageUrl={item.imageUrl}
                    aspectRatio="h-full w-full"
                    className="h-full w-full object-cover"
                    showDetails={false}
                  />
                </div>
              </div>

              {/* Top Accent Pill-less Tag */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10 pointer-events-none">
                <span className="font-mono-meta text-[11px] text-white/80 bg-black/50 backdrop-blur-sm px-2.5 py-1">
                  {item.year}
                </span>
                <span className="font-mono-meta text-[10px] text-[#FF6B00] bg-black/70 backdrop-blur-sm px-2.5 py-1 uppercase font-semibold">
                  {item.badge}
                </span>
              </div>

              {/* Bottom Metadata Drawer Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end text-white">
                <p className="font-mono-meta text-[11px] text-neutral-400 tracking-wider">
                  {item.category}
                </p>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1 group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>

              {/* 10% black hover overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
