import React from 'react';
import { STUDIO_INFO, FAQS } from '../data/projects';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ArrowUpRight, Camera, Video, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenInquiry }) => {
  const gearItems = [
    { category: 'Cinema Cameras', items: 'Sony FX6 Cinema Line, Sony FX3, Sony A7S III (4K 10-bit 4:2:2 S-Log3)' },
    { category: 'Optical Primes', items: 'Sony G Master 24mm f/1.4, 35mm f/1.4, 50mm f/1.2, 85mm f/1.4, 70-200mm f/2.8 GM II' },
    { category: 'Aerial Systems', items: 'DJI Mavic 3 Cine with Apple ProRes & DJI Air 3 4K HDR systems' },
    { category: 'Audio Engineering', items: 'Sennheiser Wireless G4 Lavaliers & Rode NTG directional shotgun microphones' },
    { category: 'Album Craft', items: 'Imported genuine Italian leather, non-tearable 300GSM pearl pages, seamless 180° lay-flat binding' }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 max-w-7xl mx-auto min-h-screen text-white">
      {/* Page Title with Purple Section Accent */}
      <div className="border-b border-white/30 pb-8 mb-16">
        <div className="font-mono-meta text-xs text-white/90 mb-3 flex items-center gap-2">
          <span className="font-bold">03</span>
          <span>·</span>
          <span>THE STUDIO & NIRAJ SINGH</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl">
          Tech-Enabled Cinematic Wedding Films & Royal Photography
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
          Founded in 2018 in Gaya, Bihar by AAFT alumnus Niraj Singh, The Royal Films has documented over 500
          cherished weddings across Bihar, India, and destination celebrations including Dubai.
        </p>
      </div>

      {/* Two-Column Story Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-8 border-b border-white/30">
        <div className="md:col-span-5 space-y-6">
          <p className="font-mono-meta text-xs text-white/90 font-semibold uppercase tracking-wider">
            OUR ETHOS // FILM-SCHOOL DIRECTION
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
            We believe the most poignant memories are the ones you didn't even notice happening.
          </h2>
          <div className="pt-2">
            <a
              href={STUDIO_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono-meta text-black bg-white px-3.5 py-2 hover:bg-neutral-100 transition-colors font-bold shadow-sm"
            >
              <span>OFFICIAL SITE: THEROYALFILMS.IN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="md:col-span-7 space-y-6 text-white/90 text-base leading-relaxed">
          <p>
            When filmmaker Niraj Singh (an alumnus of the prestigious Asian Academy of Film and Television - AAFT) established The Royal Films in 2018, Indian wedding photography was dominated by rigid, artificial posing and endless stage lineups where couples stood exhausted for hours.
          </p>
          <p>
            We pioneered a film-school cinematic and candid visual language in Bihar. Our style is royal, vibrant, and emotionally authentic—honoring the sacred gravity of traditional rituals while celebrating spontaneous joy, stolen whispers, and tearful bidaai glances between parents and their children.
          </p>
          <p>
            Today, our senior team of candid photographers, cinematographers, drone pilots, and master album designers operates out of our Gaya studio, travelling across Bodh Gaya, Patna, Rajgir, Nalanda, Varanasi, Delhi NCR, and international locations including Dubai.
          </p>
          <div className="pt-4 flex flex-wrap gap-8 text-xs font-mono-meta text-white border-t border-white/30">
            <div>
              <span className="block text-white/70">HEADQUARTERS</span>
              <span className="font-bold text-white">CHHOTKI NAWADA, GAYA (ESTB. 2018)</span>
            </div>
            <div>
              <span className="block text-white/70">DESTINATION COVERAGE</span>
              <span className="font-bold text-white">BIHAR · PAN-INDIA · DUBAI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Production & Atelier Photographic Showcase */}
      <div className="py-16 border-b border-white/30">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="font-mono-meta text-xs text-white/90 mb-1">ATELIER & PRODUCTION</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Inside The Royal Films & On-Location Shoots
            </h3>
          </div>
          <span className="text-xs font-mono text-white/80 hidden sm:block">GAYA // ESTB. 2018</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group relative aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/30">
            <img
              src="/assets/images/camera_cinema.jpg"
              alt="4K Cinema Cameras and Prime Lenses"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover photo-bw-to-color grayscale contrast-105 group-hover:grayscale-0 hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="font-mono text-[10px] text-white font-semibold">CINEMA RIG</span>
              <span className="font-semibold text-sm">Sony FX Cinema Systems</span>
            </div>
          </div>

          <div className="group relative aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/30">
            <img
              src="/assets/images/hero_mandap.jpg"
              alt="Grand Wedding Mandap Cinematography"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover photo-bw-to-color grayscale contrast-105 group-hover:grayscale-0 hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="font-mono text-[10px] text-white font-semibold">ON LOCATION</span>
              <span className="font-semibold text-sm">Palace Mandap Vows</span>
            </div>
          </div>

          <div className="group relative aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/30">
            <img
              src="/assets/images/album.jpg"
              alt="Handcrafted Flush-Mount Albums"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover photo-bw-to-color grayscale contrast-105 group-hover:grayscale-0 hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="font-mono text-[10px] text-white font-semibold">HANDCRAFTED</span>
              <span className="font-semibold text-sm">180° Lay-Flat Keepsakes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Location Card & Real Address */}
      <div className="py-16 border-b border-white/30">
        <div className="bg-white text-black p-8 md:p-12 border border-white/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#7C3AED]">
                <MapPin className="w-4 h-4 text-[#7C3AED]" />
                <span>PHYSICAL STUDIO IN GAYA</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                {STUDIO_INFO.address}
              </h2>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                Located at Chhotki Nawada, near Gandhi More (Korma Road / AP Colony), Gaya 823002. We welcome couples and families to visit our studio lounge by appointment to experience our physical leather flush-mount albums, view 4K cinematic teasers on color-calibrated screens, and tailor your wedding package.
              </p>
              <div className="pt-2 font-mono text-xs text-neutral-600 space-y-1">
                <p><strong className="text-black">Coordinates:</strong> 24.7955° N, 85.0002° E</p>
                <p><strong className="text-black">Hours:</strong> Mon – Sat 10:00 AM – 08:30 PM IST</p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <a
                href={STUDIO_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#7C3AED] text-white text-xs font-mono-meta hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 font-bold shadow-md"
              >
                <MapPin className="w-4 h-4" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              </a>
              <WhatsAppButton
                variant="inline"
                label="BOOK IN-PERSON CONSULTATION"
                className="w-full py-3.5 px-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Equipment & Cinema Gear Arsenal */}
      <div className="py-20 border-b border-white/30">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <p className="font-mono-meta text-xs text-white/90 mb-2">PRODUCTION RIGOR</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Camera, Optical & Aerial Arsenal
            </h2>
          </div>
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>

        <div className="divide-y divide-white/20 border-y border-white/30">
          {gearItems.map((gear) => (
            <div key={gear.category} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <span className="md:col-span-4 font-mono-meta text-sm font-bold text-white">
                {gear.category}
              </span>
              <p className="md:col-span-8 text-sm md:text-base text-white/90">
                {gear.items}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-20 border-b border-white/30">
        <div className="mb-12">
          <p className="font-mono-meta text-xs text-white/90 mb-2">COMMON QUESTIONS</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Booking & Working With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FAQS.slice(0, 4).map((faq, idx) => (
            <div key={idx} className="bg-white text-black p-6 border border-white/30 shadow-md">
              <h3 className="text-base font-bold text-black mb-2">{faq.question}</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Banner */}
      <div className="pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-black/20 p-8 border border-white/30">
        <div>
          <p className="font-mono-meta text-xs text-white/90">WEDDING DATES // 2026—2027</p>
          <p className="text-base font-semibold text-white mt-1">
            Planning your wedding in Gaya, Bihar or an outstation/Dubai destination? Let’s connect.
          </p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="px-6 py-3 bg-white hover:bg-neutral-100 text-black text-xs font-mono-meta font-bold transition-colors flex items-center gap-2 shadow-md shrink-0"
        >
          <span>CHECK DATE AVAILABILITY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
