'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/Section'
import { ExternalLink, CheckCircle2, Globe, Smartphone, Cog, Palette, Plus } from 'lucide-react'
import {
  useI18n,
  webProjectKeys,
  webExtraCount,
  mobileProjectKeys,
  automationProjectKeys,
  logoProjectKeys,
} from '@/lib/i18n'

type TabKey = 'web' | 'mobile' | 'automation' | 'logo'

const tabs: { key: TabKey; icon: React.ReactNode; i18nKey: string }[] = [
  { key: 'web', icon: <Globe className="w-4 h-4" />, i18nKey: 'projects.tab.web' },
  { key: 'mobile', icon: <Smartphone className="w-4 h-4" />, i18nKey: 'projects.tab.mobile' },
  { key: 'automation', icon: <Cog className="w-4 h-4" />, i18nKey: 'projects.tab.automation' },
  { key: 'logo', icon: <Palette className="w-4 h-4" />, i18nKey: 'projects.tab.logo' },
]

const projectsMap: Record<TabKey, { nameKey: string; typeKey: string; descKey: string; url: string | null }[]> = {
  web: webProjectKeys,
  mobile: mobileProjectKeys,
  automation: automationProjectKeys,
  logo: logoProjectKeys,
}

const totalCountMap: Record<TabKey, number> = {
  web: webProjectKeys.length + webExtraCount,
  mobile: mobileProjectKeys.length,
  automation: automationProjectKeys.length,
  logo: logoProjectKeys.length,
}

export default function Projelerimiz() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<TabKey>('web')
  const projects = projectsMap[activeTab]

  return (
    <div className="pt-20">
      <Section>
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {t('section.projects')}
          </h1>
          <p className="text-lg text-gray-400">
            {t('section.projectsSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 glass-enhanced rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{t(tab.i18nKey)}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-white/5'
                }`}>
                  {totalCountMap[tab.key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Proje Kartları */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {projects.map((project, index) => {
              const hasUrl = !!project.url

              return (
                <motion.div
                  key={project.nameKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  {hasUrl ? (
                    <a
                      href={project.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block h-full rounded-2xl overflow-hidden cursor-pointer"
                    >
                      <ProjectCardInner project={project} hasUrl={hasUrl} t={t} />
                    </a>
                  ) : (
                    <div className="relative block h-full rounded-2xl overflow-hidden">
                      <ProjectCardInner project={project} hasUrl={hasUrl} t={t} />
                    </div>
                  )}
                </motion.div>
              )
            })}

            {/* +15 Fazla Web Projesi Kartı */}
            {activeTab === 'web' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: projects.length * 0.06 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative block h-full rounded-2xl overflow-hidden">
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                  <div className="relative glass-enhanced rounded-2xl p-6 h-full flex flex-col items-center justify-center border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,212,255,0.2)] min-h-[240px]">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                      <Plus className="w-8 h-8 text-cyan-400" />
                    </div>
                    <span className="text-3xl font-heading font-bold text-white mb-2">+{webExtraCount}</span>
                    <p className="text-gray-400 text-sm text-center">
                      {t('projects.andMore').replace('{count}', String(webExtraCount))}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>
    </div>
  )
}

function ProjectCardInner({
  project,
  hasUrl,
  t,
}: {
  project: { nameKey: string; typeKey: string; descKey: string }
  hasUrl: boolean
  t: (key: string) => string
}) {
  return (
    <>
      {/* Gradient border glow on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-cyan-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

      {/* Card */}
      <div className="relative glass-enhanced rounded-2xl p-6 h-full flex flex-col border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,212,255,0.2)]">
        {/* Dekoratif glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/8 to-purple-500/8 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tür badge */}
        <div className="relative z-10 mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/5 text-cyan-300 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
            {t(project.typeKey)}
          </span>
        </div>

        {/* Proje Adı */}
        <h3 className="relative z-10 text-lg md:text-xl font-heading font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
          {t(project.nameKey)}
        </h3>

        {/* Açıklama */}
        <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-300 transition-colors">
          {t(project.descKey)}
        </p>

        {/* Alt buton */}
        <div className="relative z-10 mt-auto">
          {hasUrl ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 rounded-xl text-sm font-semibold border border-cyan-500/20 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 group-hover:border-cyan-500/40 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300">
              {t('projects.visitSite')}
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-xl text-sm font-semibold border border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('projects.completed')}
            </span>
          )}
        </div>
      </div>
    </>
  )
}
