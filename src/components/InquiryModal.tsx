import React, { useState } from 'react';
import { X, Check, Heart, MessageCircle } from 'lucide-react';
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
    budgetRange: '₹75,000 – ₹1,50,000',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

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
    `Hello The Royal Films! I would like to inquire about wedding dates.\nCouple: ${formData.coupleNames || 'Prospective Couple'}\nDate: ${formData.weddingDate || 'TBD'}\nLocation: ${formData.cityAndVenue || 'Gaya/Bihar'}\nPackage: ${formData.servicePackage}`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl bg-white text-black p-6 sm:p-10 shadow-2xl border border-black/20 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 border border-black/10 hover:border-black transition-colors rounded-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        {!submitted ? (
          <div>
            <div className="font-mono-meta text-xs text-[#525252] mb-2 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>WEDDING INQUIRY</span>
              <span>·</span>
              <span>DIRECT DISPATCH TO NIRAJ SINGH</span>
            </div>
            <h2 id="inquiry-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
              Check Date Availability & Custom Quote
            </h2>
            <p className="mt-2 text-sm text-[#525252]">
              We shoot one main wedding per date to guarantee undivided focus. Enter your wedding details below or message us directly on WhatsApp (+91 70043 75740).
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    BRIDE & GROOM NAMES *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coupleNames}
                    onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                    placeholder="e.g. Aanya & Rohan"
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    PHONE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 70043 75740"
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    WEDDING DATE(S) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    placeholder="e.g. 18-20 November 2026"
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    CITY & VENUE LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityAndVenue}
                    onChange={(e) => setFormData({ ...formData, cityAndVenue: e.target.value })}
                    placeholder="e.g. Royal Palace, Gaya / Bodh Gaya"
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    SERVICES REQUIRED
                  </label>
                  <select
                    value={formData.servicePackage}
                    onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  >
                    <option value="Candid Photography + 4K Cinematic Film + Drone">Full Package: Candid + 4K Film + Drone</option>
                    <option value="Candid & Traditional Photography Only">Photography Only (Candid + Traditional)</option>
                    <option value="Cinematic Film & Teaser Only">Cinematography Only (4K Film + Drone)</option>
                    <option value="Pre-Wedding Shoot & Film">Pre-Wedding Shoot & Concept Film</option>
                    <option value="Complete Multi-Day Wedding + Luxury Albums">Grand Multi-Day + Handcrafted Albums</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                    ESTIMATED BUDGET TIER
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                  >
                    <option value="₹50,000 – ₹75,000">₹50,000 – ₹75,000 (Single Day/Intimate)</option>
                    <option value="₹75,000 – ₹1,50,000">₹75,000 – ₹1,50,000 (Standard 2-Day)</option>
                    <option value="₹1,50,000 – ₹2,50,000">₹1,50,000 – ₹2,50,000 (Grand 3-Day Wedding)</option>
                    <option value="₹2,50,000+">₹2,50,000+ (Luxury Destination Wedding / Dubai)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-meta text-xs text-[#525252] mb-1.5">
                  TELL US ABOUT YOUR WEDDING VISIONS & EVENTS
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ceremonies planned (Haldi, Sangeet, Varmala), special requests..."
                  className="w-full px-3 py-2 border border-black/20 rounded-none focus:outline-none focus:border-black text-sm bg-neutral-50"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <a
                  href={`https://wa.me/917004375740?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] text-white text-xs font-mono-meta hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>DIRECT WHATSAPP INQUIRY</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-black text-white text-xs font-mono-meta hover:bg-neutral-800 transition-colors"
                >
                  DISPATCH INQUIRY
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-black">
              Wedding Inquiry Transmitted
            </h2>
            <p className="text-sm text-[#525252] max-w-md mx-auto leading-relaxed">
              Your dates and details have been registered under booking token{' '}
              <strong className="font-mono text-black">{referenceId}</strong>. Niraj Singh or our senior team will connect with you via WhatsApp or phone call within 12 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/917004375740?text=Hello%20The%20Royal%20Films!%20I%20just%20submitted%20inquiry%20${referenceId}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-[#25D366] text-white text-xs font-mono-meta hover:bg-[#20ba59] transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>FOLLOW UP ON WHATSAPP</span>
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-black text-white text-xs font-mono-meta hover:bg-neutral-800 transition-colors"
              >
                RETURN TO SITE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
