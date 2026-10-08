import React from 'react';
import { motion } from 'motion/react';
import { EDITORIAL_STORIES } from '../data/africanData';

export const EditorialStorytelling: React.FC = () => {
  const [lead, ...rest] = EDITORIAL_STORIES;

  return (
    <section id="stories-section" className="space-y-10 py-12">
      {/* Section Header */}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">
        Conservation, community &amp; heritage
      </h2>

      {/* Lead story: full-bleed image band with the quote */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[480px] sm:min-h-[540px] flex items-end"
      >
        <img
          src={lead.image}
          alt={lead.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/85 to-[#0d0e11]/25" />

        <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-4">
          <span className="text-xs font-semibold text-[#c4a57b]">{lead.category}</span>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-white">
            {lead.title}
          </h3>

          <p className="text-sm text-white/80 leading-relaxed">{lead.body}</p>

          <blockquote className="border-l-2 border-[#c4a57b] pl-4 space-y-1.5">
            <p className="font-serif italic text-white leading-relaxed">
              &ldquo;{lead.quote}&rdquo;
            </p>
            <footer className="text-xs text-white/60">{lead.author}</footer>
          </blockquote>

          <dl className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
            {lead.stats.map((st) => (
              <div key={st.label}>
                <dt className="sr-only">{st.label}</dt>
                <dd className="font-serif text-base font-semibold text-white tabular-nums">
                  {st.value}
                </dd>
                <span className="text-[10px] text-white/55 block leading-snug">
                  {st.label}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </motion.article>

      {/* Two compact editorial columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rest.map((story, i) => (
          <motion.article
            key={story.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src={story.image}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-[#0d0e11]/25" />
            </div>

            <span className="block text-xs font-semibold text-[#c4a57b]">{story.category}</span>

            <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug text-white">
              {story.title}
            </h3>

            <p className="text-sm text-white/75 leading-relaxed">{story.body}</p>

            <blockquote className="border-l-2 border-[#c4a57b] pl-4 space-y-1.5">
              <p className="font-serif italic text-sm text-white leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>
              <footer className="text-xs text-white/60">{story.author}</footer>
            </blockquote>

            <dl className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
              {story.stats.map((st) => (
                <div key={st.label}>
                  <dt className="sr-only">{st.label}</dt>
                  <dd className="font-serif text-sm font-semibold text-white tabular-nums">
                    {st.value}
                  </dd>
                  <span className="text-[10px] text-white/55 block leading-snug">
                    {st.label}
                  </span>
                </div>
              ))}
            </dl>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
