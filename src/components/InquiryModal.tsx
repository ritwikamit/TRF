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

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
                <a
                  href={`https://wa.me/917004375740?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.47C16.32 14.34 15.1 13.74 14.87 13.66C14.65 13.57 14.48 13.53 14.32 13.78C14.15 14.03 13.68 14.58 13.53 14.74C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.09 9.61 11.84C9.46 11.59 9.59 11.45 9.72 11.33C9.83 11.22 9.97 11.04 10.09 10.9C10.21 10.76 10.26 10.65 10.34 10.49C10.42 10.32 10.38 10.18 10.32 10.05C10.26 9.93 9.76 8.7 9.56 8.19C9.36 7.69 9.15 7.76 9 7.75C8.86 7.74 8.69 7.74 8.52 7.74C8.35 7.8 8.08 7.8 7.85 8.05C7.62 8.3 6.98 8.9 6.98 10.12C6.98 11.34 7.87 12.51 8 12.68C8.12 12.85 9.74 15.35 12.23 16.42C12.82 16.68 13.28 16.83 13.64 16.94C14.23 17.13 14.77 17.1 15.2 17.04C15.68 16.97 16.67 16.44 16.88 15.86C17.08 15.28 17.08 14.78 17.02 14.68C16.96 14.58 16.82 14.53 16.57 14.47Z" />
                  </svg>
                  <span>DIRECT WHATSAPP BRIEF</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-xl"
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

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/917004375740?text=Hello%20The%20Royal%20Films!%20I%20just%20submitted%20inquiry%20dossier%20${referenceId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.47C16.32 14.34 15.1 13.74 14.87 13.66C14.65 13.57 14.48 13.53 14.32 13.78C14.15 14.03 13.68 14.58 13.53 14.74C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.09 9.61 11.84C9.46 11.59 9.59 11.45 9.72 11.33C9.83 11.22 9.97 11.04 10.09 10.9C10.21 10.76 10.26 10.65 10.34 10.49C10.42 10.32 10.38 10.18 10.32 10.05C10.26 9.93 9.76 8.7 9.56 8.19C9.36 7.69 9.15 7.76 9 7.75C8.86 7.74 8.69 7.74 8.52 7.74C8.35 7.8 8.08 7.8 7.85 8.05C7.62 8.3 6.98 8.9 6.98 10.12C6.98 11.34 7.87 12.51 8 12.68C8.12 12.85 9.74 15.35 12.23 16.42C12.82 16.68 13.28 16.83 13.64 16.94C14.23 17.13 14.77 17.1 15.2 17.04C15.68 16.97 16.67 16.44 16.88 15.86C17.08 15.28 17.08 14.78 17.02 14.68C16.96 14.58 16.82 14.53 16.57 14.47Z" />
                </svg>
                <span>CHAT VIA WHATSAPP</span>
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white text-xs font-mono font-bold transition-all"
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
