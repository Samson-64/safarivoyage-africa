import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Compass, 
  ArrowRight, 
  Calendar 
} from 'lucide-react';
import { Destination, SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS, formatPrice } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface HeroCarouselProps {
  destinations: Destination[];
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
  onSelectDestination: (dest: Destination) => void;
  onBookTourForDestination: (dest: Destination) => void;
  onExploreClick: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  destinations,
  currentLanguage,
  currentCurrency,
  onSelectDestination,
  onBookTourForDestination,
  onExploreClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const current = destinations[currentIndex] || destinations[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  // Autonomous continuous autoplay - never pauses
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0d0e11] text-white select-none border-b border-[#21232a]"
    >
      {/* Background Hero Image with Motion Crossfade */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.heroImage})` }}
        >
          {/* Calm solid flat darkness overlay - NO color gradients */}
          <div className="absolute inset-0 bg-[#0d0e11]/75" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Left Vertical Architectural Sidebar (Vatanen style) */}
      <div className="hidden lg:flex flex-col items-center justify-center absolute left-8 top-1/2 -translate-y-1/2 z-20 space-y-6">
        <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-[0.3em] uppercase text-[#8e9199]">
          AFRICA EXPEDITION ARCHIVE
        </span>
        <div className="w-[1px] h-14 bg-[#282a33]" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Editorial Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge & Number */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium tracking-wider uppercase shadow-sm">
                {current.highlightBadge}
              </span>

              <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{current.country} • {current.region}</span>
              </div>
            </motion.div>

            {/* Destination Title in uppercase bold display */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current.id + '-title'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] uppercase"
                >
                  {current.name}
                </motion.h1>
              </AnimatePresence>

              {current.nativeName && (
                <p className="text-sm sm:text-base text-white/80 font-serif italic tracking-wide">
                  "{current.nativeName}"
                </p>
              )}
            </div>

            {/* Description Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id + '-desc'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed font-normal line-clamp-3 sm:line-clamp-none"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>

            {/* Solid Action Buttons - Matching destination card pill styling */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <SparkleButton
                id="hero-book-now-button"
                onClick={() => onBookTourForDestination(current)}
                icon={<Calendar className="w-4 h-4" />}
                className="px-7 py-3.5 text-xs sm:text-sm"
              >
                {t.bookDirectTour}
              </SparkleButton>

              <button
                id="hero-explore-details-button"
                onClick={() => onSelectDestination(current)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all uppercase tracking-wider backdrop-blur-sm"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>{t.exploreAttraction}</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>
            </div>

          </div>

          {/* Right Column: Multi-Card Showcase with Automated Index */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-md mx-auto">
              
              {/* Slide Header: Automated Counter */}
              <div className="flex items-center justify-end mb-4 px-1">
                <div className="text-xs font-mono font-bold tracking-widest text-white/70">
                  <span className="text-white text-sm">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                  <span> / </span>
                  <span>{destinations.length.toString().padStart(2, '0')}</span>
                </div>
              </div>

              {/* Architectural Card Stack - Autonomous transition */}
              <div className="relative h-[340px] sm:h-[380px] w-full flex items-center justify-center">
                {destinations.map((dest, idx) => {
                  const offset = (idx - currentIndex + destinations.length) % destinations.length;
                  const isCenter = offset === 0;
                  const isNext = offset === 1 || offset === -(destinations.length - 1);
                  const isPrev = offset === destinations.length - 1 || offset === -1;

                  if (!isCenter && !isNext && !isPrev) return null;

                  return (
                    <motion.div
                      key={dest.id}
                      id={`carousel-slide-card-${dest.id}`}
                      onClick={() => onSelectDestination(dest)}
                      initial={false}
                      animate={{
                        x: isCenter ? 0 : isNext ? 80 : -80,
                        scale: isCenter ? 1 : 0.84,
                        zIndex: isCenter ? 30 : 10,
                        opacity: isCenter ? 1 : 0.45,
                        filter: isCenter ? 'brightness(1)' : 'brightness(0.6)',
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute w-[260px] sm:w-[290px] h-[340px] sm:h-[370px] rounded-2xl overflow-hidden border cursor-pointer group bg-[#14151a] shadow-xl ${
                        isCenter 
                          ? 'border-white/40 ring-1 ring-white/20' 
                          : 'border-white/10'
                      }`}
                    >
                      <img 
                        src={dest.heroImage} 
                        alt={dest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {/* Flat solid dark bottom block */}
                      <div className="absolute inset-0 bg-[#0d0e11]/40" />
                      
                      {/* Floating Card Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0d0e11]/90 border-t border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">
                            {dest.region}
                          </span>
                          <span className="text-[10px] text-white/60 font-mono">
                            0{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white leading-tight uppercase truncate">
                          {dest.name}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-white/80 pt-1">
                          <span>{dest.country}</span>
                          <span className="text-white font-bold font-mono">
                            {formatPrice(dest.startingPriceUSD, currentCurrency)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress indicator bars */}
              <div className="flex items-center justify-center mt-4 px-2">
                <div className="flex items-center space-x-1.5">
                  {destinations.map((_, idx) => (
                    <div
                      key={idx}
                      id={`carousel-indicator-dot-${idx}`}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Numbers */}
      <div className="relative z-10 border-t border-white/10 bg-[#0d0e11] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          
          {/* Stats Bar */}
          <div className="flex items-center space-x-8 sm:space-x-12 text-xs">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-2xl text-white">15</span>
              <span className="text-white/80 text-[11px] leading-tight block">Years on Field<br/><span className="text-white/50">Expeditions</span></span>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-2xl text-white">185</span>
              <span className="text-white/80 text-[11px] leading-tight block">Protected Routes<br/><span className="text-white/50">All Africa</span></span>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-2xl text-white">110</span>
              <span className="text-white/80 text-[11px] leading-tight block">Native Guides<br/><span className="text-white/50">Certified</span></span>
            </div>
            <div className="h-6 w-[1px] bg-white/15 hidden sm:block" />
            <div className="hidden sm:flex items-baseline gap-2">
              <span className="font-bold text-2xl text-white">+5</span>
              <span className="text-white/80 text-[11px] leading-tight block">UNESCO Parks<br/><span className="text-white/50">Sanctuaries</span></span>
            </div>
          </div>

          {/* Scroll Down Action Link */}
          <button
            id="hero-scroll-down-button"
            onClick={onExploreClick}
            className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-colors group"
          >
            <span>EXPLORE EXPEDITIONS</span>
            <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

        </div>
      </div>

    </section>
  );
};


