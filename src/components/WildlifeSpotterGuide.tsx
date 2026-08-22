import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Info
} from 'lucide-react';
import { BIG_FIVE_WILDLIFE } from '../data/africanData';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface WildlifeSpotterGuideProps {
  currentLanguage: SupportedLanguage;
  isDarkMode: boolean;
}

export const WildlifeSpotterGuide: React.FC<WildlifeSpotterGuideProps> = ({
  currentLanguage,
}) => {
  const [selectedAnimal, setSelectedAnimal] = useState(BIG_FIVE_WILDLIFE[0]);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <section id="big-five-section" className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold text-white">03</span>
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              SAVANNA WILDLIFE GUIDE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            {t.bigFiveTitle}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/85 max-w-md font-normal leading-relaxed">
          {t.bigFiveSubtitle}
        </p>
      </div>

      {/* Interactive Big 5 Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {BIG_FIVE_WILDLIFE.map((animal) => {
          const isSelected = selectedAnimal.id === animal.id;
          return (
            <button
              key={animal.id}
              id={`wildlife-tab-${animal.id}`}
              onClick={() => setSelectedAnimal(animal)}
              className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer shadow-md ${
                isSelected
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-[#14151a] border-white/15 text-white/80 hover:border-white/40 hover:text-white'
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20">
                <img
                  src={animal.image}
                  alt={animal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs truncate font-semibold">{animal.name.split('(')[0]}</span>
                <span className={`block text-[10px] uppercase truncate ${isSelected ? 'text-black/80 font-bold' : 'text-white/60'}`}>
                  {animal.name.includes('(') ? `(${animal.name.split('(')[1]}` : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Spotlight Showcase Box */}
      <div
        className="rounded-2xl border border-white/15 bg-[#14151a] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-xl"
      >
        {/* Animal Imagery Left */}
        <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[380px] overflow-hidden bg-[#0d0e11]">
          <img
            src={selectedAnimal.image}
            alt={selectedAnimal.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0e11]/50" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {selectedAnimal.status}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              {selectedAnimal.name}
            </h3>
            <p className="text-xs font-mono text-white/80 italic">
              {selectedAnimal.scientificName}
            </p>
          </div>
        </div>

        {/* Animal Intel Right */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] text-white font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>NATURALIST HABITAT & FIELD DOSSIER</span>
            </div>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
              {selectedAnimal.description}
            </p>

            {/* Grid of Intel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl border border-white/15 bg-[#181920]">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3 text-white" />
                  <span>Prime Habitats</span>
                </div>
                <p className="text-xs text-white/85 leading-relaxed">
                  {selectedAnimal.habitat}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-[#181920]">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span>Best Tracking Windows</span>
                </div>
                <p className="text-xs text-white/85 leading-relaxed">
                  {selectedAnimal.bestTime}
                </p>
              </div>
            </div>

            {/* Field Note Box */}
            <div className="p-4 rounded-xl bg-[#181920] border border-white/15 flex items-start gap-3">
              <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-bold text-white uppercase tracking-wider mb-0.5">
                  Safari Naturalist Note
                </span>
                <p className="text-xs text-white/85 italic leading-relaxed">
                  "{selectedAnimal.funFact}"
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Wildlife Code of Ethics */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>All sightings strictly maintain ethical distance protocols.</span>
            <span className="text-white font-bold uppercase tracking-wider text-[10px]">100% Protected Reserves</span>
          </div>

        </div>

      </div>
    </section>
  );
};

