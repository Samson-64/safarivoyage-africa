import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Star,
  Check,
  ArrowRight,
  Clock,
  Languages,
  MapPin
} from 'lucide-react';
import { TourPackage, SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS, formatPrice } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface GuidedToursSectionProps {
  tours: TourPackage[];
  onOpenBookingForTour: (tour: TourPackage) => void;
  onOpenTourDetails: (tour: TourPackage) => void;
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
}

const REGION_TABS = ['All', 'East Africa', 'Southern Africa', 'North Africa'];

export const GuidedToursSection: React.FC<GuidedToursSectionProps> = ({
  tours,
  onOpenBookingForTour,
  onOpenTourDetails,
  currentLanguage,
  currentCurrency,
}) => {
  const [activeRegionTab, setActiveRegionTab] = useState('All');
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const filteredTours = activeRegionTab === 'All'
    ? tours
    : tours.filter((tour) => tour.region === activeRegionTab);

  return (
    <section id="tours-section" className="space-y-8 pt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-white">02</span>
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              EXPEDITIONS & SAFARI PACKAGES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase">
            {t.curatedToursTitle}
          </h2>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#14151a] border border-white/15">
          {REGION_TABS.map((reg) => (
            <button
              key={reg}
              id={`tour-region-tab-${reg.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveRegionTab(reg)}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase font-semibold tracking-wider transition-all ${
                activeRegionTab === reg
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredTours.map((tour, index) => (
          <motion.div
            key={tour.id}
            id={`tour-package-card-${tour.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group rounded-2xl border border-white/15 bg-[#14151a] hover:border-white/40 overflow-hidden flex flex-col md:flex-row justify-between transition-all shadow-xl"
          >
            {/* Tour Image Left / Top */}
            <div className="relative md:w-5/12 h-56 md:h-auto overflow-hidden shrink-0 bg-[#181920]">
              <img
                src={tour.coverImage}
                alt={tour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0d0e11]/40" />

              {/* Tag Pills */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-wider shadow-md">
                  {tour.activityType}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/80 text-white border border-white/15 text-[10px] font-medium backdrop-blur-sm">
                  {tour.difficulty}
                </span>
              </div>

              {/* Region & Country */}
              <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{tour.country}</span>
              </div>
            </div>

            {/* Tour Details Right */}
            <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
              
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs text-white/80 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span className="font-semibold text-white">{tour.durationDays} {t.days}</span>
                  </div>

                  <div className="flex items-center gap-1 text-white/80">
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span>{t.groupSize} {tour.groupSizeMax}</span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-white">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{tour.rating}</span>
                    <span className="text-white/60 font-normal">({tour.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight mb-1.5 text-white uppercase">
                  {tour.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-white/85 line-clamp-2 leading-relaxed mb-3 font-normal">
                  {tour.shortSummary}
                </p>

                {/* Highlights / Included Perks */}
                <div className="space-y-1 mb-3">
                  {tour.included.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/85">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Languages Available */}
                <div className="flex items-center gap-1 text-[11px] text-white/70">
                  <Languages className="w-3.5 h-3.5 text-white" />
                  <span>Guides: {tour.guideLanguage.join(', ')}</span>
                </div>
              </div>

              {/* Bottom Price & Booking Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold font-mono text-white">
                      {formatPrice(tour.priceUSD, currentCurrency)}
                    </span>
                    {tour.originalPriceUSD && (
                      <span className="text-xs text-white/50 line-through font-mono">
                        {formatPrice(tour.originalPriceUSD, currentCurrency)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/70">{t.perPerson}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`view-itinerary-btn-${tour.id}`}
                    onClick={() => onOpenTourDetails(tour)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Itinerary
                  </button>

                  <SparkleButton
                    id={`book-tour-btn-${tour.id}`}
                    onClick={() => onOpenBookingForTour(tour)}
                    icon={<ArrowRight className="w-3 h-3 order-last" />}
                    className="px-4 py-2 text-xs"
                  >
                    Book
                  </SparkleButton>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

