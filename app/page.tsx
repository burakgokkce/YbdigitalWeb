'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Section from '@/components/Section'
import Card from '@/components/Card'
import MarqueeLogos from '@/components/MarqueeLogos'
import { ArrowRight, Globe2 } from 'lucide-react'
import IconRenderer from '@/components/IconRenderer'
import { useI18n, serviceI18nKeys, processI18nKeys, categoryI18nKeys } from '@/lib/i18n'

// 3D Hero - lazy load
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#070B1A]" />
  ),
})

// Kod bloğu - typewriter animasyonlu
function CodeTypingText() {
  const [displayedLines, setDisplayedLines] = useState<number>(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const { t } = useI18n()
  const serviceWords = ['Web Site', 'Mobil Uygulama', 'UI/UX Tasarim', 'n8n Otomasyon', 'Cloud & DevOps', 'Growth Marketing']
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [serviceText, setServiceText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedLines(prev => { if (prev >= 6) { clearInterval(timer); return prev }; return prev + 1 })
    }, 250)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const currentWord = serviceWords[currentServiceIndex]
    let timeout: NodeJS.Timeout
    if (!isDeleting) {
      if (serviceText.length < currentWord.length) {
        timeout = setTimeout(() => setServiceText(currentWord.slice(0, serviceText.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (serviceText.length > 0) {
        timeout = setTimeout(() => setServiceText(serviceText.slice(0, -1)), 40)
      } else {
        setIsDeleting(false)
        setCurrentServiceIndex((prev) => (prev + 1) % serviceWords.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [serviceText, isDeleting, currentServiceIndex])

  return (
    <div className="text-left max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden border border-white/10"
      >
        <div className="bg-[#0a0f1e]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 font-mono text-sm sm:text-base">
          {/* Window bar */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-auto text-[10px] text-gray-600">yb-digital.tsx</span>
          </div>
          <div className="space-y-1">
            {displayedLines >= 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-purple-400">const </span>
                <span className="text-cyan-300">ybDigital</span>
                <span className="text-white/80"> = {'{'}</span>
              </motion.div>
            )}
            {displayedLines >= 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                <span className="text-blue-300">name</span><span className="text-gray-500">: </span>
                <span className="text-green-400">&quot;YB Digital&quot;</span><span className="text-gray-600">,</span>
              </motion.div>
            )}
            {displayedLines >= 3 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                <span className="text-blue-300">slogan</span><span className="text-gray-500">: </span>
                <span className="text-green-400">&quot;{t('slogan')}&quot;</span><span className="text-gray-600">,</span>
              </motion.div>
            )}
            {displayedLines >= 4 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                <span className="text-blue-300">service</span><span className="text-gray-500">: </span>
                <span className="text-amber-300">&quot;{serviceText}</span>
                <span className={`text-cyan-400 font-bold ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
                <span className="text-amber-300">&quot;</span><span className="text-gray-600">,</span>
              </motion.div>
            )}
            {displayedLines >= 5 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pl-4">
                <span className="text-blue-300">team</span><span className="text-gray-500">: </span>
                <span className="text-orange-400">15</span><span className="text-gray-600">,</span>
              </motion.div>
            )}
            {displayedLines >= 6 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-white/80">{'}'}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>

        {/* Alt gradient — daha kısa, ahtapot daha çok gözüksün */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] z-[1] bg-gradient-to-t from-[#070B1A] via-[#070B1A]/50 to-transparent pointer-events-none" />

        {/* İçerik — daha aşağıda, ahtapotu kapatmasın */}
        <div className="relative z-10 w-full mt-auto pb-4 sm:pb-6 pointer-events-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-3 text-white"
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.7), 0 0 60px rgba(0,212,255,0.15)' }}
              >
                YB Digital
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-cyan-300 mb-2"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                {t('slogan')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="text-sm sm:text-base text-gray-300 mb-4 max-w-xl mx-auto"
                style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Kod bloğu */}
              <CodeTypingText />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center pointer-events-auto mt-5"
              >
                <Link
                  href="/iletisim"
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    {t('cta.talkProject')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/neler-yapiyoruz"
                  className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border border-white/20 hover:border-cyan-400/40 transition-all hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    {t('cta.ourServices')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="relative z-10 pb-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-9 border-2 border-cyan-500/40 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Hizmetler */}
      <Section title={t('section.services')} subtitle={t('section.servicesSubtitle')}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceI18nKeys.map((service, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <IconRenderer name={service.icon} size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t(service.titleKey)}</h3>
                <p className="text-gray-400 text-sm">{t(service.descKey)}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Nasıl Yapıyoruz */}
      <Section
        title={t('section.howWeDoIt')}
        subtitle={t('section.howWeDoItSubtitle')}
        className="bg-gradient-to-b from-transparent to-background/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {processI18nKeys.slice(0, 3).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-enhanced rounded-xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="mb-4">
                  <IconRenderer name={step.icon} size={40} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t(step.titleKey)}</h3>
                <p className="text-gray-400 text-sm">{t(step.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/nasil-yapiyoruz"
            className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/20 rounded-lg text-white hover:border-primary transition-all"
          >
            {t('cta.seeProcess')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </Section>

      {/* Neler Yapıyoruz */}
      <Section title={t('section.whatWeDo')} subtitle={t('section.whatWeDoSubtitle')}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryI18nKeys.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-enhanced rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-dark/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-2">{t(cat.titleKey)}</h3>
                <p className="text-sm text-primary mb-3">{t(cat.subtitleKey)}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{t(cat.descKey)}</p>
                <Link
                  href="/neler-yapiyoruz"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                >
                  {t('cta.detail')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Uluslararası Deneyim */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-enhanced rounded-2xl p-8 md:p-12 overflow-hidden border border-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="p-4 glass rounded-xl bg-cyan-500/10">
                <Globe2 size={36} className="text-cyan-400" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                {t('international.title')}
              </h3>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                {t('international.desc')}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col items-center gap-1.5 px-5 py-3 glass rounded-xl border border-white/5">
                <div className="w-8 h-5 rounded-sm overflow-hidden flex flex-col">
                  <div className="flex-1 bg-black" />
                  <div className="flex-1 bg-red-600" />
                  <div className="flex-1 bg-yellow-500" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Germany</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 px-5 py-3 glass rounded-xl border border-white/5">
                <div className="w-8 h-5 rounded-sm overflow-hidden flex flex-col">
                  <div className="flex-1 bg-red-600" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-blue-700" />
                </div>
                <span className="text-xs text-gray-400 font-medium">Netherlands</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Referanslar */}
      <MarqueeLogos />

      {/* CTA Band */}
      <Section className="bg-gradient-to-r from-primary/10 via-primary-dark/10 to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {t('hero.ctaIdea')}
          </h2>
          <p className="text-gray-400 mb-8">
            {t('hero.ctaTeamReady')}
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            {t('cta.getQuote')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </Section>
    </>
  )
}
