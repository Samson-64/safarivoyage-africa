import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Compass, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Destination, SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS, formatPrice } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollProps {
  destinations: Destination[];
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
  onSelectDestination: (dest: Destination) => void;
  onBookTourForDestination: (dest: Destination) => void;
}

/** Half-width of the crossfade window, in destination units. */
const CROSS = 0.3;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const HeroScroll: React.FC<HeroScrollProps> = ({
  destinations,
  currentLanguage,
  currentCurrency,
  onSelectDestination,
  onBookTourForDestination,
}) => {
  const heroDestinations = destinations.slice(0, 5);
  const [scrub, setScrub] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const current = heroDestinations[Math.min(activeIndex, heroDestinations.length - 1)];

  // Pin + scrub only on wide screens with motion allowed.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const update = () => {
      setScrub(mq.matches);
      if (!mq.matches) {
        activeRef.current = 0;
        setActiveIndex(0);
      }
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleBook = useCallback(() => {
    if (current) onBookTourForDestination(current);
  }, [current, onBookTourForDestination]);

  const handleDetails = useCallback(() => {
    if (current) onSelectDestination(current);
  }, [current, onSelectDestination]);

  useEffect(() => {
    if (!scrub || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const n = heroDestinations.length;

      ScrollTrigger.create({
        trigger: wrapperRef.current!,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const pos = n * self.progress;

          for (let i = 0; i < n; i++) {
            const el = layerRefs.current[i];
            if (!el) continue;
            const rise = i === 0 ? 1 : clamp01((pos - (i - CROSS)) / (2 * CROSS));
            const fall = i === n - 1 ? 1 : 1 - clamp01((pos - (i + 1 - CROSS)) / (2 * CROSS));
            const opacity = Math.min(rise, fall);
            const drift = clamp01((pos - (i - CROSS)) / (1 + 2 * CROSS));
            gsap.set(el, { opacity, scale: 1.06 - 0.08 * drift });
          }

          const next = Math.min(n - 1, Math.floor(pos));
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActiveIndex(next);
          }

          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [scrub, heroDestinations.length]);

  if (!current) return null;

  const content = (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-16 flex-1 flex items-center">
      <div className="max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Eyebrow: where we are */}
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {current.country} · {current.region}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif font-semibold text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl tracking-tight text-white">
              {current.name}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              {current.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <SparkleButton
                id="hero-book-now-button"
                onClick={handleBook}
                icon={<Calendar className="w-4 h-4" />}
                className="px-7 py-3.5 text-sm"
              >
                {t.bookDirectTour}
              </SparkleButton>

              <button
                id="hero-explore-details-button"
                onClick={handleDetails}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm transition-colors"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>{t.exploreAttraction}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <section id="hero-section" className="relative bg-[#0d0e11] text-white">
      <div
        ref={wrapperRef}
        className={`relative ${scrub ? 'h-[400vh]' : 'h-[100dvh]'}`}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col">
          {/* Destination layers, crossfaded by scroll progress */}
          <div className="absolute inset-0 z-0">
            {heroDestinations.map((dest, i) => (
              <div
                key={dest.id}
                ref={(el) => {
                  layerRefs.current[i] = el;
                }}
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                  backgroundImage: `url(${dest.heroImage})`,
                  opacity: i === 0 ? 1 : 0,
                }}
                aria-hidden={i !== 0}
              />
            ))}
            {/* Scrims: left for copy legibility, bottom for the progress line */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11] via-[#0d0e11]/60 to-[#0d0e11]/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0e11] to-transparent" />
          </div>

          {content}

          {/* Scroll progress hairline */}
          <div className="relative z-10 h-[3px] w-full bg-white/15">
            <div
              ref={barRef}
              className="h-full w-full bg-[#c4a57b] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
