import React, { useState } from 'react';
import { JOURNAL_ARTICLES, STUDIO_INFO } from '../data/projects';
import { JournalArticle } from '../types';
import { ArtCanvas } from '../components/ArtCanvas';
import { ArrowUpRight, BookOpen, Clock, ChevronDown, ChevronUp, CheckCircle, Sparkles } from 'lucide-react';
import { ScrollReveal, TextReveal } from '../components/ScrollReveal';

interface JournalPageProps {
  onOpenInquiry: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onOpenInquiry }) => {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(JOURNAL_ARTICLES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 max-w-7xl mx-auto min-h-screen text-white">
      {/* Page Header with Green Section Accent */}
      <div className="border-b border-white/30 pb-8 mb-16">
        <div className="font-mono-meta text-xs text-white/90 mb-3 flex items-center gap-2">
          <span className="font-bold">04</span>
          <span>·</span>
          <span>WEDDING PLANNING & CINEMA GUIDES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl">
          <TextReveal variant="words" stagger={40} duration={800}>
            Field Notes & Couple Guides
          </TextReveal>
        </h1>
        <TextReveal variant="fade-blur" delay={150} duration={800}>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
            Practical advice from shooting over 500 weddings in Gaya, Bihar, and destination locations across India and abroad.
            Learn how to plan timelines, pick lighting, and feel effortless in front of the lens.
          </p>
        </TextReveal>
      </div>

      {/* Articles Feed */}
      <div className="space-y-16">
        {JOURNAL_ARTICLES.map((article: JournalArticle) => {
          const isExpanded = expandedArticleId === article.id;
          return (
            <article
              key={article.id}
              className="border-b border-white/30 pb-16 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left metadata */}
                <div className="md:col-span-3 space-y-2 font-mono-meta text-xs text-white/80">
                  <span className="text-white font-bold block">{article.number}</span>
                  <p>{article.date}</p>
                  <p>{article.location}</p>
                  <div className="flex items-center gap-1.5 pt-2 text-white">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="pt-3">
                    <span className="bg-white/20 text-white border border-white/30 px-2.5 py-1 text-[11px] font-mono font-bold">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Right content */}
                <div className="md:col-span-9 space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white hover:text-white/80 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-base sm:text-lg text-white/90 mt-2 font-normal">
                      {article.subtitle}
                    </p>
                  </div>

                  {/* Visual Preview */}
                  <div className="w-full aspect-[21/9] bg-neutral-900 overflow-hidden border border-white/30 rounded-xs shadow-md">
                    <ArtCanvas
                      artType={article.artType}
                      imageUrl={article.imageUrl}
                      aspectRatio="h-full w-full"
                      className="h-full w-full"
                      showDetails={true}
                    />
                  </div>

                  {/* Excerpt */}
                  <p className="text-base text-white/95 leading-relaxed font-serif italic text-lg border-l-2 border-white pl-4">
                    "{article.excerpt}"
                  </p>

                  {/* Expandable Full Content */}
                  {isExpanded && (
                    <div className="space-y-5 pt-4 text-white/90 text-base leading-relaxed border-t border-white/30 animate-in fade-in duration-300">
                      {article.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}

                      {/* Actionable Wedding Tips Box */}
                      {article.tips && article.tips.length > 0 && (
                        <div className="mt-6 p-5 bg-white text-black border border-white/40 shadow-lg">
                          <div className="flex items-center gap-2 text-[#059669] font-bold font-mono text-xs mb-3">
                            <Sparkles className="w-4 h-4 text-[#059669]" />
                            <span>THE ROYAL FILMS RECOMMENDATIONS:</span>
                          </div>
                          <ul className="space-y-2 font-sans text-sm text-neutral-800">
                            {article.tips.map((tip, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2.5">
                                <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle Read Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(article.id)}
                      className="px-4 py-2 bg-white text-black text-xs font-mono-meta font-bold flex items-center gap-2 transition-colors hover:bg-neutral-100 shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'COLLAPSE GUIDE' : 'READ FULL GUIDE'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <span className="text-xs font-mono text-white/80">
                      THE ROYAL FILMS // GAYA & BIHAR
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Journal Footer Inquiries */}
      <div className="pt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/30 bg-black/20 p-8 border border-white/30 mt-12">
        <div>
          <p className="font-mono-meta text-xs text-white/90">HAVE QUESTIONS ABOUT YOUR WEDDING TIMELINE?</p>
          <p className="text-sm font-medium text-white mt-1">
            Our team is always happy to sit down over chai at our Gaya studio to review your day-of flow.
          </p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="px-6 py-3 bg-white hover:bg-neutral-100 text-black text-xs font-mono-meta font-bold transition-colors flex items-center gap-2 shadow-md shrink-0"
        >
          <span>SCHEDULE CONSULTATION</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
