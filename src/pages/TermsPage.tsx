import React from 'react';
import { PageId } from '../types';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { TextReveal } from '../components/ScrollReveal';

interface TermsPageProps {
  onNavigatePage: (page: PageId) => void;
  onOpenInquiry: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigatePage,
  onOpenInquiry
}) => {
  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 max-w-4xl mx-auto min-h-screen text-white select-none">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => onNavigatePage('home')}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO OVERVIEW</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="border-b border-white/15 pb-8 mb-12">
        <div className="font-mono text-xs text-slate-400 mb-3 flex items-center gap-2">
          <span>07</span>
          <span>·</span>
          <span>TERMS OF ENGAGEMENT & USAGE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          <TextReveal variant="words" stagger={40} duration={800}>
            Terms & Conditions
          </TextReveal>
        </h1>
        <TextReveal variant="fade-blur" delay={150} duration={800}>
          <p className="mt-3 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Standard terms governing access to theroyalfilms.in and professional photography commissions.
          </p>
        </TextReveal>
        <p className="font-mono text-xs text-neutral-500 mt-4">LAST UPDATED: OCTOBER 2026</p>
      </div>

      {/* Sections */}
      <div className="space-y-12 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            01. INTRODUCTION & ACCEPTANCE
          </h2>
          <p>
            Welcome to The Royal Films website (theroyalfilms.in). By viewing our online portfolio, submitting wedding inquiries, or contracting our cinematography and photography crew, you agree to be bound by these Terms and Conditions and our associated policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            02. INTELLECTUAL PROPERTY & MEDIA RIGHTS
          </h2>
          <p>
            All artistic works, wedding photographs, cinematic 4K film excerpts, graphics, texts, branding assets, and custom layout systems showcased on this website are the intellectual property of The Royal Films and its creative director, Niraj Singh, unless otherwise attributed.
          </p>
          <p>
            Unauthorized reproduction, commercial re-use, scraping, or public distribution of our couple portraits or films without prior written consent is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            03. CLIENT PHOTOGRAPHY & COMMISSIONS
          </h2>
          <p>
            Commissioned wedding photography and filmmaking services are formalized through an individualized service agreement specifying dates, crew scale, deliverable timelines (highlight teasers within 72 hours; master edits and albums within 4 to 5 weeks), and retainer terms.
          </p>
          <p>
            If a couple requests private non-disclosure (excluding their ceremonies from our public exhibition or social reels), we honor formal privacy agreements upon advance notice prior to ceremony dates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            04. WEBSITE USAGE & USER RESPONSIBILITIES
          </h2>
          <p>
            Visitors agree to use this site for lawful personal inquiry and inspiration. You agree not to submit deceptive or fraudulent date reservation requests, nor attempt to interfere with the site’s infrastructure, security protocols, or layout performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            05. EXTERNAL LINKS & EMBEDDED CONTENT
          </h2>
          <p>
            Our website may contain verified links to official external platforms, such as Google Maps, Instagram, YouTube, and WhatsApp. We are not responsible for the privacy practices or technical uptime of external third-party services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            06. LIMITATION OF LIABILITY
          </h2>
          <p>
            While we strive for 100% accuracy and continuous availability, theroyalfilms.in is provided on an "as is" and "as available" basis. The Royal Films will not be liable for any indirect, incidental, or consequential damages resulting from website downtime or internet network interruptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            07. MODIFICATIONS TO TERMS
          </h2>
          <p>
            We reserve the right to revise these Terms and Conditions periodically to reflect evolving legal guidelines or studio operations. Continued use of our website following any update signifies your acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            08. CONTACT & INQUIRIES
          </h2>
          <p>
            For questions regarding our terms of engagement or to discuss your bespoke wedding coverage, please initiate a request through our studio consultation portal.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenInquiry}
              className="px-5 py-2.5 bg-white text-black font-mono text-xs hover:bg-neutral-200 transition-colors"
            >
              CONNECT WITH STUDIO TEAM
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
