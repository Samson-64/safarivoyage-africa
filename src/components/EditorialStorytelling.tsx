import React from 'react';
import { EDITORIAL_STORIES } from '../data/africanData';
import { Quote, CheckCircle } from 'lucide-react';

export const EditorialStorytelling: React.FC = () => {
  return (
    <section id="stories-section" className="space-y-16 py-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
          Conservation, Community & Heritage
        </h2>
        <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
          Every journey booked through SafariVoyage directly sustains indigenous anti-poaching units, village educational foundations, and renewable clean water infrastructure.
        </p>
      </div>

      {/* Numbered Stories in Editorial Style */}
      <div className="space-y-20">
        {EDITORIAL_STORIES.map((story, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={story.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Text Editorial Column */}
              <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                
                {/* Number & Category Header */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tighter">
                    {story.number}
                  </span>
                  <div className="w-8 h-[1px] bg-white/30" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                    {story.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-xs text-white/70 uppercase tracking-wider">
                    {story.subtitle}
                  </p>
                </div>

                {/* Body Content */}
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                  {story.body}
                </p>

                {/* Quote Callout */}
                <div className="p-4 rounded-xl bg-[#181920] border-l-2 border-white space-y-1.5 shadow-md">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <p className="text-xs text-white italic leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>
                  <span className="block text-[10px] font-bold text-white/80 pl-6 uppercase tracking-wider">
                    — {story.author}
                  </span>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  {story.stats.map((st, i) => (
                    <div key={i}>
                      <span className="block font-mono text-base font-bold text-white">
                        {st.value}
                      </span>
                      <span className="text-[10px] text-white/70 uppercase tracking-wider block">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Imagery Editorial Column */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0d0e11] group shadow-xl">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-[#0d0e11]/40" />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white bg-[#14151a]/95 border border-white/15 p-3 rounded-full backdrop-blur-md shadow-lg">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-white/80">Certified Community Partner</span>
                    </div>
                    <span className="text-white font-bold font-mono text-[10px]">#AFRICA2026</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

