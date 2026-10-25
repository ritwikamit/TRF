import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/projects';
import { Check, Mail, Phone, MapPin, ArrowUpRight, Heart, Sparkles, Calendar, Camera, Video, ShieldCheck, Clock, Send } from 'lucide-react';
import { ScrollReveal, TextReveal } from '../components/ScrollReveal';

export const ContactPage: React.FC = () => {
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

  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([
    'Haldi & Mehndi',
    'Sangeet Night',
    'Royal Mandap / Pheras'
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  const ceremonyOptions = [
    'Pre-Wedding Concept Shoot',
    'Haldi & Mehndi',
    'Sangeet & Cocktails',
    'Varmala & Royal Mandap',
    'Reception Gala',
    'Archival Heirloom Album'
  ];

  const packageOptions = [
    {
      id: 'Candid Photography + 4K Cinematic Film + Drone',
      title: 'Full Cinematic Experience',
      badge: 'MOST POPULAR',
      desc: 'Master candid photography, 4K multi-cam cinema, FPV/aerial drone coverage & teaser film.'
    },
    {
      id: 'Candid & Traditional Photography Only',
      title: 'Heirloom Photography Only',
      badge: 'CANDID MASTERY',
      desc: 'Film-school directed candid stills, traditional family portraiture & high-res edited gallery.'
    },
    {
      id: 'Cinematic Film & Teaser Only',
      title: 'Cinematography & Teaser Only',
      badge: '4K CINEMA RIGS',
      desc: 'Sony FX cinema camera line, gimbal stabilization, aerial drone & documentary long film.'
    },
    {
      id: 'Complete Multi-Day Wedding + Luxury Albums',
      title: 'Royal Multi-Day & Archival Albums',
      badge: 'BESPOKE ROYALTY',
      desc: '3+ days uninterrupted coverage, pre-wedding shoot, Italian layflat leather heirloom albums.'
    }
  ];

  const budgetTiers = [
    '₹75,000 – ₹1,20,000',
    '₹1,20,000 – ₹2,00,000',
    '₹2,00,000 – ₹3,50,000',
    '₹3,50,000+ (Destination / Dubai)'
  ];

  const toggleCeremony = (ceremony: string) => {
    setSelectedCeremonies(prev =>
      prev.includes(ceremony)
        ? prev.filter(c => c !== ceremony)
        : [...prev, ceremony]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `TRF-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(token);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Royal Films! I would like to reserve dates for our wedding celebration.\n\n` +
    `• Couple: ${formData.coupleNames || 'Prospective Couple'}\n` +
    `• Phone: ${formData.phone || 'Provided upon chat'}\n` +
    `• Dates: ${formData.weddingDate || 'TBD'}\n` +
    `• Location: ${formData.cityAndVenue || 'Gaya / Bihar'}\n` +
    `• Package: ${formData.servicePackage}\n` +
    `• Ceremonies: ${selectedCeremonies.join(', ') || 'Full wedding'}\n` +
    `• Budget Tier: ${formData.budgetRange}\n` +
    (formData.notes ? `• Vision Notes: ${formData.notes}\n` : '') +
    `\nPlease share availability and customized proposal.`
  );

  return (
    <div className="pt-28 md:pt-36 pb-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto min-h-screen text-white">
      {/* 1. Monumental Editorial Section Header */}
      <div className="border-b border-white/15 pb-8 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="font-mono-meta text-xs text-neutral-400 flex items-center gap-2">
            <span className="font-bold text-white">05</span>
            <span>·</span>
            <span>THE ROYAL FILMS ATELIER</span>
            <span>·</span>
            <span className="hidden sm:inline">PRIVATE COMMISSIONS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 rounded-full text-[11px] font-mono text-emerald-400 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">CALENDAR OPEN · SEASONS 2026 / 2027</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.08]">
          <TextReveal variant="words" stagger={40} duration={800}>
            Reserve Your Wedding Dates
          </TextReveal>
        </h1>

        <TextReveal variant="fade-blur" delay={150} duration={800}>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
            Film-school cinematography, candid intimacy, and heirloom wedding craft. Because we document only one principal celebration per date to guarantee undivided presence, we recommend reserving your dates 3 to 9 months in advance.
          </p>
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* 2. Left Column: Lead Director Assurance & Direct Studio Presence */}
        <div className="lg:col-span-5 space-y-8">
          {/* Director & Creative Assurance Card */}
          <ScrollReveal direction="up" distance={20}>
            <div className="p-6 md:p-8 bg-[#121212] border border-white/15 shadow-2xl space-y-5">
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-black border-2 border-[#D97706]/60 shrink-0">
                  <img
                    src="/assets/images/niraj_singh_dp.jpg"
                    alt="Niraj Singh - Lead Cinematographer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to director avatar if custom DP isn't present
                      (e.target as HTMLImageElement).src = '/assets/images/trf_director.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">Niraj Singh</h3>
                    <span className="px-2 py-0.5 bg-[#D97706]/20 border border-[#D97706]/40 text-[#F59E0B] text-[10px] font-mono font-bold">
                      FOUNDER
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Asian Academy of Film & TV (AAFT) Alumnus
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                "We step back to capture honest tears, spontaneous laughter, and the regal gravitas of sacred rituals. Every film is color-graded in-house to international cinema standards."
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-neutral-400 border-t border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Every inquiry is reviewed personally within 12 hours</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Physical Studio Location & Visiting Hours */}
          <ScrollReveal direction="up" delay={80} distance={20}>
            <div className="p-6 md:p-8 bg-[#121212] border border-white/15 shadow-2xl space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-semibold text-sm text-white">
                  <MapPin className="w-4 h-4 text-[#D97706]" />
                  <span>MAIN ATELIER IN GAYA</span>
                </div>
                <span className="text-[11px] text-neutral-400">ESTB. 2018</span>
              </div>

              <div className="space-y-2 text-neutral-300 font-sans text-sm">
                <p className="font-semibold text-white">
                  {STUDIO_INFO.address}
                </p>
                <p className="text-xs text-neutral-400 font-mono">
                  Landmark: Near Gandhi More, Korma Road, AP Colony
                </p>
                <p className="text-xs text-neutral-400 font-mono">
                  GPS: {STUDIO_INFO.coordinates}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-neutral-400 text-xs">
                <div className="flex items-center justify-between">
                  <span>CONSULTATION HOURS:</span>
                  <span className="text-white font-medium">10:00 AM – 08:30 PM IST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>STUDIO DAYS:</span>
                  <span className="text-white font-medium">Monday through Saturday</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                <a
                  href={STUDIO_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white text-xs font-mono transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>VIEW LOCATION ON GOOGLE MAPS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Direct Phone & Email Verified Contacts */}
          <ScrollReveal direction="up" delay={120} distance={20}>
            <div className="p-6 bg-[#121212] border border-white/15 shadow-2xl space-y-4">
              <p className="font-mono-meta text-xs text-neutral-400 font-bold uppercase tracking-wider">
                DIRECT COMMUNICATIONS
              </p>
              <div className="space-y-3 font-mono text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D97706]" />
                  <div>
                    <a href={`tel:${STUDIO_INFO.phone}`} className="hover:text-white hover:underline font-bold block text-white">
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-neutral-400 block">{STUDIO_INFO.phoneSecondary} (Mr. Niraj Singh)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D97706]" />
                  <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-white hover:underline text-neutral-200">
                    {STUDIO_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href={STUDIO_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>theroyalfilms.in</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={STUDIO_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>YouTube 4K</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Destination Coverage Scope */}
          <div className="p-4 bg-white/5 border border-white/15 text-xs text-neutral-300 leading-relaxed font-sans">
            <p className="font-mono text-white font-bold mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>PAN-INDIA & INTERNATIONAL COVERAGE:</span>
            </p>
            We film weddings across Gaya, Bodh Gaya, Patna, Rajgir, Nalanda, Varanasi, Delhi NCR, and destination celebrations including Dubai. Travel logistics and team lodging are handled transparently at actuals.
          </div>
        </div>

        {/* 3. Right Column: The Architectural Wedding Inquiry Dossier Form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="up" delay={60} distance={24}>
            <div className="bg-[#121212] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Form Header */}
                  <div className="border-b border-white/10 pb-5">
                    <div className="font-mono-meta text-xs text-[#F59E0B] mb-1.5 flex items-center gap-2 font-bold tracking-wider">
                      <Heart className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                      <span>WEDDING SPECIFICATION DOSSIER</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      Check Date Availability & Quote
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Complete the celebration details below. Our team reviews timeline feasibility and dates within 12 hours.
                    </p>
                  </div>

                  {/* Field Section 1: Couple Names & Primary Contact */}
                  <div className="space-y-4">
                    <p className="font-mono-meta text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                      01. COUPLE IDENTITY & CONTACT
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block font-mono-meta text-xs text-neutral-300 mb-2 font-medium">
                          BRIDE & GROOM NAMES *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.coupleNames}
                          onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                          placeholder="e.g. Aanya Sharma & Rohan Verma"
                          className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-mono-meta text-xs text-neutral-300 mb-2 font-medium">
                          PHONE / WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono-meta text-xs text-neutral-300 mb-2 font-medium">
                        EMAIL ADDRESS (FOR QUOTATION PDF)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. couple@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Field Section 2: Date & Location */}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <p className="font-mono-meta text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                      02. WEDDING DATES & LOCATION
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block font-mono-meta text-xs text-neutral-300 mb-2 font-medium">
                          WEDDING DATE(S) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.weddingDate}
                            onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                            placeholder="e.g. 18-20 November 2026"
                            className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono-meta text-xs text-neutral-300 mb-2 font-medium">
                          CITY & VENUE LOCATION *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cityAndVenue}
                          onChange={(e) => setFormData({ ...formData, cityAndVenue: e.target.value })}
                          placeholder="e.g. Bodh Gaya Heritage / Maurya, Patna"
                          className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field Section 3: Service Package (Visual Selectable Cards) */}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <p className="font-mono-meta text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                      03. SELECT CINEMA & PHOTOGRAPHY SCOPE
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packageOptions.map((pkg) => {
                        const isSelected = formData.servicePackage === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setFormData({ ...formData, servicePackage: pkg.id })}
                            className={`p-4 border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white/10 border-[#D97706] shadow-lg'
                                : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-bold text-sm text-white">{pkg.title}</span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border ${
                                isSelected ? 'bg-[#D97706] text-black border-[#D97706]' : 'bg-white/10 text-neutral-400 border-white/15'
                              }`}>
                                {pkg.badge}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                              {pkg.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field Section 4: Ceremonies Covered (Multi-Select Chips) */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="font-mono-meta text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                        04. CEREMONIES TO DOCUMENT
                      </p>
                      <span className="text-[11px] font-mono text-neutral-400">SELECT ALL THAT APPLY</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ceremonyOptions.map((ceremony) => {
                        const isChecked = selectedCeremonies.includes(ceremony);
                        return (
                          <button
                            key={ceremony}
                            type="button"
                            onClick={() => toggleCeremony(ceremony)}
                            className={`px-3 py-2 text-xs font-mono transition-all border flex items-center gap-1.5 ${
                              isChecked
                                ? 'bg-white text-black border-white font-semibold'
                                : 'bg-white/5 text-neutral-300 border-white/15 hover:border-white/40'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-[#D97706]' : 'bg-neutral-500'}`} />
                            <span>{ceremony}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field Section 5: Estimated Investment Tier (Segmented Pills) */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <p className="font-mono-meta text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                      05. ESTIMATED INVESTMENT TIER
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budgetRange === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetRange: tier })}
                            className={`px-3 py-2.5 text-[11px] font-mono text-center border transition-all ${
                              isSelected
                                ? 'bg-[#D97706] text-black border-[#D97706] font-bold shadow-md'
                                : 'bg-white/5 text-neutral-300 border-white/15 hover:border-white/40 hover:bg-white/10'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field Section 6: Additional Notes */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <label className="block font-mono-meta text-xs text-neutral-300 font-semibold uppercase tracking-wider">
                      06. VISION & SPECIAL FAMILY REQUESTS
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share ceremony itinerary, expected guest count, special dance performances, emotional nuances..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D97706] focus:bg-white/10 text-sm transition-all"
                    />
                  </div>

                  {/* Action Dispatch Bar */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-2xl min-h-[48px]"
                    >
                      <span>DISPATCH INQUIRY TO ATELIER</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Submission Confirmation State */
                <div className="py-12 sm:py-16 text-center space-y-6">
                  <div className="w-16 h-16 bg-[#D97706]/20 border border-[#D97706] text-[#F59E0B] rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider font-semibold">
                      INQUIRY DOSSIER TRANSMITTED
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      Celebration Registered
                    </h2>
                    <p className="text-neutral-300 text-sm max-w-lg mx-auto leading-relaxed">
                      Thank you! Your wedding details have been recorded under official studio booking token:
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/20 font-mono text-base font-bold text-white tracking-wider">
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
                    Niraj Singh or our senior cinematography lead will contact you within 12 hours via phone call or WhatsApp to confirm date availability and discuss ceremony vision.
                  </p>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          coupleNames: '',
                          phone: '',
                          email: '',
                          weddingDate: '',
                          cityAndVenue: '',
                          servicePackage: 'Candid Photography + 4K Cinematic Film + Drone',
                          budgetRange: '₹1,20,000 – ₹2,00,000',
                          notes: ''
                        });
                      }}
                      className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl"
                    >
                      SUBMIT ANOTHER INQUIRY
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
