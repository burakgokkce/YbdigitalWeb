'use client'

import { motion } from 'framer-motion'
import Section from '@/components/Section'
import { Instagram, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { socialLinks, contactInfo } from '@/lib/siteData'
import { useI18n } from '@/lib/i18n'

export default function Iletisim() {
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
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-400">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* WhatsApp - Ana CTA */}
          <motion.a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="block glass-enhanced rounded-2xl p-8 md:p-10 border border-green-500/20 hover:border-green-400/50 transition-all group relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-5 bg-green-500/15 rounded-2xl group-hover:bg-green-500/25 transition-colors">
                <WhatsAppIcon size={40} className="text-green-400" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  WhatsApp ile Hızlı İletişim
                </h2>
                <p className="text-gray-400 text-base md:text-lg">
                  Hemen yazın, anında dönüş yapalım. En hızlı iletişim yolu.
                </p>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold text-lg group-hover:bg-green-400 transition-colors shadow-lg shadow-green-500/25">
                Yazın
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.a>

          {/* İletişim Bilgileri Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telefon */}
            <motion.a
              href={`tel:${contactInfo.phoneRaw}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 flex items-center gap-4 group hover:border-primary/30 border border-transparent transition-all cursor-pointer"
            >
              <div className="p-3 glass rounded-lg group-hover:bg-primary/10 transition-colors">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{t('contact.phone')}</h3>
                <p className="text-gray-400 group-hover:text-primary transition-colors">{contactInfo.phone}</p>
              </div>
            </motion.a>

            {/* E-posta */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 flex items-center gap-4 group hover:border-primary/30 border border-transparent transition-all cursor-pointer"
            >
              <div className="p-3 glass rounded-lg group-hover:bg-primary/10 transition-colors">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{t('contact.email')}</h3>
                <p className="text-gray-400 group-hover:text-primary transition-colors">{contactInfo.email}</p>
              </div>
            </motion.a>
          </div>

          {/* Sosyal Medya */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-xl font-heading font-bold mb-6 text-white text-center">
              {t('section.socialMedia')}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 glass border border-white/10 rounded-xl hover:border-primary hover:glow transition-all group"
              >
                <Instagram className="text-primary group-hover:scale-110 transition-transform" size={24} />
                <span className="text-white font-medium">Instagram</span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 glass border border-white/10 rounded-xl hover:border-primary hover:glow transition-all group"
              >
                <Linkedin className="text-primary group-hover:scale-110 transition-transform" size={24} />
                <span className="text-white font-medium">LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
