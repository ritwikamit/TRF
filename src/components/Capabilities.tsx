import React, { useState } from 'react';
import { STUDIO_SERVICES, STUDIO_INFO } from '../data/projects';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { ScrollReveal, TextReveal } from './ScrollReveal';

interface CapabilitiesProps {
  onOpenInquiry: () => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenInquiry }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="disciplines" className="py-24 md:py-36 px-6 max-w-7xl mx-auto border-t border-black/10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Heading & Commission callout */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <ScrollReveal direction="up" distance={24}>
            <div>
              <div className="font-mono-meta text-xs text-[#525252] mb-3 flex items-center gap-2">
                <span>03</span>
                <span>·</span>
                <span>SERVICES & PACKAGES</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                <TextReveal variant="words" stagger={40} duration={800}>
                  Wedding Photography & Cinema Services
                </TextReveal>
              </h2>
              <TextReveal variant="fade-blur" delay={150} duration={800}>
                <p className="mt-6 text-base text-[#525252] leading-relaxed">
                  We offer comprehensive, tailored packages for intimate roka ceremonies through grand 3-day destination weddings. Every assignment is led by senior cinematographers and candid storytellers.
                </p>
              </TextReveal>
            </div>

            <div className="mt-10 pt-8 border-t border-black/10">
              <p className="font-mono-meta text-xs text-[#525252] mb-3">BOOKING AVAILABILITY // 2026—2027</p>
              <p className="text-sm font-medium text-black">Now accepting bookings for upcoming wedding seasons</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={onOpenInquiry}
                  className="px-5 py-2.5 bg-black text-white text-xs font-mono-meta hover:bg-neutral-800 transition-colors"
                >
                  REQUEST CUSTOM QUOTE
                </button>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 border border-black/20 text-black text-xs font-mono-meta hover:border-black transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>WHATSAPP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Services List */}
        <div className="md:col-span-8 divide-y divide-black/10 border-y border-black/10">
          {STUDIO_SERVICES.map((service, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <ScrollReveal
                key={service.number}
                direction="up"
                delay={idx * 50}
                distance={18}
              >
                <div className="py-8 group">
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full flex items-baseline justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono-meta text-sm text-[#525252]">
                        {service.number}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black group-hover:opacity-70 transition-opacity">
                        {service.title}
                      </h3>
                    </div>
                    <div className="p-2 border border-black/10 rounded-full group-hover:border-black transition-colors shrink-0 ml-4">
                      {isExpanded ? (
                        <Minus className="w-4 h-4 stroke-[2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <div
                    className={`grid transition-all duration-500 overflow-hidden ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <div className="overflow-hidden pl-12 pr-4 space-y-6">
                      <p className="text-[#525252] text-base leading-relaxed max-w-2xl">
                        {service.summary}
                      </p>
                      <div>
                        <p className="font-mono-meta text-xs text-black font-semibold mb-3">
                          SERVICE DELIVERABLES:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[#525252]">
                              <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
