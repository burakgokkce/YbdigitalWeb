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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {t('section.whatWeDo')}
          </h1>
          <p className="text-lg text-gray-400">
            {t('section.whatWeDoSubtitle')}
          </p>
        </motion.div>

        <div className="space-y-24">
          {categoryI18nKeys.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
                  {t(cat.titleKey)}
                </h2>
                <p className="text-primary font-medium mb-4">{t(cat.subtitleKey)}</p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {t(cat.descKey)}
                </p>
              </div>

              <div className={`grid grid-cols-1 gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {cat.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                    className="glass rounded-xl p-6 glow-hover"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-400 text-sm">{t(feature.descKey)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  )
}
