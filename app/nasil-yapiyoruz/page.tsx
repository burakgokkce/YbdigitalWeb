'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import Timeline from '@/components/Timeline'
import { useI18n } from '@/lib/i18n'

export default function NasilYapiyoruz() {
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
            {t('section.howWeDoIt')}
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            {t('section.howWeDoItSubtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Timeline />
        </div>
      </Section>
    </div>
  )
}
