import React from 'react';

const STATS = [
  { value: '15', label: 'Years in the field' },
  { value: '185', label: 'Protected routes' },
  { value: '110', label: 'Certified local guides' },
  { value: '5+', label: 'UNESCO parks' },
];

export const StatsStrip: React.FC = () => {
  return (
    <section
      aria-label="SafariVoyage by the numbers"
      className="border-y border-white/10 bg-[#0d0e11]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-white tabular-nums">
              {stat.value}
            </span>
            <span className="text-xs text-white/60 leading-snug">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
