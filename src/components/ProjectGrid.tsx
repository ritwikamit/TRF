import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Project, WeddingCategory } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { ScrollReveal, TextReveal } from './ScrollReveal';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<WeddingCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const categories: { key: WeddingCategory; label: string }[] = [
    { key: 'all', label: 'All Celebrations' },
    { key: 'wedding', label: 'Candid Weddings' },
    { key: 'films', label: 'Cinematic Films' },
    { key: 'prewedding', label: 'Pre-Wedding' },
    { key: 'ceremonies', label: 'Haldi & Sangeet' },
    { key: 'albums', label: 'Archival Albums' }
  ];

  return (
    <section id="projects" className="py-16 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto bg-white">
      {/* Section Header & Interactive Filter Bar */}
      <ScrollReveal direction="up" distance={20}>
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-6 mb-12 sm:mb-16 gap-6">
          <div>
            <div className="font-mono-meta text-xs text-[#525252] mb-3 flex items-center gap-2">
              <span>01</span>
              <span>·</span>
              <span>FEATURED CELEBRATIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
              <TextReveal variant="words" stagger={45} duration={750}>
                Selected Wedding Stories
              </TextReveal>
            </h2>
          </div>

          {/* Interactive Segmented Filter Controls with Mobile Swipe */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar sm:flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs font-mono-meta transition-all border ${
                  activeCategory === cat.key
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-[#525252] border-black/10 hover:border-black hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Two-Column Grid for Desktop, Single-Column for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {filteredProjects.map((project, index) => (
          <ScrollReveal
            key={project.id}
            direction="up"
            delay={(index % 2) * 120}
            distance={32}
            className="h-full"
          >
            <article
              onClick={() => onSelectProject(project)}
              data-cursor-card="true"
              data-cursor-label="VIEW"
              className="group flex flex-col cursor-pointer h-full"
            >
              {/* 1. 4:3 Aspect Ratio Image Container with Slight Rounding */}
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#111111] border border-black/10">
                {/* Image with Grayscale 100% to 0% transition over 700ms with 1.05x scale transform */}
                <div className="w-full h-full overflow-hidden">
                  <div className="w-full h-full editorial-image-hover">
                    <ArtCanvas
                      artType={project.artType}
                      imageUrl={project.imageUrl}
                      aspectRatio="h-full w-full"
                      className="h-full w-full"
                      showDetails={true}
                    />
                  </div>
                </div>

                {/* 2. Hover-triggered overlay (black at 10% opacity) */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* 3. Top-right 'arrow-up-right' icon appearing on hover */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md pointer-events-none">
                  <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Subtle Story Index Kicker in top-left */}
                <div className="absolute top-5 left-5 font-mono-meta text-[11px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1">
                  {(index + 1).toString().padStart(2, '0')} // {project.year}
                </div>
              </div>

              {/* 4. Bottom metadata row separated by a 1px #000000/10 border-top */}
              <div className="pt-5 mt-5 border-t border-black/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-[24px] font-bold tracking-tight text-black group-hover:opacity-75 transition-opacity">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 font-mono-meta text-[13px] text-[#525252] shrink-0">
                  <span>{project.categoryLabel}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF6B00]" />
                    <span>{project.location}</span>
                  </span>
                </div>
              </div>

              {/* Subtitle Line */}
              <p className="mt-2 text-sm text-[#525252] line-clamp-1">
                {project.subtitle}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
