export type Region = 
  | 'All Africa'
  | 'East Africa'
  | 'Southern Africa'
  | 'North Africa'
  | 'West Africa'
  | 'Central Africa';

export type ActivityType =
  | 'Wildlife Safari'
  | 'Mountain Trekking'
  | 'Cultural Immersion'
  | 'Desert Expeditions'
  | 'Coastal & Marine'
  | 'Ancient Heritage'
  | 'Eco-Conservation';

export type DifficultyLevel = 'Easy / Family' | 'Moderate' | 'Challenging' | 'Extreme Expedition';

export interface Destination {
  id: string;
  name: string;
  nativeName?: string;
  country: string;
  region: Region;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  activities: ActivityType[];
  highlightBadge: string;
  bestTimeToVisit: string;
  averageRating: number;
  reviewsCount: number;
  startingPriceUSD: number;
  latitude: number;
  longitude: number;
  highlights: string[];
  climate: string;
  localCultureTip: string;
}

export interface TourPackage {
  id: string;
  destinationId: string;
  title: string;
  country: string;
  region: Region;
  activityType: ActivityType;
  durationDays: number;
  difficulty: DifficultyLevel;
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  groupSizeMax: number;
  coverImage: string;
  shortSummary: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation: string;
    mealsIncluded: string;
  }[];
  included: string[];
  notIncluded: string[];
  guideLanguage: string[];
  tags: string[];
  featured?: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  icon: string;
  recommendedFor?: string;
}

export interface BookingRequest {
  tourId: string;
  tourTitle: string;
  country: string;
  tier: 'Classic Explorer' | 'Signature Safari' | 'Ultra-Luxury Reserve';
  tierMultiplier: number;
  startDate: string;
  adults: number;
  children: number;
  selectedAddOns: string[];
  leadTraveler: {
    fullName: string;
    email: string;
    phone: string;
    countryOfResidence: string;
    dietaryNotes?: string;
    specialRequests?: string;
    guideLanguagePreference: string;
  };
  totalPriceUSD: number;
  currency: string;
  convertedTotalPrice: number;
}

export interface BookingConfirmation extends BookingRequest {
  bookingReference: string;
  bookingDate: string;
  status: 'Confirmed' | 'Pending Verification';
  qrDataString: string;
}

export type SupportedLanguage = 'en' | 'fr' | 'sw' | 'es' | 'de' | 'ar';

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'KES' | 'ZAR' | 'EGP';

export interface FilterState {
  searchQuery: string;
  selectedRegion: Region;
  selectedActivity: string;
  selectedDuration: string; // 'all' | 'short' (1-3) | 'medium' (4-7) | 'long' (8-14) | 'epic' (15+)
  selectedDifficulty: string;
  maxBudgetUSD: number;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'duration';
  onlyFeatured: boolean;
}
