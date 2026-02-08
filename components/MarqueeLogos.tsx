'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { references } from '@/lib/siteData'
import { useI18n } from '@/lib/i18n'

export default function MarqueeLogos() {
  const items = [...references, ...references, ...references, ...references]
  const { t } = useI18n()

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              {t('section.references')}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t('section.referencesSubtitle')}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#070B1A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#070B1A] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 md:gap-16 animate-marquee hover:[animation-play-state:paused] w-fit">
          {items.map((ref, index) => (
            <motion.div
              key={`${ref.id}-${index}`}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex-shrink-0 glass-enhanced rounded-2xl px-10 py-8 md:px-16 md:py-12 flex items-center justify-center cursor-pointer group relative overflow-hidden"
              style={{ minWidth: '280px', minHeight: '160px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 40px rgba(0,212,255,0.1)' }} />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative w-40 h-24 md:w-56 md:h-32 flex items-center justify-center">
                  <Image
                    src={ref.logo}
                    alt={ref.name}
                    fill
                    className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    sizes="(max-width: 768px) 160px, 224px"
                  />
                </div>
                <span className="text-sm md:text-base text-gray-400 group-hover:text-gray-200 font-medium transition-colors">
                  {ref.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
