'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import TeamCard from '@/components/TeamCard'
import { useI18n, teamI18nKeys } from '@/lib/i18n'

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
            {t('company.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamI18nKeys.map((member, index) => (
            <TeamCard
              key={index}
              member={{
                id: index + 1,
                name: member.name,
                role: t(member.roleKey),
                bio: t(member.bioKey),
                image: member.image,
                social: member.social,
              }}
              delay={index * 0.2}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}
