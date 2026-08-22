import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  DollarSign, 
  Menu, 
  X, 
  Bookmark, 
  Calendar
} from 'lucide-react';
import { SupportedLanguage, SupportedCurrency } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

// African Elephant Head Vector Icon
const ElephantHeadIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Crown of Head */}
    <path d="M7.5 8C7.5 5 9.5 3.5 12 3.5C14.5 3.5 16.5 5 16.5 8" />
    {/* Left Flared Ear */}
    <path d="M7.5 8C4.5 7.5 2.5 9 2.5 12C2.5 15.5 5 16.5 7.5 15.5" />
    {/* Right Flared Ear */}
    <path d="M16.5 8C19.5 7.5 21.5 9 21.5 12C21.5 15.5 19 16.5 16.5 15.5" />
    {/* Forehead Bridge & Trunk */}
    <path d="M9.5 10C9.5 12.5 10 16 11.5 19.5C12.2 20.8 13.8 21 14.5 19.5C15 18.5 14.5 17.5 13.5 17.5" />
    {/* Left Curved Tusk */}
    <path d="M8.5 15C8 16.8 6.8 18 5.2 17.5" />
    {/* Right Curved Tusk */}
    <path d="M15.5 15C16 16.8 17.2 18 18.8 17.5" />
    {/* Eyes */}
    <circle cx="9.5" cy="9.5" r="0.6" fill="currentColor" />
    <circle cx="14.5" cy="9.5" r="0.6" fill="currentColor" />
  </svg>
);

interface NavbarProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentCurrency: SupportedCurrency;
  onCurrencyChange: (curr: SupportedCurrency) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  savedCount: number;
  onOpenBooking: () => void;
  onOpenMyBookings?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  savedCount,
  onOpenBooking,
  onOpenMyBookings,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrDropdownOpen, setIsCurrDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'EN • English', flag: '🇬🇧' },
    { code: 'fr', label: 'FR • Français', flag: '🇫🇷' },
    { code: 'sw', label: 'SW • Kiswahili', flag: '🇹🇿' },
    { code: 'es', label: 'ES • Español', flag: '🇪🇸' },
    { code: 'de', label: 'DE • Deutsch', flag: '🇩🇪' },
    { code: 'ar', label: 'AR • العربية', flag: '🇪🇬' },
  ];

  const currencies: { code: SupportedCurrency; symbol: string; label: string }[] = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'KES', symbol: 'KSh', label: 'KES (KSh)' },
    { code: 'ZAR', symbol: 'R', label: 'ZAR (R)' },
    { code: 'EGP', symbol: 'E£', label: 'EGP (E£)' },
  ];

  return (
    <header 
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0d0e11] border-b border-[#21232a] py-3.5' 
          : 'bg-[#0d0e11]/90 backdrop-blur-sm border-b border-[#1c1e24] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with African Elephant Head Icon */}
        <button
          id="nav-brand-logo-button"
          onClick={() => onNavigateSection('hero-section')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
            <ElephantHeadIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase">
              {t.brandTag}
            </span>
            <span className="block font-bold text-lg sm:text-xl tracking-wider text-white">
              SAFARI<span className="text-white/60">.VOYAGE</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button 
            id="nav-link-destinations"
            onClick={() => onNavigateSection('destinations-section')}
            className="text-xs uppercase font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            {t.navDestinations}
          </button>
          <button 
            id="nav-link-tours"
            onClick={() => onNavigateSection('tours-section')}
            className="text-xs uppercase font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            {t.navTours}
          </button>
          <button 
            id="nav-link-big-five"
            onClick={() => onNavigateSection('big-five-section')}
            className="text-xs uppercase font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            {t.navBigFive}
          </button>
          <button 
            id="nav-link-stories"
            onClick={() => onNavigateSection('stories-section')}
            className="text-xs uppercase font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
          >
            {t.navStories}
          </button>
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden md:flex items-center space-x-3">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-dropdown-toggle-button"
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsCurrDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-white" />
              <span>{currentLanguage.toUpperCase()}</span>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#14151a] border border-white/15 shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-white/60 tracking-widest uppercase border-b border-white/10">
                  {t.language}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    id={`lang-option-${lang.code}`}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-white/10 transition-colors ${
                      currentLanguage === lang.code ? 'text-white font-bold bg-white/15' : 'text-white/80'
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector Dropdown */}
          <div className="relative">
            <button
              id="currency-dropdown-toggle-button"
              onClick={() => {
                setIsCurrDropdownOpen(!isCurrDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-3.5 py-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider text-white transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-white" />
              <span>{currentCurrency}</span>
            </button>

            {isCurrDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[#14151a] border border-white/15 shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-white/60 tracking-widest uppercase border-b border-white/10">
                  {t.currency}
                </div>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    id={`currency-option-${curr.code}`}
                    onClick={() => {
                      onCurrencyChange(curr.code);
                      setIsCurrDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-white/10 transition-colors ${
                      currentCurrency === curr.code ? 'text-white font-bold bg-white/15' : 'text-white/80'
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span className="font-mono text-white/60">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Saved Destinations Wishlist */}
          <button
            id="wishlist-counter-button"
            onClick={() => onNavigateSection('destinations-section')}
            className="relative p-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Saved African Expeditions"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {savedCount}
              </span>
            )}
          </button>

          {/* Figma Star Hover Animated Book Button */}
          <SparkleButton
            id="navbar-book-expedition-cta"
            onClick={onOpenBooking}
            icon={<Calendar className="w-3.5 h-3.5" />}
            className="px-5 py-2.5 text-xs"
          >
            {t.bookExpedition}
          </SparkleButton>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full border border-white/15 bg-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e11] border-b border-white/15 px-6 py-6 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-widest text-white/80 font-bold">{t.brandTag}</span>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <button
              id="mobile-nav-destinations"
              onClick={() => {
                onNavigateSection('destinations-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white py-1"
            >
              {t.navDestinations}
            </button>
            <button
              id="mobile-nav-tours"
              onClick={() => {
                onNavigateSection('tours-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white py-1"
            >
              {t.navTours}
            </button>
            <button
              id="mobile-nav-big-five"
              onClick={() => {
                onNavigateSection('big-five-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white py-1"
            >
              {t.navBigFive}
            </button>
            <button
              id="mobile-nav-stories"
              onClick={() => {
                onNavigateSection('stories-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-wider font-semibold text-white/80 hover:text-white py-1"
            >
              {t.navStories}
            </button>
          </div>

          {/* Mobile Language & Currency Selectors */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <div>
              <label className="text-[10px] text-white/70 uppercase tracking-wider block mb-1">{t.language}</label>
              <select
                id="mobile-lang-select"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="w-full bg-[#181920] border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-white"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-white/70 uppercase tracking-wider block mb-1">{t.currency}</label>
              <select
                id="mobile-curr-select"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as SupportedCurrency)}
                className="w-full bg-[#181920] border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-white"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            id="mobile-book-expedition-cta"
            onClick={() => {
              onOpenBooking();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3.5 bg-white hover:bg-neutral-100 text-black font-bold text-xs rounded-full flex items-center justify-center gap-2 uppercase tracking-wider transition-all shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookExpedition}</span>
          </button>
        </div>
      )}
    </header>
  );
};

