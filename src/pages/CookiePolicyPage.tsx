import React, { useState } from 'react';
import { PageId } from '../types';
import { Shield, Settings, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigatePage: (page: PageId) => void;
  onOpenInquiry: () => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({
  onNavigatePage,
  onOpenInquiry
}) => {
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleResetCookies = () => {
    try {
      localStorage.removeItem('trf_cookie_consent_v1');
      setResetMessage('Your cookie consent preferences have been reset. Reloading banner...');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (e) {
      setResetMessage('Preferences reset.');
    }
  };

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
        <div className="font-mono text-xs text-[#2563EB] mb-3 flex items-center gap-2">
          <span>06</span>
          <span>·</span>
          <span>LEGAL & PRIVACY GOVERNANCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Cookie Policy
        </h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
          How The Royal Films atelier uses cookies, session storage, and transparent privacy controls across theroyalfilms.in.
        </p>
        <p className="font-mono text-xs text-neutral-500 mt-4">LAST UPDATED: OCTOBER 2026</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            01. WHAT ARE COOKIES?
          </h2>
          <p>
            Cookies are small cryptographic text files stored on your computer or mobile device when you browse websites. They enable sites to remember your browsing preferences, active navigation state, and security authentication tokens across sessions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            02. HOW WE USE COOKIES
          </h2>
          <p>
            The Royal Films uses cookies strictly to deliver a seamless, high-performance portfolio experience. We do not sell user data, nor do we run aggressive cross-site advertising networks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-neutral-900 border border-white/10 space-y-2">
              <span className="font-bold text-white text-sm block">Strictly Necessary</span>
              <p className="text-xs text-neutral-400">
                Maintains single-page navigation, session tokens, and inquiry submission security.
              </p>
            </div>
            <div className="p-4 bg-neutral-900 border border-white/10 space-y-2">
              <span className="font-bold text-white text-sm block">Performance & Speed</span>
              <p className="text-xs text-neutral-400">
                Helps measure CDN response times for high-resolution 4K wedding films and stills.
              </p>
            </div>
            <div className="p-4 bg-neutral-900 border border-white/10 space-y-2">
              <span className="font-bold text-white text-sm block">Functional Preferences</span>
              <p className="text-xs text-neutral-400">
                Stores your preferred 35mm film roll view mode and cookie consent decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            03. DETAILED COOKIE BREAKDOWN
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs font-mono">
              <span className="md:col-span-3 text-white font-bold">trf_cookie_consent_v1</span>
              <span className="md:col-span-3 text-neutral-400">Local Storage (1 Year)</span>
              <span className="md:col-span-6 text-neutral-300">Stores visitor cookie consent choices and category preferences.</span>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs font-mono">
              <span className="md:col-span-3 text-white font-bold">trf_view_mode</span>
              <span className="md:col-span-3 text-neutral-400">Session Storage</span>
              <span className="md:col-span-6 text-neutral-300">Remembers whether you selected Grid or 35mm Filmstrip mode.</span>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs font-mono">
              <span className="md:col-span-3 text-white font-bold">trf_inquiry_token</span>
              <span className="md:col-span-3 text-neutral-400">Session Storage</span>
              <span className="md:col-span-6 text-neutral-300">Generates unique booking reference IDs for wedding inquiries.</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            04. MANAGING OR WITHDRAWING YOUR CONSENT
          </h2>
          <p>
            You can modify or withdraw your cookie preferences at any time. Clicking the button below will clear stored preferences and reopen the consent banner on your screen:
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetCookies}
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs border border-white/20 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET MY COOKIE PREFERENCES NOW</span>
            </button>
            {resetMessage && (
              <p className="mt-2 text-xs text-emerald-400 font-mono">{resetMessage}</p>
            )}
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white tracking-tight font-mono">
            05. CONTACT US REGARDING PRIVACY
          </h2>
          <p>
            If you have questions about our privacy guidelines, image protection protocols, or cookie management, please connect with our studio desk through our direct booking and inquiry portal.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenInquiry}
              className="px-5 py-2.5 bg-white text-black font-mono text-xs hover:bg-neutral-200 transition-colors"
            >
              OPEN STUDIO CONTACT DESK
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
