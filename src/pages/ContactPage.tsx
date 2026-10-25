import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/projects';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Check, Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { ScrollReveal, TextReveal } from '../components/ScrollReveal';

export const ContactPage: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `TRF-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(token);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Royal Films! I would like to inquire about wedding photography and film coverage.\nCouple: ${formData.coupleNames || 'Prospective Couple'}\nDate: ${formData.weddingDate || 'TBD'}\nLocation: ${formData.cityAndVenue || 'Gaya/Bihar'}`
  );

  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 max-w-7xl mx-auto min-h-screen text-black">
      {/* Page Header with Clean Section Accent */}
      <div className="border-b border-black/20 pb-8 mb-16">
        <div className="font-mono-meta text-xs text-black/80 mb-3 flex items-center gap-2">
          <span className="font-bold">05</span>
          <span>·</span>
          <span>BOOKINGS & STUDIO VISITS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black max-w-4xl">
          <TextReveal variant="words" stagger={40} duration={800}>
            Check Date Availability & Connect
          </TextReveal>
        </h1>
        <TextReveal variant="fade-blur" delay={150} duration={800}>
          <p className="mt-4 text-lg md:text-xl text-neutral-900 max-w-3xl leading-relaxed">
            We take a limited number of weddings each season to ensure personal attention and cinematic perfection.
            Reach out early to secure your dates with The Royal Films.
          </p>
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Direct Studio Information & Verified Channels */}
        <div className="lg:col-span-5 space-y-10">
          {/* Studio Location Card */}
          <div className="p-6 md:p-8 bg-white text-black border border-black/20 shadow-xl space-y-5 font-mono text-xs">
            <div className="flex items-center gap-2 font-semibold text-sm text-black">
              <MapPin className="w-4 h-4 text-black" />
              <span>MAIN STUDIO IN GAYA</span>
            </div>
            <p className="text-black font-semibold text-sm leading-relaxed font-sans">
              {STUDIO_INFO.address}
            </p>
            <div className="space-y-2 text-[#525252]">
              <p><strong className="text-black">Landmark:</strong> Near Gandhi More, Korma Road, AP Colony</p>
              <p><strong className="text-black">GPS Coordinates:</strong> {STUDIO_INFO.coordinates}</p>
              <p><strong className="text-black">Visiting Hours:</strong> Mon – Sat 10:00 AM – 08:30 PM IST</p>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-neutral-900 text-white text-xs font-mono-meta hover:bg-black transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>OPEN LOCATION IN GOOGLE MAPS</span>
              </a>
              <WhatsAppButton
                variant="inline"
                label="DIRECT CHAT ON WHATSAPP (+91 70043 75740)"
                className="w-full"
              />
            </div>
          </div>

          {/* Direct Contact Channels */}
          <div className="space-y-4 border-t border-black/20 pt-6">
            <p className="font-mono-meta text-xs text-black/80 font-bold">DIRECT CONTACTS</p>
            <div className="space-y-3 font-mono text-sm text-black">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-black" />
                <div>
                  <a href={`tel:${STUDIO_INFO.phone}`} className="hover:underline font-bold block text-black">
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <span className="text-xs text-neutral-800 block">{STUDIO_INFO.phoneSecondary} (Mr. Niraj Singh)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-black" />
                <a href={`mailto:${STUDIO_INFO.email}`} className="hover:underline font-medium text-black">
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Verified Social Media Channels */}
          <div className="space-y-4 border-t border-black/20 pt-6">
            <p className="font-mono-meta text-xs text-black/80 font-bold">VERIFIED OFFICIAL CHANNELS</p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <a
                href={STUDIO_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 border border-black/20 bg-white text-black hover:bg-black hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Website: theroyalfilms.in</span>
                <ArrowUpRight className="w-3 h-3 text-black" />
              </a>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 border border-black/20 bg-white text-black hover:bg-black hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Instagram: {STUDIO_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-black" />
              </a>
              <a
                href={STUDIO_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 border border-black/20 bg-white text-black hover:bg-black hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>YouTube: {STUDIO_INFO.youtubeHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-black" />
              </a>
            </div>
          </div>

          {/* Outstation travel note */}
          <div className="p-4 bg-white/70 border border-black/20 text-xs text-neutral-900 leading-relaxed">
            <p className="font-mono text-black font-bold mb-1">DESTINATION & OUTSTATION COVERAGE:</p>
            We routinely film weddings across Bihar (Gaya, Bodh Gaya, Patna, Rajgir, Nalanda, Bhagalpur), Delhi NCR, Varanasi, and international destination celebrations in Dubai. Travel and lodging are arranged by the client or billed at actuals.
          </div>
        </div>

        {/* Right Column: Wedding Booking Form */}
        <div className="lg:col-span-7 bg-white text-black p-6 sm:p-10 border border-white/40 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="font-mono-meta text-xs text-[#D97706] mb-1 flex items-center gap-2 font-bold">
                  <Heart className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                  <span>WEDDING SPECIFICATION</span>
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-black">Check Date Availability</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    COUPLE NAMES (BRIDE & GROOM) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coupleNames}
                    onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                    placeholder="e.g. Aanya & Rohan"
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    PHONE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    WEDDING DATE(S) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    placeholder="e.g. 18-20 November 2026"
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  />
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    CITY & VENUE LOCATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cityAndVenue}
                    onChange={(e) => setFormData({ ...formData, cityAndVenue: e.target.value })}
                    placeholder="e.g. Maurya Hotel, Bailey Road, Patna"
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    SERVICES REQUIRED
                  </label>
                  <select
                    value={formData.servicePackage}
                    onChange={(e) => setFormData({ ...formData, servicePackage: e.target.value })}
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  >
                    <option value="Candid Photography + 4K Cinematic Film + Drone">Full Package: Candid + 4K Film + Drone</option>
                    <option value="Candid & Traditional Photography Only">Photography Only (Candid + Traditional)</option>
                    <option value="Cinematic Film & Teaser Only">Cinematography Only (4K Film + Drone)</option>
                    <option value="Pre-Wedding Shoot & Film">Pre-Wedding Shoot & Concept Film</option>
                    <option value="Complete Multi-Day Wedding + Luxury Albums">Grand Multi-Day + Handcrafted Albums</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                    BUDGET RANGE
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                  >
                    <option value="₹50,000 – ₹75,000">₹50,000 – ₹75,000 (Single Day/Intimate)</option>
                    <option value="₹75,000 – ₹1,50,000">₹75,000 – ₹1,50,000 (Standard 2-Day)</option>
                    <option value="₹1,50,000 – ₹2,50,000">₹1,50,000 – ₹2,50,000 (Grand 3-Day Wedding)</option>
                    <option value="₹2,50,000+">₹2,50,000+ (Luxury Destination Wedding)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-meta text-xs text-black font-bold mb-2">
                  ADDITIONAL CEREMONY DETAILS & NOTES
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the ceremonies (Haldi, Mehendi, Sangeet, Varmala), guest count, special entries..."
                  className="w-full px-3.5 py-3 border border-neutral-300 rounded-none focus:outline-none focus:border-[#D97706] text-base sm:text-sm bg-neutral-50 text-black"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-t border-neutral-200">
                <a
                  href={`https://wa.me/917004375740?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-amber-50 text-black text-xs font-mono-meta border border-amber-300 hover:bg-amber-100 transition-colors inline-flex items-center justify-center gap-2.5 min-h-[44px]"
                >
                  <svg className="w-4 h-4 fill-current text-[#D97706]" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.47C16.32 14.34 15.1 13.74 14.87 13.66C14.65 13.57 14.48 13.53 14.32 13.78C14.15 14.03 13.68 14.58 13.53 14.74C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.09 9.61 11.84C9.46 11.59 9.59 11.45 9.72 11.33C9.83 11.22 9.97 11.04 10.09 10.9C10.21 10.76 10.26 10.65 10.34 10.49C10.42 10.32 10.38 10.18 10.32 10.05C10.26 9.93 9.76 8.7 9.56 8.19C9.36 7.69 9.15 7.76 9 7.75C8.86 7.74 8.69 7.74 8.52 7.74C8.35 7.8 8.08 7.8 7.85 8.05C7.62 8.3 6.98 8.9 6.98 10.12C6.98 11.34 7.87 12.51 8 12.68C8.12 12.85 9.74 15.35 12.23 16.42C12.82 16.68 13.28 16.83 13.64 16.94C14.23 17.13 14.77 17.1 15.2 17.04C15.68 16.97 16.67 16.44 16.88 15.86C17.08 15.28 17.08 14.78 17.02 14.68C16.96 14.58 16.82 14.53 16.57 14.47Z" />
                  </svg>
                  <span>WHATSAPP US</span>
                </a>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#D97706] hover:bg-amber-700 text-white text-xs font-mono-meta font-bold transition-colors shrink-0 shadow-md min-h-[44px]"
                >
                  SUBMIT INQUIRY
                </button>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-amber-100 text-[#D97706] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-black">
                Wedding Inquiry Received
              </h2>
              <p className="text-[#525252] text-sm max-w-md mx-auto leading-relaxed">
                Thank you! Your wedding details have been assigned inquiry token{' '}
                <strong className="font-mono text-black">{referenceId}</strong>. Niraj Singh or our senior cinematography team in Gaya will contact you within 12 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={`https://wa.me/917004375740?text=Hello%20The%20Royal%20Films!%20I%20just%20submitted%20wedding%20inquiry%20${referenceId}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono-meta transition-colors inline-flex items-center gap-2 font-bold"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.47C16.32 14.34 15.1 13.74 14.87 13.66C14.65 13.57 14.48 13.53 14.32 13.78C14.15 14.03 13.68 14.58 13.53 14.74C13.39 14.91 13.24 14.93 12.99 14.81C12.74 14.68 11.94 14.42 10.99 13.57C10.25 12.91 9.75 12.09 9.61 11.84C9.46 11.59 9.59 11.45 9.72 11.33C9.83 11.22 9.97 11.04 10.09 10.9C10.21 10.76 10.26 10.65 10.34 10.49C10.42 10.32 10.38 10.18 10.32 10.05C10.26 9.93 9.76 8.7 9.56 8.19C9.36 7.69 9.15 7.76 9 7.75C8.86 7.74 8.69 7.74 8.52 7.74C8.35 7.8 8.08 7.8 7.85 8.05C7.62 8.3 6.98 8.9 6.98 10.12C6.98 11.34 7.87 12.51 8 12.68C8.12 12.85 9.74 15.35 12.23 16.42C12.82 16.68 13.28 16.83 13.64 16.94C14.23 17.13 14.77 17.1 15.2 17.04C15.68 16.97 16.67 16.44 16.88 15.86C17.08 15.28 17.08 14.78 17.02 14.68C16.96 14.58 16.82 14.53 16.57 14.47Z" />
                  </svg>
                  <span>CHAT ON WHATSAPP NOW</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
