import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Check, 
  AlertCircle, 
  Calendar, 
  Compass, 
  Utensils,
  Home
} from 'lucide-react';
import { TourPackage, Destination, SupportedCurrency } from '../types';
import { formatPrice } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface TourDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: TourPackage | null;
  destination?: Destination | null;
  onBookTour: (tour?: TourPackage | null, destination?: Destination | null) => void;
  currentCurrency: SupportedCurrency;
}

export const TourDetailsModal: React.FC<TourDetailsModalProps> = ({
  isOpen,
  onClose,
  tour,
  destination,
  onBookTour,
  currentCurrency,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || (!tour && !destination)) return null;

  const title = tour ? tour.title : destination?.name || '';
  const country = tour ? tour.country : destination?.country || '';
  const image = tour ? tour.coverImage : destination?.heroImage || '';
  const price = tour ? tour.priceUSD : destination?.startingPriceUSD || 0;
  const rating = tour ? tour.rating : destination?.averageRating || 4.9;
  const reviewsCount = tour ? tour.reviewsCount : destination?.reviewsCount || 500;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85"
      onClick={onClose}
    >
      <div 
        id="tour-details-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#14151a] text-white shadow-2xl overflow-hidden my-8"
      >
        {/* Header Hero Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#0d0e11]">
          <img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0e11]/50" />
          
          <button
            id="close-tour-details-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/80 hover:bg-black text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Floating Details on Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-wider shadow-md">
                {tour?.activityType || 'African Wonder'}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold bg-black/80 border border-white/15 px-3 py-1 rounded-full text-white backdrop-blur-sm">
                <MapPin className="w-3 h-3 text-white" />
                {country}
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 bg-[#14151a]">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#181920] border border-white/15 text-xs">
            <div>
              <span className="text-white/60 block text-[10px] uppercase">Duration</span>
              <span className="font-bold text-xs text-white">{tour ? `${tour.durationDays} Days` : 'Year-Round'}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase">Rating</span>
              <span className="font-bold text-xs text-white flex items-center gap-1">
                <Star className="w-3 h-3 fill-white text-white" />
                {rating} ({reviewsCount})
              </span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase">Difficulty</span>
              <span className="font-bold text-xs text-white">{tour ? tour.difficulty : 'All Levels'}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase">Starting Investment</span>
              <span className="font-bold text-xs font-mono text-white">
                {formatPrice(price, currentCurrency)}
              </span>
            </div>
          </div>

          {/* Day by Day Itinerary (if Tour) or Highlights (if Destination) */}
          {tour && tour.itinerary ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-white" />
                <span>Day-by-day itinerary</span>
              </h3>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/20">
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="relative pl-8 space-y-1">
                    <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold font-mono text-white">
                        DAY {day.day.toString().padStart(2, '0')}
                      </span>
                      <h4 className="font-bold text-xs uppercase text-white">{day.title}</h4>
                    </div>
                    <p className="text-xs text-white/85 font-normal leading-relaxed">
                      {day.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/70 pt-1">
                      <span className="flex items-center gap-1">
                        <Home className="w-3 h-3 text-white" />
                        {day.accommodation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-white" />
                        {day.mealsIncluded}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : destination ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">Highlights</h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                {destination.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#181920] border border-white/15 flex items-center gap-2 text-xs text-white/85">
                    <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {destination.localCultureTip && (
                <div className="p-4 rounded-xl bg-[#181920] border border-white/15 text-xs text-white/85">
                  <strong className="text-white text-[11px] font-semibold block mb-1">Local cultural etiquette</strong>
                  {destination.localCultureTip}
                </div>
              )}
            </div>
          ) : null}

          {/* Included vs Excluded Perks */}
          {tour && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Included in expedition</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-white/85">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white/50 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-white/50" />
                  <span>Not included</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-white/50">
                  {tour.notIncluded.map((not, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{not}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0d0e11] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-white/70 block">From</span>
            <span className="text-lg font-bold font-mono text-white">
              {formatPrice(price, currentCurrency)}
            </span>
            <span className="text-[10px] text-white/70 ml-1">/ person</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/80 hover:text-white transition-colors"
            >
              Close
            </button>

            <SparkleButton
              id="modal-direct-book-tour-btn"
              onClick={() => {
                onClose();
                onBookTour(tour, destination);
              }}
              icon={<Calendar className="w-3.5 h-3.5" />}
              className="px-5 py-2.5 text-xs"
            >
              Book This Expedition
            </SparkleButton>
          </div>
        </div>

      </div>
    </div>
  );
};

