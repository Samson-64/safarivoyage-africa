import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface FooterProps {
  currentLanguage: SupportedLanguage;
  onNavigateSection: (sectionId: string) => void;
  onOpenLegal: (section: 'privacy' | 'terms') => void;
}

const REGION_LINKS: { label: string; section: string }[] = [
  { label: 'East Africa', section: 'destinations-section' },
  { label: 'Southern Africa', section: 'destinations-section' },
  { label: 'North Africa', section: 'destinations-section' },
  { label: 'Zanzibar & the Coast', section: 'destinations-section' },
];

const EXPEDITION_LINKS: { label: string; section: string }[] = [
  { label: 'Great Migration safaris', section: 'tours-section' },
  { label: 'Kilimanjaro summit climbs', section: 'tours-section' },
  { label: 'Gorilla treks', section: 'tours-section' },
  { label: 'Delta mokoro trails', section: 'tours-section' },
];

const PLEDGES = [
  'Anti-poaching units funded',
  'Fair-trade porter guild',
  'Indigenous guide owned',
  'Zero single-use plastics',
];

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onNavigateSection,
  onOpenLegal
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const existing = JSON.parse(localStorage.getItem('safarivoyage_newsletter_subscribers') || '[]');
      if (!existing.includes(email.toLowerCase().trim())) {
        localStorage.setItem('safarivoyage_newsletter_subscribers', JSON.stringify([...existing, email.toLowerCase().trim()]));
      }
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 6000);
    } catch (err) {
      console.error('Newsletter error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer 
      id="main-app-footer"
      className="border-t border-white/10 bg-[#0d0e11] text-white/70"
    >
      {/* Newsletter Dispatch Banner */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#14151a] border border-white/10 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1.5 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#c4a57b] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Expedition dispatches</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                {t.newsletterTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                {t.newsletterSub}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" aria-hidden="true" />
                <label htmlFor="newsletter-email-input" className="sr-only">Email address</label>
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#191b21] border border-white/15 text-white text-xs placeholder:text-white/40"
                />
              </div>

              <SparkleButton
                id="newsletter-subscribe-btn"
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 text-xs shrink-0"
              >
                {isSubscribed ? 'Subscribed' : submitting ? 'Subscribing…' : t.subscribeBtn}
              </SparkleButton>
            </form>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c4a57b] flex items-center justify-center text-black">
                <Compass className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                SAFARI<span className="text-white/60">.VOYAGE</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {t.footerAbout}
            </p>
          </div>

          {/* Regions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Regions</h4>
            <ul className="space-y-2 text-xs text-white/65">
              {REGION_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigateSection(link.section)}
                    className="hover:text-[#c4a57b] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Expeditions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Expeditions</h4>
            <ul className="space-y-2 text-xs text-white/65">
              {EXPEDITION_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigateSection(link.section)}
                    className="hover:text-[#c4a57b] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pledges */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white">Our pledges</h4>
            <ul className="space-y-2 text-xs text-white/65">
              {PLEDGES.map((pledge) => (
                <li key={pledge} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c4a57b] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{pledge}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} SafariVoyage Africa. {t.rightsReserved}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
