import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Shield, Settings2, Check, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigatePage: (page: PageId) => void;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'trf_cookie_consent_v1';

export const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigatePage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [functionalAllowed, setFunctionalAllowed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show banner after brief delay
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage access error fallback
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (analytics: boolean, functional: boolean) => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics,
      functional,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save cookie consent', e);
    }
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectNonEssential = () => {
    saveConsent(false, false);
  };

  const handleSaveCustom = () => {
    saveConsent(analyticsAllowed, functionalAllowed);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Cookie Consent Banner (Positioned on bottom-left, clear of right WhatsApp button) */}
      <div
        role="region"
        aria-label="Cookie consent banner"
        className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg z-50 bg-[#121212]/95 backdrop-blur-xl border border-white/20 text-white p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-500 select-none"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white uppercase font-mono">
              Privacy & Cookie Preferences
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed mt-1">
              The Royal Films uses essential cookies for secure site navigation and session flow. With your consent, we also use non-essential performance cookies to refine our cinematic portfolio and wedding guides.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10 text-xs font-mono">
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
          >
            ACCEPT ALL
          </button>

          <button
            onClick={handleRejectNonEssential}
            className="px-4 py-2 border border-white/30 text-white hover:border-white transition-colors"
          >
            REJECT NON-ESSENTIAL
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3 py-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>PREFERENCES</span>
          </button>

          <button
            onClick={() => onNavigatePage('cookie-policy')}
            className="ml-auto text-[11px] text-[#FF6B00] hover:underline"
          >
            COOKIE POLICY
          </button>
        </div>
      </div>

      {/* Detailed Cookie Settings Modal */}
      {isSettingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-lg bg-[#141414] border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Settings2 className="w-5 h-5 text-[#8B5CF6]" />
                <h3 id="cookie-settings-title" className="text-lg font-bold font-mono">
                  COOKIE PREFERENCES
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 hover:text-neutral-400 transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Tailor which cookies you allow on theroyalfilms.in. Essential cookies are required to preserve session security and cannot be disabled.
            </p>

            <div className="space-y-4">
              {/* Essential Cookies (Always Active) */}
              <div className="p-3.5 bg-neutral-900 border border-white/10 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Strictly Necessary Cookies</span>
                    <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-neutral-300">
                      ALWAYS ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Essential for page routing, inquiry tokens, CSRF protection, and UI state storage.
                  </p>
                </div>
                <div className="p-1 text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-3.5 bg-neutral-900 border border-white/10 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-sm text-white">Analytics & Performance</span>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Anonymous aggregate metrics on wedding gallery visits to improve our site loading speeds.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6B00]"></div>
                </label>
              </div>

              {/* Functional Cookies */}
              <div className="p-3.5 bg-neutral-900 border border-white/10 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-sm text-white">Functional Preferences</span>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Remembers your preferred contact sheet grid layout and custom UI preferences.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={functionalAllowed}
                    onChange={(e) => setFunctionalAllowed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  onNavigatePage('cookie-policy');
                }}
                className="text-xs font-mono text-neutral-400 hover:text-white underline"
              >
                Read Full Cookie Policy
              </button>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs font-mono hover:border-white transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-5 py-2 bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-colors"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
