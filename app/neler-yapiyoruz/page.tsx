'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import { useI18n, categoryI18nKeys } from '@/lib/i18n'

export default function NelerYapiyoruz() {
  const { t } = useI18n()

  return (
    <div className="pt-20">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {t('section.whatWeDo')}
          </h1>
          <p className="text-lg text-gray-400">
            {t('section.whatWeDoSubtitle')}
          </p>
        </motion.div>

        <div className="space-y-28">
          {categoryI18nKeys.map((cat, index) => {
            const isReversed = index % 2 === 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Metin Kısmı */}
                <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="inline-block text-sm font-semibold text-cyan-400 mb-3 tracking-wider uppercase">
                      0{index + 1}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-white">
                      {t(cat.titleKey)}
                    </h2>
                    <p className="text-primary font-medium mb-4">{t(cat.subtitleKey)}</p>
                    <p className="text-gray-400 leading-relaxed text-base">
                      {t(cat.descKey)}
                    </p>
                  </motion.div>
                </div>

                {/* Feature Kartları */}
                <div className={`grid grid-cols-1 gap-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  {cat.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + featureIndex * 0.1 }}
                      className="glass rounded-xl p-6 glow-hover border border-white/5 hover:border-cyan-500/20 transition-all"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-gray-400 text-sm">{t(feature.descKey)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Section>
    </div>
  )
}
