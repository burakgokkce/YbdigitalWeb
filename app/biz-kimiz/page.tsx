'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import TeamCard from '@/components/TeamCard'
import { team, companyDescription } from '@/lib/siteData'
import { useI18n } from '@/lib/i18n'

export default function BizKimiz() {
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
            {t('section.whoWeAre')}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            {companyDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} delay={index * 0.2} />
          ))}
        </div>
      </Section>
    </div>
  )
}
