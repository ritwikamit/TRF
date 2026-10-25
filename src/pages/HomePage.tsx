import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Manifesto } from '../components/Manifesto';
import { ProjectGrid } from '../components/ProjectGrid';
import { Capabilities } from '../components/Capabilities';
import { ScrollReveal, TextReveal } from '../components/ScrollReveal';
import { Project, PageId } from '../types';
import { STUDIO_INFO, TESTIMONIALS, FAQS } from '../data/projects';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ArrowRight, Video, Star, MapPin, HelpCircle } from 'lucide-react';

interface HomePageProps {
  onSelectProject: (project: Project) => void;
  onNavigatePage: (page: PageId) => void;
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProject,
  onNavigatePage,
  onOpenInquiry
}) => {
  return (
    <div className="w-full">
      {/* 1. Monolithic Hero for The Royal Films */}
      <Hero
        onScrollDown={() => {
          const el = document.getElementById('marquee');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiry={onOpenInquiry}
      />

      {/* 2. Infinite Project Marquee */}
      <ScrollReveal direction="up" delay={50} distance={24}>
        <Marquee onSelectProject={onSelectProject} />
      </ScrollReveal>

      {/* 3. Dedicated Photography Overview Banner */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-black/10">
        <ScrollReveal direction="up" delay={80} distance={28}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-neutral-50 p-6 md:p-8 border border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <p className="font-mono-meta text-xs text-[#525252]">GAYA & BIHAR // 4K CINEMA ARCHIVE</p>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mt-0.5">
                  <TextReveal variant="words" stagger={35} duration={750}>
                    Explore Complete Wedding Stories & Films
                  </TextReveal>
                </h3>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigatePage('works')}
                className="px-6 py-3 bg-black text-white text-xs font-mono-meta hover:bg-neutral-800 transition-colors flex items-center gap-2 shrink-0"
              >
                <span>VIEW WEDDING GALLERY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Centered Studio Manifesto */}
      <Manifesto />

      {/* 5. Two-Column Project Grid */}
      <ProjectGrid onSelectProject={onSelectProject} />

      {/* 6. Studio Capabilities & Services */}
      <Capabilities onOpenInquiry={onOpenInquiry} />

      {/* 7. Real Couple Testimonials */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto border-t border-black/10">
        <ScrollReveal direction="up" distance={24}>
          <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="font-mono-meta text-xs text-[#525252] mb-2 flex items-center gap-2">
                <span>04</span>
                <span>·</span>
                <span>COUPLE EXPERIENCES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
                <TextReveal variant="words" stagger={35} duration={750}>
                  Cherished by Families Across India & Abroad
                </TextReveal>
              </h2>
            </div>
            <div className="flex items-center gap-1 text-[#FF6B00]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FF6B00]" />
              ))}
              <span className="font-mono text-xs text-black font-semibold ml-2">4.6 / 5.0 (100+ Reviews)</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 140}
              distance={32}
              className="h-full"
            >
              <div className="bg-neutral-50 p-6 md:p-8 border border-black/10 flex flex-col justify-between h-full">
                <p className="text-base text-black/85 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-black/10 mt-auto">
                  <p className="font-bold text-black text-sm">{t.couple}</p>
                  <p className="text-xs font-mono text-[#525252] mt-0.5">{t.wedding}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto border-t border-black/10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={24}>
            <div className="mb-12 text-center">
              <div className="font-mono-meta text-xs text-[#525252] mb-2 flex items-center justify-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
                <TextReveal variant="words" stagger={35} duration={750}>
                  Planning Your Wedding Photography
                </TextReveal>
              </h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((faq, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 60}
                distance={20}
              >
                <div className="py-6">
                  <h3 className="text-lg font-bold text-black mb-2">{faq.question}</h3>
                  <p className="text-sm md:text-base text-[#525252] leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Direct Location & WhatsApp Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-black/10 bg-neutral-900 text-white p-8 md:p-12">
        <ScrollReveal direction="up" delay={80} distance={28}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00]">
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>VISIT OUR STUDIO IN GAYA</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Chhotki Nawada, Near Gandhi More
              </h3>
              <p className="text-sm text-neutral-400 max-w-xl">
                Korma Road, AP Colony area, Gaya 823002, Bihar. Meet Niraj Singh in person to view physical albums, 4K film reels, and discuss custom wedding packages.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <WhatsAppButton
                variant="inline"
                label="CHAT ON WHATSAPP"
                className="py-3.5 px-6"
              />
              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-white/20 text-white text-xs font-mono-meta hover:border-white transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
