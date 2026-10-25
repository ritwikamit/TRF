import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { Project, WeddingCategory } from '../types';
import { ArtCanvas } from '../components/ArtCanvas';
import { ArrowUpRight, Grid, LayoutGrid, Info, SlidersHorizontal, MapPin } from 'lucide-react';

interface WorksPageProps {
  onSelectProject: (project: Project) => void;
  onOpenInquiry: () => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({ onSelectProject, onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<WeddingCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'contact-sheet'>('grid');
  const [showSpecsOverlay, setShowSpecsOverlay] = useState(false);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const categories: { key: WeddingCategory; label: string }[] = [
    { key: 'all', label: 'All Stories' },
    { key: 'wedding', label: 'Candid Weddings' },
    { key: 'films', label: 'Cinematic Films' },
    { key: 'prewedding', label: 'Pre-Wedding' },
    { key: 'ceremonies', label: 'Haldi & Sangeet' },
    { key: 'albums', label: 'Heirloom Albums' }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 max-w-7xl mx-auto min-h-screen text-white">
      {/* Page Header with Orange Section Accent */}
      <div className="border-b border-white/30 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono-meta text-xs text-white/90 mb-3 flex items-center gap-2">
            <span className="font-bold">02</span>
            <span>·</span>
            <span>THE ROYAL FILMS WEDDING REEL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Wedding Stories & Cinema
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            From regal palace pheras in Gaya and Bodh Gaya to destination celebrations in Dubai and across India.
            Each story captured with 4K cinema cameras, aerial drones, and heartfelt candid intimacy.
          </p>
        </div>

        {/* View Controls & Specs Toggle */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowSpecsOverlay(!showSpecsOverlay)}
            className={`px-3 py-2 text-xs font-mono-meta border transition-colors flex items-center gap-1.5 ${
              showSpecsOverlay ? 'bg-white text-black border-white' : 'bg-black/30 text-white border-white/30 hover:bg-white hover:text-black'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>CINEMA SPECS {showSpecsOverlay ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center border border-white/30 p-0.5 bg-black/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 text-xs font-mono-meta flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-white text-black font-semibold' : 'text-white/80 hover:text-white'
              }`}
              title="Curated Exhibition Grid"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">GRID</span>
            </button>
            <button
              onClick={() => setViewMode('contact-sheet')}
              className={`p-1.5 text-xs font-mono-meta flex items-center gap-1.5 transition-colors ${
                viewMode === 'contact-sheet' ? 'bg-white text-black font-semibold' : 'text-white/80 hover:text-white'
              }`}
              title="35mm Film Roll Mode"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">FILM ROLL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Segmented Tabs (horizontally touch-scrollable on mobile) */}
      <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none max-w-full shrink-0">
        <SlidersHorizontal className="w-4 h-4 text-white mr-1 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-xs font-mono-meta transition-all border whitespace-nowrap shrink-0 ${
              activeCategory === cat.key
                ? 'bg-white text-black border-white font-bold'
                : 'bg-black/20 text-white border-white/30 hover:bg-white hover:text-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto font-mono-meta text-xs text-white/90 hidden md:inline shrink-0">
          {filteredProjects.length} CURATED CELEBRATIONS
        </span>
      </div>

      {/* VIEW MODE 1: Curated Exhibition Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              data-cursor-card="true"
              data-cursor-label="EXPLORE"
              className="group flex flex-col cursor-pointer bg-white text-black p-4 border border-white/40 hover:border-white transition-all shadow-lg"
            >
              {/* 4:3 Aspect Ratio Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-neutral-900 border border-neutral-200">
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

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top-right 'arrow-up-right' */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#EA580C] text-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md pointer-events-none">
                  <ArrowUpRight className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Story Number & Year */}
                <div className="absolute top-5 left-5 font-mono-meta text-[11px] text-white bg-black/75 backdrop-blur-sm px-2.5 py-1">
                  STORY № {(index + 1).toString().padStart(2, '0')} · {project.year}
                </div>

                {/* Cinema Specs Overlay Drawer (if enabled) */}
                {showSpecsOverlay && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/90 backdrop-blur-md p-4 text-white text-[11px] font-mono border-t border-orange-500/30 space-y-1 transition-all">
                    <div className="flex justify-between text-neutral-300">
                      <span>GEAR: {project.specs.cameras}</span>
                      <span>LENS: {project.specs.lenses}</span>
                    </div>
                    <div className="flex justify-between text-[#FB923C]">
                      <span>DRONE: {project.specs.drone}</span>
                      <span>VENUE: {project.venue}</span>
                    </div>
                    <div className="text-neutral-400 text-[10px] truncate">
                      DELIVERABLES: {project.specs.deliverables}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom metadata row */}
              <div className="pt-5 mt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-[24px] font-bold tracking-tight text-black group-hover:text-[#EA580C] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 font-mono-meta text-[13px] text-neutral-600 shrink-0">
                  <span>{project.categoryLabel}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#EA580C]">
                    <MapPin className="w-3 h-3 text-[#EA580C]" />
                    <span>{project.location}</span>
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-neutral-600 line-clamp-1">
                {project.subtitle}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: Analog 35mm / 4K Filmstrip Mode */}
      {viewMode === 'contact-sheet' && (
        <div className="bg-[#0C0C0C] text-neutral-300 p-6 sm:p-10 border border-neutral-800 shadow-2xl space-y-8 select-none">
          {/* Filmstrip Kicker */}
          <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-neutral-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-white rounded-full" />
              <span className="text-white font-bold tracking-wider">THE ROYAL FILMS // 4K CINEMATIC FILM ROLL</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>SONY FX6 / S-LOG3</span>
              <span>·</span>
              <span>10-BIT 4:2:2 MASTER · 24.000 FPS</span>
            </div>
          </div>

          {/* Film Roll Strips (3-column analog layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#050505] p-3 border border-neutral-800 hover:border-white transition-all cursor-pointer"
              >
                {/* Film Reel Sprocket Top */}
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 pb-2 border-b border-neutral-900">
                  <span>4K CINEMA MASTER</span>
                  <span className="text-white font-bold">{idx + 1}A</span>
                  <span>GAYA & BIHAR REEL</span>
                </div>

                {/* Film Frame Content */}
                <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden my-2 border border-neutral-800">
                  <div className="w-full h-full editorial-image-hover">
                    <ArtCanvas
                      artType={project.artType}
                      imageUrl={project.imageUrl}
                      aspectRatio="h-full w-full"
                      className="h-full w-full"
                      showDetails={false}
                    />
                  </div>

                  {/* Crop mark on hover */}
                  <div className="absolute inset-2 border-2 border-dashed border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <span className="bg-white text-black font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest font-bold">
                      VIEW FULL STORY
                    </span>
                  </div>
                </div>

                {/* Film Reel Sprocket Bottom */}
                <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                  <span className="truncate max-w-[150px] text-white font-semibold">{project.title}</span>
                  <span className="text-neutral-500">{project.venue}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs font-mono text-neutral-500">
            <span>SHOT ACROSS GAYA, BODH GAYA, PATNA, RAJGIR, DUBAI & PAN-INDIA</span>
            <button
              onClick={onOpenInquiry}
              className="text-white hover:underline flex items-center gap-1.5"
            >
              <span>CHECK DATE AVAILABILITY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Commission Strip with Contrast Callout */}
      <div className="mt-20 pt-10 border-t border-white/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-black/20 p-8 border border-white/30">
        <div>
          <p className="font-mono-meta text-xs text-white/90">LIMITED SEASON DATES // EXCLUSIVE BOOKINGS</p>
          <p className="text-sm font-medium text-white mt-1">
            We limit our bookings to one primary celebration per date for guaranteed principal presence.
          </p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="px-6 py-3 bg-white hover:bg-neutral-100 text-black text-xs font-mono-meta font-bold transition-colors shadow-md shrink-0"
        >
          CHECK YOUR WEDDING DATES
        </button>
      </div>
    </div>
  );
};
