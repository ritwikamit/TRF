import React from 'react';
import { X, ShieldCheck, RefreshCw, FileText, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/projects';

interface PolicyModalProps {
  policyType: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl bg-[#141414] text-white p-6 sm:p-10 shadow-2xl border border-white/15 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 border border-white/15 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-meta uppercase tracking-wider text-[#8B5CF6] mb-3">
          <Sparkles className="w-4 h-4 text-[#FF6B00]" />
          <span>THE ROYAL FILMS // STUDIO POLICIES & TERMS</span>
        </div>

        <h2 id="policy-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {policyType}
        </h2>

        <div className="mt-6 space-y-4 text-sm text-neutral-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {policyType === 'Terms of Service' && (
            <>
              <div className="flex items-start gap-3 p-3 bg-[#1A1A1A] border border-white/10">
                <FileText className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Booking Dates & Dedicated Crew</h4>
                  <p className="text-xs text-neutral-400 mt-1">We reserve wedding dates on a first-come, first-served basis upon receipt of standard retainer deposit.</p>
                </div>
              </div>
              <p>
                Welcome to The Royal Films ({STUDIO_INFO.website}). By booking our wedding photography or cinematography services, clients enter into a clear professional agreement with our Gaya-based studio.
              </p>
              <p>
                Each wedding booking locks in our senior directors and cameras exclusively for your ceremonies, ensuring undivided artistic and technical focus.
              </p>
            </>
          )}

          {policyType === 'Privacy Policy' && (
            <>
              <div className="flex items-start gap-3 p-3 bg-[#1A1A1A] border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Client Confidentiality & Image Rights</h4>
                  <p className="text-xs text-neutral-400 mt-1">We protect your family's privacy and never sell contact data or high-resolution photo archives.</p>
                </div>
              </div>
              <p>
                The Royal Films respects the sanctity and privacy of every family. Contact details submitted through inquiry forms are used solely for scheduling consultations and sending digital galleries.
              </p>
              <p>
                If a couple prefers their wedding to remain private without social media exhibition, we honor non-disclosure agreements upon prior notice.
              </p>
            </>
          )}

          {policyType === 'Returns & FAQ' && (
            <>
              <div className="flex items-start gap-3 p-3 bg-[#1A1A1A] border border-white/10">
                <RefreshCw className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Delivery & Quality Guarantee</h4>
                  <p className="text-xs text-neutral-400 mt-1">Highlights delivered in 72 hours; master films and albums within 4 to 5 weeks.</p>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="border-b border-white/10 pb-3">
                  <h5 className="font-bold text-white">How soon do we receive our wedding photos?</h5>
                  <p className="text-xs text-neutral-400 mt-1">A curated preview gallery of 25–35 retouched highlight photos is sent via WhatsApp and private cloud within 72 hours of your reception.</p>
                </div>
                <div className="border-b border-white/10 pb-3">
                  <h5 className="font-bold text-white">Can we request album revisions?</h5>
                  <p className="text-xs text-neutral-400 mt-1">Yes, our digital layout proofing portal allows couples two rounds of spread adjustments before sending the master album to our Italian leather press.</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
