import React, { useEffect, useState } from 'react';
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  QrCode, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TourPackage, Destination, SupportedLanguage, SupportedCurrency, BookingConfirmation } from '../types';
import { TOUR_ADD_ONS } from '../data/africanData';
import { TRANSLATIONS, formatPrice, convertCurrency } from '../utils/translations';
import { SparkleButton } from './SparkleButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTour?: TourPackage | null;
  selectedDestination?: Destination | null;
  currentLanguage: SupportedLanguage;
  currentCurrency: SupportedCurrency;
}

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().split('T')[0];
}

const INITIAL_TRAVELER = {
  fullName: 'Alex Vance',
  email: 'alex.vance@safari-voyage.com',
  phone: '+1 (555) 234-8900',
  countryOfResidence: 'United States',
  dietaryNotes: 'Vegetarian friendly options appreciated',
  specialRequests: 'Would love morning game drives focused on big cats',
  guideLanguagePreference: 'English',
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTour,
  selectedDestination,
  currentLanguage,
  currentCurrency,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  
  const [tier, setTier] = useState<'Classic Explorer' | 'Signature Safari' | 'Ultra-Luxury Reserve'>('Signature Safari');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['addon-boma-stargazing']);

  const [leadTraveler, setLeadTraveler] = useState(INITIAL_TRAVELER);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Start from a fresh form every time the modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setConfirmedBooking(null);
      setSubmitError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Base tour pricing
  const basePricePerPersonUSD = selectedTour 
    ? selectedTour.priceUSD 
    : selectedDestination 
      ? selectedDestination.startingPriceUSD 
      : 1850;

  const tourTitle = selectedTour 
    ? selectedTour.title 
    : selectedDestination 
      ? `${selectedDestination.name} Discovery Safari` 
      : 'Classic African Safari Expedition';

  const countryName = selectedTour 
    ? selectedTour.country 
    : selectedDestination 
      ? selectedDestination.country 
      : 'Tanzania';

  const durationDays = selectedTour ? selectedTour.durationDays : 7;

  // Tier multiplier
  const tierMultiplier = tier === 'Classic Explorer' ? 1.0 : tier === 'Signature Safari' ? 1.25 : 1.65;

  // Addons total
  const addOnsTotalUSD = selectedAddOns.reduce((sum, addonId) => {
    const found = TOUR_ADD_ONS.find(a => a.id === addonId);
    return sum + (found ? found.priceUSD : 0);
  }, 0);

  // Total USD
  const totalPerAdultUSD = Math.round(basePricePerPersonUSD * tierMultiplier);
  const totalPerChildUSD = Math.round(basePricePerPersonUSD * tierMultiplier * 0.65);
  const totalGuests = adults + children;
  const grandTotalUSD = (adults * totalPerAdultUSD) + (children * totalPerChildUSD) + (addOnsTotalUSD * adults);

  const handleToggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate rapid instant confirmation
      await new Promise((res) => setTimeout(res, 400));

      const returnedCode = `SV-AFR-${Math.floor(100000 + Math.random() * 900000)}`;

      const confirmation: BookingConfirmation = {
        tourId: selectedTour?.id || 'custom-safari',
        tourTitle,
        country: countryName,
        tier,
        tierMultiplier,
        startDate,
        adults,
        children,
        selectedAddOns,
        leadTraveler,
        totalPriceUSD: grandTotalUSD,
        currency: currentCurrency,
        convertedTotalPrice: convertCurrency(grandTotalUSD, currentCurrency),
        bookingReference: returnedCode,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed',
        qrDataString: `SAFARIVOYAGE-PASS:${returnedCode}|${tourTitle}|${startDate}|GUESTS:${totalGuests}`,
      };

      // Save into local storage for user expedition tracking
      try {
        const existing = JSON.parse(localStorage.getItem('safarivoyage_user_bookings') || '[]');
        const newRecord = {
          id: Date.now(),
          bookingCode: returnedCode,
          userEmail: leadTraveler.email,
          guestName: leadTraveler.fullName,
          guestEmail: leadTraveler.email,
          guestPhone: leadTraveler.phone,
          guestCountry: leadTraveler.countryOfResidence,
          tourTitle,
          destinationName: countryName,
          startDate,
          guestsCount: totalGuests,
          totalAmountUsd: grandTotalUSD,
          currency: currentCurrency,
          status: 'Confirmed',
          selectedAddOns: selectedAddOns.map((id) => {
            const f = TOUR_ADD_ONS.find((a) => a.id === id);
            return { id, name: f ? f.name : id };
          }),
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('safarivoyage_user_bookings', JSON.stringify([newRecord, ...existing]));
      } catch (storageErr) {
        console.error('LocalStorage write error:', storageErr);
      }

      setConfirmedBooking(confirmation);
      setStep(4);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Booking submission error:', err);
      setSubmitError(message || 'Error confirming booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SafariVoyage Africa//NONSGML Tour Itinerary//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${confirmedBooking.tourTitle} - SafariVoyage Africa`,
      `DESCRIPTION:Booking Reference: ${confirmedBooking.bookingReference}\\nDestination: ${confirmedBooking.country}\\nGuests: ${totalGuests}`,
      `DTSTART:${confirmedBooking.startDate.replace(/-/g, '')}T080000Z`,
      `LOCATION:${confirmedBooking.country}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${confirmedBooking.bookingReference}-safari-itinerary.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85">
      <div 
        id="booking-modal-card"
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#14151a] text-white shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0d0e11]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#c4a57b] block">
                SafariVoyage Africa
              </span>
              <h3 className="text-base sm:text-lg font-semibold leading-tight line-clamp-1 text-white">
                {tourTitle}
              </h3>
            </div>
          </div>

          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 border-b border-white/10 text-xs font-semibold text-center bg-[#0d0e11]">
          {[
            { s: 1, label: 'Dates & Tier' },
            { s: 2, label: 'Add-Ons' },
            { s: 3, label: 'Traveler' },
            { s: 4, label: 'Boarding Pass' },
          ].map((item) => (
            <div
              key={item.s}
              className={`py-3.5 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                step === item.s
                  ? 'border-white text-white font-bold'
                  : step > item.s
                    ? 'border-white/30 text-white/80'
                    : 'border-transparent text-white/40'
              }`}
            >
              <span className="font-mono">0{item.s}.</span>
              <span className="hidden sm:inline uppercase text-[11px] tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body / Steps */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto bg-[#14151a]">
          
          {/* STEP 1: Dates, Tier & Guests */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Date & Duration Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">
                    Expedition Start Date
                  </label>
                  <input
                    id="booking-start-date-input"
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">
                    Estimated Duration
                  </label>
                  <div className="px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs flex items-center justify-between">
                    <span className="text-white">{durationDays} Days / {durationDays - 1} Nights</span>
                    <span className="text-[10px] uppercase font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/10">Permits Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Guest Counts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">
                    {t.adults}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      id="adults-minus-btn"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 font-bold text-sm flex items-center justify-center text-white transition-colors cursor-pointer"
                    >-</button>
                    <span className="font-mono text-base font-bold w-6 text-center text-white">{adults}</span>
                    <button
                      id="adults-plus-btn"
                      onClick={() => setAdults(adults + 1)}
                      className="w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 font-bold text-sm flex items-center justify-center text-white transition-colors cursor-pointer"
                    >+</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2">
                    {t.children}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      id="children-minus-btn"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 font-bold text-sm flex items-center justify-center text-white transition-colors cursor-pointer"
                    >-</button>
                    <span className="font-mono text-base font-bold w-6 text-center text-white">{children}</span>
                    <button
                      id="children-plus-btn"
                      onClick={() => setChildren(children + 1)}
                      className="w-9 h-9 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 font-bold text-sm flex items-center justify-center text-white transition-colors cursor-pointer"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Safari Experience Tiers */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Select Accommodation & Vehicle Tier
                </label>
                
                {[
                  {
                    name: 'Classic Explorer' as const,
                    desc: 'Standard 4x4 Safari Land Cruiser with pop-up roof + comfort bush lodges.',
                    multiplier: 1.0,
                    badge: 'Standard'
                  },
                  {
                    name: 'Signature Safari' as const,
                    desc: 'Luxury tented suites, private veranda with plunge bath, gourmet bush dinners.',
                    multiplier: 1.25,
                    badge: 'Recommended'
                  },
                  {
                    name: 'Ultra-Luxury Reserve' as const,
                    desc: 'Private scenic air transfers, private villa with dedicated butler and tracker.',
                    multiplier: 1.65,
                    badge: 'VIP Ultimate'
                  }
                ].map((item) => {
                  const isCurrent = tier === item.name;
                  const price = Math.round(basePricePerPersonUSD * item.multiplier);

                  return (
                    <div
                      key={item.name}
                      id={`tier-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setTier(item.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between shadow-md ${
                        isCurrent
                          ? 'border-white bg-[#181920] ring-1 ring-white/30'
                          : 'border-white/15 bg-[#14151a] hover:border-white/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs uppercase tracking-wider text-white">{item.name}</span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            isCurrent ? 'bg-white text-black' : 'bg-white/10 text-white/80 border border-white/10'
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-white/80 max-w-md">{item.desc}</p>
                      </div>

                      <div className="text-right shrink-0 pl-4">
                        <span className="block font-mono font-bold text-sm text-white">
                          {formatPrice(price, currentCurrency)}
                        </span>
                        <span className="text-[10px] text-white/60">/ person</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* STEP 2: Custom Experiences & Add-ons */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-semibold text-white">Enhance your safari</h4>
                <p className="text-xs text-white/80">Hand-curated bespoke experiences to add to your expedition.</p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {TOUR_ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      id={`addon-card-${addon.id}`}
                      onClick={() => handleToggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between shadow-md ${
                        isChecked
                          ? 'border-white bg-[#181920] ring-1 ring-white/30'
                          : 'border-white/15 bg-[#14151a] hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full mt-0.5 ${isChecked ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs uppercase tracking-wider text-white">{addon.name}</span>
                          </div>
                          <p className="text-xs text-white/80 mt-0.5">{addon.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-4">
                        <span className="block font-mono font-bold text-xs text-white">
                          +{formatPrice(addon.priceUSD, currentCurrency)}
                        </span>
                        <span className="text-[10px] text-white/60">/ traveler</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Lead Traveler Info & Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-white">Lead traveler details</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    id="traveler-fullname-input"
                    type="text"
                    value={leadTraveler.fullName}
                    onChange={(e) => setLeadTraveler({ ...leadTraveler, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                    Email Address
                  </label>
                  <input
                    id="traveler-email-input"
                    type="email"
                    value={leadTraveler.email}
                    onChange={(e) => setLeadTraveler({ ...leadTraveler, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="traveler-phone-input"
                    type="tel"
                    value={leadTraveler.phone}
                    onChange={(e) => setLeadTraveler({ ...leadTraveler, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                    Guide Language Preference
                  </label>
                  <select
                    id="traveler-language-pref-select"
                    value={leadTraveler.guideLanguagePreference}
                    onChange={(e) => setLeadTraveler({ ...leadTraveler, guideLanguagePreference: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                  >
                    <option value="English">English</option>
                    <option value="French">French (Français)</option>
                    <option value="Swahili">Swahili (Kiswahili)</option>
                    <option value="German">German (Deutsch)</option>
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="Arabic">Arabic (العربية)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                  Dietary Requirements & Notes
                </label>
                <input
                  id="traveler-dietary-input"
                  type="text"
                  value={leadTraveler.dietaryNotes}
                  onChange={(e) => setLeadTraveler({ ...leadTraveler, dietaryNotes: e.target.value })}
                  placeholder="e.g. Vegetarian, Halal, Gluten-free, Nut allergy"
                  className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-[#181920] text-xs text-white focus:outline-none focus:border-[#c4a57b]"
                />
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <span className="font-bold">Error:</span> {submitError}
                </div>
              )}

              <div className="p-4 rounded-xl bg-[#181920] border border-white/15 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <div className="text-xs text-white/80">
                  <span className="font-semibold text-white block text-xs">Safari concierge guarantee</span>
                  Zero deposit risk: 100% full refund up to 30 days before departure. Official national park conservation permits are secured directly.
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Booking Confirmation & Boarding Pass Ticket */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center">
              
              <div className="inline-flex p-3 rounded-full bg-white/10 text-white border border-white/15 mb-1">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mb-1">
                  {t.bookingSuccessMessage}
                </h3>
                <p className="text-xs text-white/80">
                  Your safari permits and private naturalist guide have been reserved.
                </p>
              </div>

              {/* Boarding Pass Ticket Container */}
              <div 
                id="safari-boarding-pass-card"
                className="max-w-xl mx-auto rounded-2xl bg-[#0d0e11] border border-white/15 p-6 text-left space-y-5 shadow-2xl"
              >
                {/* Header of Pass */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/70">
                      OFFICIAL EXPEDITION PASS
                    </span>
                    <h4 className="text-base font-bold uppercase tracking-wider text-white">
                      SAFARIVOYAGE AFRICA
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/60 uppercase tracking-widest block">Reference</span>
                    <span className="font-mono font-bold text-xs text-white">
                      {confirmedBooking.bookingReference}
                    </span>
                  </div>
                </div>

                {/* Grid of Pass Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Destination</span>
                    <span className="font-bold text-white">{confirmedBooking.country}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Start Date</span>
                    <span className="font-bold text-white">{confirmedBooking.startDate}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Tier</span>
                    <span className="font-bold text-white">{confirmedBooking.tier}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Lead Traveler</span>
                    <span className="font-bold text-white">{confirmedBooking.leadTraveler.fullName}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Party Size</span>
                    <span className="font-bold text-white">{totalGuests} Guests</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[10px] uppercase">Status</span>
                    <span className="font-bold text-white">{confirmedBooking.status}</span>
                  </div>
                </div>

                {/* QR Code & Total Verification Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white text-black">
                      <QrCode className="w-7 h-7" />
                    </div>
                    <div className="text-[10px] text-white/70">
                      <span>Scan upon arrival at</span><br />
                      <span className="font-semibold text-white">VIP Africa Base / Airport</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-white/70 block">Total Investment</span>
                    <span className="text-lg font-bold font-mono text-white">
                      {formatPrice(confirmedBooking.totalPriceUSD, currentCurrency)}
                    </span>
                  </div>
                </div>

              </div>

              {/* Ticket Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  id="export-calendar-ics-btn"
                  onClick={handleDownloadICS}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>{t.addToCalendar}</span>
                </button>

                <button
                  id="print-ticket-btn"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadTicket}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer / Action Bar */}
        {step < 4 && (
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between bg-[#0d0e11]">
            
            {/* Live Pricing Summary */}
            <div>
              <span className="text-[10px] text-white/60 block">Estimated total</span>
              <span className="text-lg font-bold font-mono text-white">
                {formatPrice(grandTotalUSD, currentCurrency)}
              </span>
              <span className="text-[10px] text-white/70 ml-1.5">({totalGuests} Travelers)</span>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  id="booking-step-prev-btn"
                  onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  {t.backStep}
                </button>
              )}

              {step < 3 ? (
                <button
                  id="booking-step-next-btn"
                  onClick={() => setStep((step + 1) as 2 | 3)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  <span>{t.nextStep}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <SparkleButton
                  id="booking-step-confirm-btn"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  className="px-6 py-2.5 text-xs"
                >
                  {isSubmitting ? 'Confirming…' : t.confirmBooking}
                </SparkleButton>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

