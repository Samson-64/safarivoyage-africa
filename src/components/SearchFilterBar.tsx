import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  DollarSign,
  Activity,
  ArrowUpDown
} from 'lucide-react';
import { FilterState, Region, SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS, formatPrice } from '../utils/translations';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
}

const REGIONS: Region[] = [
  'All Africa',
  'East Africa',
  'Southern Africa',
  'North Africa',
  'West Africa',
  'Central Africa'
];

const ACTIVITIES = [
  'All Activities',
  'Wildlife Safari',
  'Mountain Trekking',
  'Cultural Immersion',
  'Desert Expeditions',
  'Coastal & Marine',
  'Ancient Heritage',
  'Eco-Conservation'
];

const DURATIONS = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: '1 - 3 Days' },
  { value: 'medium', label: '4 - 7 Days' },
  { value: 'long', label: '8 - 14 Days' },
  { value: 'epic', label: '15+ Days' }
];

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  currentLanguage,
  currentCurrency,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <div 
      id="search-filter-container"
      className="w-full rounded-2xl border border-white/15 bg-[#14151a] p-5 sm:p-6 mb-12 text-white shadow-xl"
    >
      {/* Top Search Bar & Main Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* Search Input Field */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            id="destination-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-white/15 bg-[#181920] text-white text-xs placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/70 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Activity Quick Dropdown */}
        <div className="w-full md:w-56">
          <div className="relative">
            <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <select
              id="activity-filter-select"
              value={filters.selectedActivity}
              onChange={(e) => onFilterChange({ selectedActivity: e.target.value })}
              className="w-full pl-10 pr-8 py-3 rounded-full border border-white/15 bg-[#181920] text-xs text-white appearance-none focus:outline-none focus:border-white"
            >
              {ACTIVITIES.map((act) => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle Button */}
        <button
          id="advanced-filters-toggle-button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all ${
            isAdvancedOpen 
              ? 'bg-white text-black border-white font-bold shadow-md' 
              : 'bg-white/10 border-white/15 text-white/80 hover:text-white hover:bg-white/20'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {/* Reset Filter Button */}
        <button
          id="reset-filters-button"
          onClick={onResetFilters}
          title={t.resetFilters}
          className="p-3 rounded-full border border-white/15 bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

      </div>

      {/* Region Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        <MapPin className="w-4 h-4 text-white shrink-0 mr-1" />
        {REGIONS.map((region) => {
          const isSelected = filters.selectedRegion === region;
          return (
            <button
              key={region}
              id={`region-pill-${region.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onFilterChange({ selectedRegion: region })}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white/80 hover:text-white'
              }`}
            >
              {region}
            </button>
          );
        })}
      </div>

      {/* Expandable Advanced Filter Drawer */}
      {isAdvancedOpen && (
        <div className="pt-5 mt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Duration Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-2">
              {t.durationLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((dur) => (
                <button
                  key={dur.value}
                  id={`duration-btn-${dur.value}`}
                  onClick={() => onFilterChange({ selectedDuration: dur.value })}
                  className={`px-2.5 py-2 rounded-full text-xs font-medium border text-center transition-all ${
                    filters.selectedDuration === dur.value
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-white/10 border-white/15 text-white/80 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                {t.budgetLabel}
              </label>
              <span className="text-xs font-bold font-mono text-white">
                Up to {formatPrice(filters.maxBudgetUSD, currentCurrency)}
              </span>
            </div>
            <input
              id="budget-range-slider"
              type="range"
              min="500"
              max="5000"
              step="100"
              value={filters.maxBudgetUSD}
              onChange={(e) => onFilterChange({ maxBudgetUSD: Number(e.target.value) })}
              className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-full"
            />
            <div className="flex justify-between text-[10px] text-white/60 mt-1 font-mono">
              <span>{formatPrice(500, currentCurrency)}</span>
              <span>{formatPrice(5000, currentCurrency)}</span>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-2">
              {t.difficultyLabel}
            </label>
            <select
              id="difficulty-filter-select"
              value={filters.selectedDifficulty}
              onChange={(e) => onFilterChange({ selectedDifficulty: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-white"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy / Family">Easy / Family Friendly</option>
              <option value="Moderate">Moderate Treks</option>
              <option value="Challenging">Challenging Expeditions</option>
              <option value="Extreme Expedition">Extreme Summit Mountaineering</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-2 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-white/70" />
              <span>Sort Results By</span>
            </label>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full px-3.5 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-white"
            >
              <option value="popular">Most Popular & Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Traveler Rating</option>
              <option value="duration">Expedition Duration</option>
            </select>
          </div>

        </div>
      )}

      {/* Results Count & Active Search Feedback */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t text-xs text-white/80 border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="font-semibold text-white">
            {totalResultsCount} {t.resultsFound}
          </span>
          {filters.selectedRegion !== 'All Africa' && (
            <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border border-white/10">
              {filters.selectedRegion}
            </span>
          )}
          {filters.selectedActivity !== 'All Activities' && (
            <span className="bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border border-white/10">
              {filters.selectedActivity}
            </span>
          )}
        </div>

        {(filters.searchQuery || filters.selectedRegion !== 'All Africa' || filters.selectedActivity !== 'All Activities') && (
          <button
            onClick={onResetFilters}
            className="text-white font-medium hover:underline text-xs"
          >
            Clear active filters
          </button>
        )}
      </div>

    </div>
  );
};

