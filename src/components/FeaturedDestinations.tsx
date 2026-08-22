import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Bookmark,
  Compass
} from 'lucide-react';
import { Destination, SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS, formatPrice } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface FeaturedDestinationsProps {
  destinations: Destination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onBookTour: (dest: Destination) => void;
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
}

interface DestinationCardProps {
  dest: Destination;
  index: number;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onBookTour: (dest: Destination) => void;
  currentCurrency: SupportedCurrency;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  dest,
  index,
  isSaved,
  onToggleSave,
  onSelectDestination,
  onBookTour,
  currentCurrency,
}) => {
  // Up to 3 images for the 3-dot pagination carousel (padded with the hero
  // image so there are always exactly 3 slides)
  const images = [dest.heroImage, ...dest.gallery].slice(0, 3);
  while (images.length < 3) {
    images.push(dest.heroImage);
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Get primary activities & tags for the frosted pills
  const primaryActivity = dest.activities?.[0] || 'Savanna Safari';
  const secondaryTag = dest.highlightBadge || dest.region;

  return (
    <motion.div
      id={`destination-card-${dest.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group/card relative rounded-[32px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl min-h-[530px] sm:min-h-[560px] flex flex-col justify-between p-5 sm:p-6 bg-[#14151a]"
    >
      {/* Background Image Slides with AnimatePresence */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0d0e11]">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={activeImageIndex}
            src={images[activeImageIndex]}
            alt={dest.name}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0.7, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
          />
        </AnimatePresence>

        {/* Top Vignette Overlay */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Deep Bottom Gradient Overlay matching reference design */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent via-50% pointer-events-none" />
      </div>

      {/* Top Header Row: Location Badge & Bookmark */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Location Tag Pill */}
        <div 
          id={`dest-location-badge-${dest.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-[#c4a57b]" />
          <span>{dest.country}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/90">{dest.region}</span>
        </div>

        {/* Bookmark Action Button */}
        <button
          id={`bookmark-btn-${dest.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(dest.id);
          }}
          className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#c4a57b] border-[#c4a57b] text-black shadow-lg scale-105'
              : 'bg-black/40 border-white/15 text-white hover:bg-black/70 hover:scale-105'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Attraction'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black text-black' : 'fill-none'}`} />
        </button>
      </div>

      {/* Bottom Content Area: Pagination Dots, Title, Description, Pills & Reserve Button */}
      <div className="relative z-10 pt-16 flex flex-col justify-end space-y-4">
        
        {/* Pagination 3-Dots matching the reference image */}
        <div className="flex items-center gap-1.5" id={`dest-dots-${dest.id}`}>
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              id={`dest-dot-${dest.id}-${dotIdx}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(dotIdx);
              }}
              aria-label={`View photo ${dotIdx + 1} of ${dest.name}`}
              className={`rounded-full transition-all duration-300 ${
                activeImageIndex === dotIdx
                  ? 'w-3 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <div 
          onClick={() => onSelectDestination(dest)}
          className="cursor-pointer group/title"
        >
          <h3 
            id={`dest-card-title-${dest.id}`}
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover/title:text-[#c4a57b] transition-colors"
          >
            {dest.name}
          </h3>
        </div>

        {/* Description matching the reference typography */}
        <p 
          onClick={() => onSelectDestination(dest)}
          className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal line-clamp-3 cursor-pointer"
        >
          {dest.description}
        </p>

        {/* Tags & Price Row */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {/* Pill 1: Activity */}
          <div 
            id={`dest-pill-activity-${dest.id}`}
            className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium"
          >
            {primaryActivity}
          </div>

          {/* Pill 2: Highlight Tag */}
          <div 
            id={`dest-pill-tag-${dest.id}`}
            className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium"
          >
            {secondaryTag}
          </div>

          {/* Price Badge: Solid Black Pill on Right */}
          <div 
            id={`dest-price-badge-${dest.id}`}
            className="ml-auto px-4 py-1.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold tracking-tight border border-white/15 flex items-center gap-1 shadow-md"
          >
            <span>{formatPrice(dest.startingPriceUSD, currentCurrency)}</span>
          </div>
        </div>

        {/* Full-Width Reserve Now Button matching exact reference CTA */}
        <SparkleButton
          id={`reserve-now-btn-${dest.id}`}
          onClick={() => onBookTour(dest)}
          className="w-full py-3.5 sm:py-4 text-sm sm:text-base"
        >
          Reserve Now
        </SparkleButton>

      </div>
    </motion.div>
  );
};

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  destinations,
  savedIds,
  onToggleSave,
  onSelectDestination,
  onBookTour,
  currentLanguage,
  currentCurrency,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (destinations.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl border border-white/15 bg-[#14151a]">
        <Compass className="w-10 h-10 text-white/80 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2 text-white uppercase">{t.noResultsTitle}</h3>
        <p className="text-xs text-white/80 max-w-md mx-auto">{t.noResultsSub}</p>
      </div>
    );
  }

  return (
    <section id="destinations-section" className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-white">01</span>
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              SACRED AFRICAN LANDSCAPES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase">
            Top Attractions & Wonders
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/85 max-w-md font-normal leading-relaxed">
          Explore UNESCO World Heritage wonders, pristine national parks, and untamed natural sanctuaries preserved across Africa.
        </p>
      </div>

      {/* Destination Grid with New Card UI/UX Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {destinations.map((dest, index) => (
          <DestinationCard
            key={dest.id}
            dest={dest}
            index={index}
            isSaved={savedIds.includes(dest.id)}
            onToggleSave={onToggleSave}
            onSelectDestination={onSelectDestination}
            onBookTour={onBookTour}
            currentCurrency={currentCurrency}
          />
        ))}
      </div>
    </section>
  );
};
