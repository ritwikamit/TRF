import React from 'react';
import { ScrollReveal, TextReveal } from './ScrollReveal';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-24 md:py-36 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Editorial Section Label */}
        <ScrollReveal direction="up" distance={20}>
          <div className="font-mono-meta text-xs text-[#525252] mb-8 flex items-center justify-center gap-3">
            <span>02</span>
            <span>·</span>
            <span>THE ROYAL FILMS PHILOSOPHY</span>
          </div>
        </ScrollReveal>

        {/* Big Centered Statement with Word-by-Word Scroll Reveal */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.08] max-w-4xl">
          <TextReveal variant="words" stagger={40} duration={800}>
            Weddings are not staged fashion shoots. They are living, breathing tapestries of family, ritual, and profound human connection.
          </TextReveal>
        </h2>

        {/* Secondary Paragraph with Smooth Fade-Blur Scroll Reveal */}
        <TextReveal variant="fade-blur" delay={200} duration={900}>
          <p className="mt-8 text-base sm:text-lg md:text-xl text-[#525252] max-w-2xl font-normal leading-relaxed tracking-[-0.02em]">
            Founded in Gaya by AAFT alumnus Niraj Singh in 2018, The Royal Films brings film-school storytelling, tech-enabled cinema systems, and genuine emotion to Indian weddings.
            We step back to capture honest tears and unscripted laughter, crafting cinematic films and heirloom albums you will treasure forever.
          </p>
        </TextReveal>

        {/* Metric Dividers and Quantitative Proof */}
        <div className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-black/10 text-left">
          {[
            { value: '500+', label: 'ROYAL CELEBRATIONS' },
            { value: 'ESTB. 2018', label: 'GAYA · PATNA · DUBAI' },
            { value: '4.6 ★', label: '100+ GOOGLE REVIEWS' },
            { value: 'AAFT', label: 'FILM-DIRECTED CREW' }
          ].map((item, idx) => (
            <ScrollReveal
              key={item.label}
              direction="up"
              delay={240 + idx * 80}
              distance={20}
            >
              <div>
                <p className="font-mono-meta text-2xl md:text-3xl font-bold text-black tabular-nums">{item.value}</p>
                <p className="font-mono-meta text-xs text-[#525252] mt-1">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
