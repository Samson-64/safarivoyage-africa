import React, { useEffect, useState } from 'react';
import { X, Compass, Calendar, Users, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { SparkleButton } from './SparkleButton';

interface StoredAddOn {
  id: string;
  name?: string;
}

interface StoredBooking {
  id: number | string;
  bookingCode: string;
  status?: string;
  tourTitle: string;
  destinationName?: string;
  startDate: string;
  guestsCount: number;
  totalAmountUsd: number;
  guestName?: string;
  guestEmail?: string;
  selectedAddOns?: StoredAddOn[];
}

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewBooking: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onOpenNewBooking,
}) => {
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem('safarivoyage_user_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookings(Array.isArray(parsed) ? parsed : []);
      } else {
        setBookings([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message || 'Unable to retrieve your safari bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85">
      <div 
        id="my-bookings-modal-card"
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#14151a] text-white shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0d0e11]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 block">
                EXPEDITION PORTAL
              </span>
              <h3 className="text-base sm:text-lg font-bold uppercase leading-tight text-white">
                My Booked Safaris & Passes
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              title="Refresh Bookings"
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto bg-[#14151a] space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-white/80" />
              <span className="text-xs uppercase tracking-widest text-white/60">Loading reservations...</span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <CheckCircle2 className="w-10 h-10 text-white/40 mx-auto" />
              <h4 className="text-base font-bold uppercase text-white">No active reservations yet</h4>
              <p className="text-xs text-white/70">
                You haven't confirmed any safari expeditions yet. Explore our iconic African destinations and secure your private itinerary with direct instant confirmation.
              </p>
              <div className="pt-2">
                <SparkleButton
                  onClick={() => {
                    onClose();
                    onOpenNewBooking();
                  }}
                  className="px-6 py-2.5 text-xs mx-auto"
                >
                  Book an Expedition
                </SparkleButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id || b.bookingCode}
                  className="p-5 rounded-2xl bg-[#0d0e11] border border-white/15 space-y-4 hover:border-white/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {b.status || 'Confirmed'}
                        </span>
                        <span className="font-mono text-xs font-bold text-white/90">
                          {b.bookingCode}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold uppercase text-white mt-1">
                        {b.tourTitle}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-white/60 uppercase block">Total Price</span>
                      <span className="text-sm font-bold text-white">
                        ${b.totalAmountUsd?.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Destination</span>
                      <span className="font-semibold text-white/90">{b.destinationName}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Departure</span>
                      <span className="font-semibold text-white/90 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-white/60" />
                        {b.startDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Guests</span>
                      <span className="font-semibold text-white/90 flex items-center gap-1">
                        <Users className="w-3 h-3 text-white/60" />
                        {b.guestsCount} Travelers
                      </span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Lead Guest</span>
                      <span className="font-semibold text-white/90 truncate">{b.guestName}</span>
                    </div>
                  </div>

                  {b.selectedAddOns && b.selectedAddOns.length > 0 && (
                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] uppercase text-white/50 mr-1">Add-ons:</span>
                      {b.selectedAddOns.map((addon, idx: number) => (
                        <span key={idx} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/90">
                          {addon.name || addon.id}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
