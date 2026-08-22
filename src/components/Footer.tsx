import React, { useState } from 'react';
import { 
  Compass, 
  Mail, 
  Heart, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface FooterProps {
  currentLanguage: SupportedLanguage;
  isDarkMode: boolean;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onNavigateSection
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
      // Client-side local storage recording
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
          <div className="rounded-2xl bg-[#14151a] border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            
            <div className="space-y-1.5 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>AFRICAN EXPEDITIONS DISPATCH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {t.newsletterTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/85">
                {t.newsletterSub}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#181920] border border-white/15 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-white"
                />
              </div>

              <SparkleButton
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-6 py-2.5 text-xs shrink-0"
              >
                {isSubscribed ? 'Subscribed!' : t.subscribeBtn}
              </SparkleButton>
            </form>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
                SAFARI<span className="text-white">VOYAGE</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm">
              {t.footerAbout}
            </p>
          </div>

          {/* Regional Portals */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">
              African Regions
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li><button onClick={() => onNavigateSection('destinations-section')} className="hover:text-white transition-colors cursor-pointer">East Africa (Serengeti & Kili)</button></li>
              <li><button onClick={() => onNavigateSection('destinations-section')} className="hover:text-white transition-colors cursor-pointer">Southern Africa (Okavango & Victoria)</button></li>
              <li><button onClick={() => onNavigateSection('destinations-section')} className="hover:text-white transition-colors cursor-pointer">North Africa (Nile & Sahara)</button></li>
              <li><button onClick={() => onNavigateSection('destinations-section')} className="hover:text-white transition-colors cursor-pointer">Namib Red Dune Expeditons</button></li>
              <li><button onClick={() => onNavigateSection('destinations-section')} className="hover:text-white transition-colors cursor-pointer">Zanzibar & Spice Archipelago</button></li>
            </ul>
          </div>

          {/* Key Experiences */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">
              Expedition Types
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li><button onClick={() => onNavigateSection('tours-section')} className="hover:text-white transition-colors cursor-pointer">Big 5 Great Migration Safaris</button></li>
              <li><button onClick={() => onNavigateSection('tours-section')} className="hover:text-white transition-colors cursor-pointer">Kilimanjaro Summit Climbs</button></li>
              <li><button onClick={() => onNavigateSection('tours-section')} className="hover:text-white transition-colors cursor-pointer">Bwindi Mountain Gorilla Treks</button></li>
              <li><button onClick={() => onNavigateSection('tours-section')} className="hover:text-white transition-colors cursor-pointer">Luxury Nile River Feluccas</button></li>
              <li><button onClick={() => onNavigateSection('tours-section')} className="hover:text-white transition-colors cursor-pointer">Mokoro Canoe Delta Trails</button></li>
            </ul>
          </div>

          {/* Conservation Pledges */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white">
              Our Pledges
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Anti-Poaching Units Funded</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Fair Trade Porters Guild</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>100% Indigenous Guide Owned</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>Zero Single-Use Plastics</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} SafariVoyage Africa. {t.rightsReserved}</p>
          <div className="flex items-center gap-1.5 text-white/80">
            <span>Crafted for African Wilderness Exploration</span>
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

