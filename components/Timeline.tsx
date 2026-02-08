'use client'

import { motion } from 'framer-motion'
import IconRenderer from '@/components/IconRenderer'
import { useI18n, processI18nKeys } from '@/lib/i18n'

export default function Timeline() {
  const { t } = useI18n()

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-dark to-transparent hidden md:block" />

      <div className="space-y-12">
        {processI18nKeys.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start gap-6"
          >
            {/* Timeline Dot */}
            <div className="hidden md:block relative z-10">
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center glow">
                <IconRenderer name={step.icon} size={28} className="text-cyan-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 glass rounded-xl p-6 glow-hover">
              <div className="flex items-center gap-4 mb-2">
                <span className="md:hidden">
                  <IconRenderer name={step.icon} size={24} className="text-cyan-400" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{t(step.titleKey)}</h3>
                  <span className="text-sm text-primary">{t(step.durationKey)}</span>
                </div>
              </div>
              <p className="text-gray-400">{t(step.descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
