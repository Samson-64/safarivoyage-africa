import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, section }) => {
  if (!isOpen) return null;

  const isPrivacy = section === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto bg-black/85">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#14151a] text-white shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0d0e11] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
              {isPrivacy ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#c4a57b] block">
                SafariVoyage Africa
              </span>
              <h3 className="text-base sm:text-lg font-semibold leading-tight text-white">
                {isPrivacy ? 'Privacy policy' : 'Terms of service'}
              </h3>
            </div>
          </div>

          <button
            id="legal-modal-close-button"
            onClick={onClose}
            className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 space-y-5 text-sm text-white/75 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                We collect only what a booking requires: your name, email, travel dates,
                party size, and payment confirmation. We never sell your data, and we never
                share it with third parties beyond the lodge or operator fulfilling your
                itinerary.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">What we store</h4>
                  <p>
                    Booking records and saved expeditions live in your browser. Newsletter
                    email addresses are stored only when you subscribe.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Your choices</h4>
                  <p>
                    You can clear saved bookings and subscriptions at any time through your
                    browser settings. To request deletion of booking records, contact
                    hello@safarivoyage.africa.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Cookies</h4>
                  <p>
                    We use no advertising or tracking cookies. Local storage keeps your
                    language, currency, and wishlist between visits.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                By booking with SafariVoyage Africa you agree to the terms below. They are
                written to keep expectations clear before you travel.
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">Bookings & payment</h4>
                  <p>
                    A booking is confirmed once payment is received. Deposit and cancellation
                    windows vary by expedition and are shown before checkout.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Changes & cancellations</h4>
                  <p>
                    Date changes are free up to 30 days before departure when the lodge allows
                    it. Inside that window, operator fees may apply.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Travel responsibility</h4>
                  <p>
                    You are responsible for visas, vaccinations, and travel insurance for your
                    route. Safari itineraries may change for wildlife and weather reasons.
                  </p>
                </div>
              </div>
            </>
          )}

          <p className="text-xs text-white/50 border-t border-white/10 pt-4">
            Last updated {new Date().getFullYear()}. Questions: hello@safarivoyage.africa
          </p>
        </div>
      </div>
    </div>
  );
};
