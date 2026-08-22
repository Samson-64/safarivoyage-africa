import React, { useState, useMemo } from 'react';
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

import { 
  AFRICAN_DESTINATIONS, 
  AFRICAN_TOURS 
} from './data/africanData';
import { 
  Destination, 
  TourPackage, 
  FilterState, 
  SupportedLanguage, 
  SupportedCurrency 
} from './types';
import { TRANSLATIONS } from './utils/translations';

function MainApp() {
  // Theme & Localization State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [currentCurrency, setCurrentCurrency] = useState<SupportedCurrency>('USD');

  // Saved / Wishlist State
  const [savedIds, setSavedIds] = useState<string[]>(['serengeti-tanzania', 'okavango-delta-botswana']);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedRegion: 'All Africa',
    selectedActivity: 'All Activities',
    selectedDuration: 'all',
    selectedDifficulty: 'all',
    maxBudgetUSD: 5000,
    sortBy: 'popular',
    onlyFeatured: false,
  });

  // Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingTour, setBookingTour] = useState<TourPackage | null>(null);
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [detailsTour, setDetailsTour] = useState<TourPackage | null>(null);
  const [detailsDestination, setDetailsDestination] = useState<Destination | null>(null);

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);

  // Translation hook
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Filter & Search Logic
  const filteredDestinations = useMemo(() => {
    return AFRICAN_DESTINATIONS.filter((dest) => {
      // Query filter (Name, Country, Tagline, Highlights, Description)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(q);
        const matchesCountry = dest.country.toLowerCase().includes(q);
        const matchesTagline = dest.tagline.toLowerCase().includes(q);
        const matchesDesc = dest.description.toLowerCase().includes(q);
        const matchesHighlights = dest.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesCountry && !matchesTagline && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      // Region filter
      if (filters.selectedRegion !== 'All Africa' && dest.region !== filters.selectedRegion) {
        return false;
      }

      // Activity filter
      if (filters.selectedActivity !== 'All Activities') {
        const hasAct = dest.activities.some(a => a.toLowerCase() === filters.selectedActivity.toLowerCase());
        if (!hasAct) return false;
      }

      // Budget filter
      if (dest.startingPriceUSD > filters.maxBudgetUSD) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.startingPriceUSD - b.startingPriceUSD;
      if (filters.sortBy === 'price-desc') return b.startingPriceUSD - a.startingPriceUSD;
      if (filters.sortBy === 'rating') return b.averageRating - a.averageRating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [filters]);

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(item => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const handleUpdateFilter = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedRegion: 'All Africa',
      selectedActivity: 'All Activities',
      selectedDuration: 'all',
      selectedDifficulty: 'all',
      maxBudgetUSD: 5000,
      sortBy: 'popular',
      onlyFeatured: false,
    });
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking flow
  const handleOpenBooking = (tour?: TourPackage | null, destination?: Destination | null) => {
    setBookingTour(tour || null);
    setBookingDestination(destination || null);
    setIsBookingOpen(true);
  };

  // Open details modal
  const handleOpenDetails = (tour?: TourPackage | null, destination?: Destination | null) => {
    setDetailsTour(tour || null);
    setDetailsDestination(destination || null);
    setIsDetailsOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#0d0e11] text-[#f3f4f6]' 
        : 'bg-stone-50 text-stone-900'
    }`}>
      {/* Top Fixed Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        savedCount={savedIds.length}
        onOpenBooking={() => handleOpenBooking(AFRICAN_TOURS[0], null)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section with 3D Owl / Coverflow Carousel */}
      <HeroCarousel
        destinations={AFRICAN_DESTINATIONS}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
        onSelectDestination={(dest) => handleOpenDetails(null, dest)}
        onBookTourForDestination={(dest) => handleOpenBooking(null, dest)}
        onExploreClick={() => handleNavigateSection('search-filter-anchor')}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* Anchor for dynamic search filter */}
        <div id="search-filter-anchor" className="scroll-mt-24">
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleUpdateFilter}
            onResetFilters={handleResetFilters}
            totalResultsCount={filteredDestinations.length}
            currentLanguage={currentLanguage}
            currentCurrency={currentCurrency}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Featured Attractions & World Wonders Grid */}
        <FeaturedDestinations
          destinations={filteredDestinations}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectDestination={(dest) => handleOpenDetails(null, dest)}
          onBookTour={(dest) => handleOpenBooking(null, dest)}
          currentLanguage={currentLanguage}
          currentCurrency={currentCurrency}
          isDarkMode={isDarkMode}
        />

        {/* Curated Guided Safari Packages */}
        <GuidedToursSection
          tours={AFRICAN_TOURS}
          onOpenBookingForTour={(tour) => handleOpenBooking(tour, null)}
          onOpenTourDetails={(tour) => handleOpenDetails(tour, null)}
          currentLanguage={currentLanguage}
          currentCurrency={currentCurrency}
          isDarkMode={isDarkMode}
        />

        {/* African Big Five Wildlife Guide & Spotlight */}
        <WildlifeSpotterGuide
          currentLanguage={currentLanguage}
          isDarkMode={isDarkMode}
        />

        {/* Editorial Storytelling & Indigenous Conservation */}
        <EditorialStorytelling
          currentLanguage={currentLanguage}
          isDarkMode={isDarkMode}
        />

      </main>

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        isDarkMode={isDarkMode}
        onNavigateSection={handleNavigateSection}
      />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTour={bookingTour}
        selectedDestination={bookingDestination}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
        isDarkMode={isDarkMode}
      />

      {/* Tour & Destination Details Modal */}
      <TourDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        tour={detailsTour}
        destination={detailsDestination}
        onBookTour={(tour, dest) => handleOpenBooking(tour, dest)}
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
        isDarkMode={isDarkMode}
      />

      {/* Saved & Confirmed User Bookings / Expeditions Portal */}
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
