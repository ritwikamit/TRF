import React, { useState } from 'react';
import { X, Check, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/projects';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    coupleNames: '',
    phone: '',
    email: '',
    weddingDate: '',
    cityAndVenue: '',
    servicePackage: 'Candid Photography + 4K Cinematic Film + Drone',
    budgetRange: '₹1,20,000 – ₹2,00,000',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `TRF-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Royal Films! I would like to inquire about wedding dates.\n` +
    `• Couple: ${formData.coupleNames || 'Prospective Couple'}\n` +
    `• Phone: ${formData.phone || 'Provided upon chat'}\n` +
    `• Dates: ${formData.weddingDate || 'TBD'}\n` +
    `• Location: ${formData.cityAndVenue || 'Gaya / Bihar'}\n` +
    `• Package: ${formData.servicePackage}\n` +
    `• Budget: ${formData.budgetRange}\n` +
    (formData.notes ? `• Notes: ${formData.notes}\n` : '') +
    `\nPlease share availability and quote.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl bg-[#121212] text-white p-6 sm:p-10 shadow-2xl border border-white/20 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 border border-white/15 text-neutral-400 hover:text-white hover:border-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {!submitted ? (
          <div>
            <div className="font-mono-meta text-xs text-[#F59E0B] mb-2 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
              <span>WEDDING INQUIRY</span>
              <span>·</span>
              <span>DIRECT DISPATCH TO NIRAJ SINGH</span>
            </div>
            <h2 id="inquiry-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Check Date Availability & Custom Quote
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              We film one principal wedding per date to ensure undivided cinematic focus. Complete your celebration details below or chat with us directly on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    BRIDE & GROOM NAMES *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coupleNames}
                    onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                    placeholder="e.g. Aanya & Rohan"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    PHONE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    WEDDING DATE(S) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    placeholder="e.g. 18-20 November 2026"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    CITY & VENUE LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityAndVenue}
                    onChange={(e) => setFormData({ ...formData, cityAndVenue: e.target.value })}
                    placeholder="e.g. Royal Palace, Gaya / Patna"
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    SERVICES REQUIRED
                  </label>
                  <select
                    value={formData.servicePackage}
                    onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a1a] border border-white/15 text-white focus:outline-none focus:border-[#D97706] text-xs font-mono"
                  >
                    <option value="Candid Photography + 4K Cinematic Film + Drone">Full Package: Candid + 4K Film + Drone</option>
                    <option value="Candid & Traditional Photography Only">Photography Only (Candid + Traditional)</option>
                    <option value="Cinematic Film & Teaser Only">Cinematography Only (4K Film + Drone)</option>
                    <option value="Pre-Wedding Shoot & Film">Pre-Wedding Shoot & Concept Film</option>
                    <option value="Complete Multi-Day Wedding + Luxury Albums">Grand Multi-Day + Handcrafted Albums</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                    ESTIMATED BUDGET TIER
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a1a] border border-white/15 text-white focus:outline-none focus:border-[#D97706] text-xs font-mono"
                  >
                    <option value="₹75,000 – ₹1,20,000">₹75,000 – ₹1,20,000 (Single Day/Intimate)</option>
                    <option value="₹1,20,000 – ₹2,00,000">₹1,20,000 – ₹2,00,000 (Standard 2-Day)</option>
                    <option value="₹2,00,000 – ₹3,50,000">₹2,00,000 – ₹3,50,000 (Grand 3-Day Wedding)</option>
                    <option value="₹3,50,000+">₹3,50,000+ (Luxury Destination / Dubai)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-meta text-xs text-neutral-300 mb-1.5 font-medium">
                  WEDDING VISION & SPECIAL CEREMONY DETAILS
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ceremonies planned (Haldi, Sangeet, Varmala), special entries, custom requests..."
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>DISPATCH INQUIRY</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-14 h-14 bg-[#D97706]/20 border border-[#D97706] text-[#F59E0B] rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider font-semibold">
                INQUIRY DOSSIER TRANSMITTED
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Wedding Inquiry Transmitted
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Your celebration dates have been registered under official studio booking token:
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/20 font-mono text-base font-bold text-white tracking-wider">
              <span>{referenceId}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(referenceId);
                  setCopiedToken(true);
                  setTimeout(() => setCopiedToken(false), 2000);
                }}
                className="text-xs text-neutral-400 hover:text-white transition-colors"
              >
                {copiedToken ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed font-mono">
              Niraj Singh or our principal team will connect with you via WhatsApp or phone call within 12 hours.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
