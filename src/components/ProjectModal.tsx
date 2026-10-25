import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ArrowRight, ArrowLeft, Share2, Check, Video, MapPin, Sparkles } from 'lucide-react';
import { ArtCanvas } from './ArtCanvas';
import { PROJECTS, STUDIO_INFO } from '../data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenInquiry: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onOpenInquiry
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300 select-none"
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-5xl bg-white text-black overflow-hidden shadow-2xl border border-black/20 my-auto rounded-xs"
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3 text-xs font-mono-meta text-[#525252]">
            <span className="text-black font-semibold">THE ROYAL FILMS // WEDDING ARCHIVE</span>
            <span>·</span>
            <span>{project.slug}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-meta border border-black/10 hover:border-black transition-colors"
              aria-label="Share project link"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'SHARE'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 border border-black/10 hover:border-black transition-colors rounded-none"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto">
          {/* Main Visual Display */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#0E0E0E] rounded-xs overflow-hidden border border-black/15 shadow-inner">
            <ArtCanvas
              artType={project.artType}
              imageUrl={project.imageUrl}
              aspectRatio="h-full w-full"
              className="h-full w-full"
              showDetails={true}
            />
          </div>

          {/* Title & Metadata Strip */}
          <div className="mt-8 border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-meta text-[#8B5CF6] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{project.categoryLabel} // {project.year}</span>
              </div>
              <h1
                id="modal-project-title"
                className="text-3xl md:text-5xl font-bold tracking-tight text-black"
              >
                {project.title}
              </h1>
              <p className="mt-2 text-lg text-[#525252]">
                {project.subtitle}
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end font-mono">
              <span className="text-xs text-[#525252] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>VENUE & LOCATION</span>
              </span>
              <span className="font-semibold text-black text-sm mt-0.5">{project.venue}</span>
              <span className="text-xs text-[#525252]">{project.location}</span>
            </div>
          </div>

          {/* Wedding Cinema & Photo Specification Panel */}
          <div className="py-6 border-b border-black/10 bg-neutral-50 p-6 my-6 border border-black/5">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-4 h-4 text-black" />
              <span className="font-mono-meta text-xs text-black font-semibold">
                CINEMA & PHOTOGRAPHY GEAR SPECIFICATION
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <span className="text-[#525252] block text-[10px]">CAMERAS & SENSORS</span>
                <span className="text-black font-semibold">{project.specs.cameras}</span>
              </div>
              <div>
                <span className="text-[#525252] block text-[10px]">OPTICAL LENSES</span>
                <span className="text-black font-semibold">{project.specs.lenses}</span>
              </div>
              <div>
                <span className="text-[#525252] block text-[10px]">AERIAL DRONE</span>
                <span className="text-black font-semibold">{project.specs.drone}</span>
              </div>
              <div>
                <span className="text-[#525252] block text-[10px]">CINEMATIC FILM DURATION</span>
                <span className="text-black font-semibold">{project.specs.filmDuration || 'Custom Teaser'}</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-[#525252] block text-[10px]">PHYSICAL ALBUM & DELIVERABLES</span>
                <span className="text-black font-semibold">{project.specs.albumType || project.specs.deliverables}</span>
              </div>
            </div>
          </div>

          {/* Quantitative Metrics Bar */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-black/10">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-neutral-50 p-4 border border-black/5">
                  <p className="font-mono-meta text-xl md:text-2xl font-bold text-black tabular-nums">
                    {m.value}
                  </p>
                  <p className="font-mono-meta text-xs text-[#525252] mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Wedding Story Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-black/10">
            <div>
              <h2 className="font-mono-meta text-xs text-black font-semibold mb-3">
                01 // THE CELEBRATION CONTEXT
              </h2>
              <p className="text-sm md:text-base text-[#525252] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h2 className="font-mono-meta text-xs text-black font-semibold mb-3">
                02 // PHOTOGRAPHIC & CINEMA METHOD
              </h2>
              <p className="text-sm md:text-base text-[#525252] leading-relaxed">
                {project.approach}
              </p>
            </div>

            <div>
              <h2 className="font-mono-meta text-xs text-black font-semibold mb-3">
                03 // HEIRLOOM DELIVERABLES
              </h2>
              <p className="text-sm md:text-base text-[#525252] leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Tags & Action Bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono-meta text-xs text-[#525252] bg-neutral-100 px-2.5 py-1"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-mono-meta hover:bg-[#20ba59] transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>WHATSAPP INQUIRY</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="px-6 py-2.5 bg-black text-white text-xs font-mono-meta hover:bg-neutral-800 transition-colors shrink-0"
              >
                CHECK DATES FOR SIMILAR WEDDING
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Strip */}
        <div className="px-6 py-4 bg-neutral-100 border-t border-black/10 flex justify-between items-center text-xs font-mono-meta text-[#525252]">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PREV: {prevProject.title}</span>
          </button>

          <span className="hidden sm:inline">
            STORY {currentIndex + 1} OF {PROJECTS.length}
          </span>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 hover:text-black transition-colors"
          >
            <span>NEXT: {nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
