import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { SearchFilterBar } from './components/SearchFilterBar';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { GuidedToursSection } from './components/GuidedToursSection';
import { WildlifeSpotterGuide } from './components/WildlifeSpotterGuide';
import { EditorialStorytelling } from './components/EditorialStorytelling';
import { BookingModal } from './components/BookingModal';
import { TourDetailsModal } from './components/TourDetailsModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Footer } from './components/Footer';

import { AFRICAN_DESTINATIONS, AFRICAN_TOURS } from './data/africanData';
import {
  Destination,
  TourPackage,
  FilterState,
  SupportedLanguage,
  SupportedCurrency,
} from './types';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedRegion: 'All Africa',
  selectedActivity: 'All Activities',
  selectedDuration: 'all',
  selectedDifficulty: 'all',
  maxBudgetUSD: 5000,
  sortBy: 'popular',
};

/** Duration bucket ranges (in days) used by the advanced filters. */
const DURATION_RANGES: Record<string, { min: number; max: number }> = {
  short: { min: 1, max: 3 },
  medium: { min: 4, max: 7 },
  long: { min: 8, max: 14 },
  epic: { min: 15, max: Number.MAX_SAFE_INTEGER },
};

function matchesDuration(durationDays: number, selected: string): boolean {
  if (selected === 'all') return true;
  const range = DURATION_RANGES[selected];
  return !!range && durationDays >= range.min && durationDays <= range.max;
}

function MainApp() {
  // Localization state
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [currentCurrency, setCurrentCurrency] = useState<SupportedCurrency>('USD');

  // Saved / wishlist state
  const [savedIds, setSavedIds] = useState<string[]>([
    'serengeti-tanzania',
    'okavango-delta-botswana',
  ]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<TourPackage | null>(null);
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsTour, setDetailsTour] = useState<TourPackage | null>(null);
  const [detailsDestination, setDetailsDestination] = useState<Destination | null>(null);

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  /**
   * Destinations don't carry duration/difficulty themselves — they inherit
   * them from their tour packages. A destination matches when at least one
   * of its tours satisfies the selected duration/difficulty.
   */
  const toursByDestinationId = useMemo(() => {
    const map = new Map<string, TourPackage[]>();
    for (const tour of AFRICAN_TOURS) {
      const list = map.get(tour.destinationId) ?? [];
      list.push(tour);
      map.set(tour.destinationId, list);
    }
    return map;
  }, []);

  function shortestTourDays(dest: Destination): number {
    const tours = toursByDestinationId.get(dest.id) ?? [];
    return tours.length ? Math.min(...tours.map((tour) => tour.durationDays)) : Infinity;
  }

  const filteredDestinations = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    const filtered = AFRICAN_DESTINATIONS.filter((dest) => {
      // Text search across name, country, tagline, description & highlights
      if (query) {
        const haystacks = [
          dest.name,
          dest.country,
          dest.tagline,
          dest.description,
          ...dest.highlights,
        ];
        if (!haystacks.some((text) => text.toLowerCase().includes(query))) {
          return false;
        }
      }

      if (filters.selectedRegion !== 'All Africa' && dest.region !== filters.selectedRegion) {
        return false;
      }

      if (
        filters.selectedActivity !== 'All Activities' &&
        !dest.activities.some((a) => a === filters.selectedActivity)
      ) {
        return false;
      }

      if (dest.startingPriceUSD > filters.maxBudgetUSD) {
        return false;
      }

      // Duration / difficulty are matched against the destination's tours
      const destTours = toursByDestinationId.get(dest.id) ?? [];
      if (!destTours.some((tour) => matchesDuration(tour.durationDays, filters.selectedDuration))) {
        return false;
      }

      if (
        filters.selectedDifficulty !== 'all' &&
        !destTours.some((tour) => tour.difficulty === filters.selectedDifficulty)
      ) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.startingPriceUSD - b.startingPriceUSD;
        case 'price-desc':
          return b.startingPriceUSD - a.startingPriceUSD;
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'duration':
          return shortestTourDays(a) - shortestTourDays(b);
        default:
          return b.reviewsCount - a.reviewsCount;
      }
    });
  }, [filters, toursByDestinationId]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleUpdateFilter = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleNavigateSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenBooking = (tour?: TourPackage | null, destination?: Destination | null) => {
    setBookingTour(tour ?? null);
    setBookingDestination(destination ?? null);
    setIsBookingOpen(true);
  };

  const handleOpenDetails = (tour?: TourPackage | null, destination?: Destination | null) => {
    setDetailsTour(tour ?? null);
    setDetailsDestination(destination ?? null);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-[#f3f4f6] transition-colors duration-300">
      {/* Top fixed navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        savedCount={savedIds.length}
        onOpenBooking={() => handleOpenBooking(AFRICAN_TOURS[0], null)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero carousel */}
      <HeroCarousel
        destinations={AFRICAN_DESTINATIONS}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
        onSelectDestination={(dest) => handleOpenDetails(null, dest)}
        onBookTourForDestination={(dest) => handleOpenBooking(null, dest)}
        onExploreClick={() => handleNavigateSection('search-filter-anchor')}
      />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* Anchor for the search filter bar */}
        <div id="search-filter-anchor" className="scroll-mt-24">
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleUpdateFilter}
            onResetFilters={handleResetFilters}
            totalResultsCount={filteredDestinations.length}
            currentLanguage={currentLanguage}
            currentCurrency={currentCurrency}
          />
        </div>

        {/* Featured attractions grid */}
        <FeaturedDestinations
          destinations={filteredDestinations}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectDestination={(dest) => handleOpenDetails(null, dest)}
          onBookTour={(dest) => handleOpenBooking(null, dest)}
          currentLanguage={currentLanguage}
          currentCurrency={currentCurrency}
        />

        {/* Curated guided safari packages */}
        <GuidedToursSection
          tours={AFRICAN_TOURS}
          onOpenBookingForTour={(tour) => handleOpenBooking(tour, null)}
          onOpenTourDetails={(tour) => handleOpenDetails(tour, null)}
          currentLanguage={currentLanguage}
          currentCurrency={currentCurrency}
        />

        {/* Big Five wildlife guide */}
        <WildlifeSpotterGuide currentLanguage={currentLanguage} />

        {/* Editorial storytelling & conservation */}
        <EditorialStorytelling />
      </main>

      {/* Footer */}
      <Footer currentLanguage={currentLanguage} onNavigateSection={handleNavigateSection} />

      {/* Direct booking modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTour={bookingTour}
        selectedDestination={bookingDestination}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
      />

      {/* Tour & destination details modal */}
      <TourDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        tour={detailsTour}
        destination={detailsDestination}
        onBookTour={(tour, dest) => handleOpenBooking(tour, dest)}
        currentCurrency={currentCurrency}
      />

      {/* Saved & confirmed bookings portal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onOpenNewBooking={() => handleOpenBooking(AFRICAN_TOURS[0], null)}
      />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
