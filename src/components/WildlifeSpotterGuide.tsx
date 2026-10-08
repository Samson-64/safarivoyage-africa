import React, { useState } from 'react';
import { 
  MapPin, 
  Clock
} from 'lucide-react';
import { BIG_FIVE_WILDLIFE } from '../data/africanData';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface WildlifeSpotterGuideProps {
  currentLanguage: SupportedLanguage;
}

export const WildlifeSpotterGuide: React.FC<WildlifeSpotterGuideProps> = ({
  currentLanguage,
}) => {
  const [selectedAnimal, setSelectedAnimal] = useState(BIG_FIVE_WILDLIFE[0]);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <section id="big-five-section" className="space-y-6 pt-4">
      {/* Header */}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">
        {t.bigFiveTitle}
      </h2>

      {/* Interactive Big 5 Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {BIG_FIVE_WILDLIFE.map((animal) => {
          const isSelected = selectedAnimal.id === animal.id;
          return (
            <button
              key={animal.id}
              id={`wildlife-tab-${animal.id}`}
              onClick={() => setSelectedAnimal(animal)}
              aria-pressed={isSelected}
              className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-white text-black border-white'
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
            <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold uppercase tracking-wider">
              {selectedAnimal.status}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              {selectedAnimal.name}
            </h3>
            <p className="text-xs font-mono text-white/70 italic">
              {selectedAnimal.scientificName}
            </p>
          </div>
        </div>

        {/* Animal Intel Right */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          
          <div className="space-y-5">
            <p className="text-sm text-white/80 leading-relaxed font-normal">
              {selectedAnimal.description}
            </p>

            {/* Compact fact rows */}
            <dl className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <dt className="flex items-center gap-1.5 w-36 shrink-0 text-white/50 uppercase tracking-wider font-semibold">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Habitats</span>
                </dt>
                <dd className="text-white/85 leading-relaxed">{selectedAnimal.habitat}</dd>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <dt className="flex items-center gap-1.5 w-36 shrink-0 text-white/50 uppercase tracking-wider font-semibold">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Best seen</span>
                </dt>
                <dd className="text-white/85 leading-relaxed">{selectedAnimal.bestTime}</dd>
              </div>
            </dl>

            {/* Field note */}
            <p className="text-xs text-white/70 italic leading-relaxed">
              <span className="not-italic font-semibold text-white/85">Field note: </span>
              {selectedAnimal.funFact}
            </p>
          </div>

          {/* Bottom Wildlife Code of Ethics */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>All sightings keep a strict ethical distance.</span>
            <span className="text-white/90 font-semibold uppercase tracking-wider text-[10px]">Protected reserves only</span>
          </div>

        </div>

      </div>
    </section>
  );
};

