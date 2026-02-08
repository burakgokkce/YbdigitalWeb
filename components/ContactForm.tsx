'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { contactInfo } from '@/lib/siteData'
import { useI18n } from '@/lib/i18n'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { t } = useI18n()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent(`YB Digital - Yeni Proje Talebi: ${formData.projectType}`)
    const body = encodeURIComponent(
      `Ad Soyad: ${formData.name}\n` +
      `E-posta: ${formData.email}\n` +
      `Telefon: ${formData.phone}\n` +
      `Proje Türü: ${formData.projectType}\n\n` +
      `Mesaj:\n${formData.message}`
    )

    window.location.href = `mailto:${contactInfo.formRecipient}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="glass rounded-xl p-8 space-y-6"
    >
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 glass border border-green-500/30 rounded-lg"
        >
          <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
          <p className="text-green-400 text-sm">{t('form.success')}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            placeholder={t('form.namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            placeholder="+90 5XX XXX XX XX"
          />
        </div>
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.projectType')} *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors bg-background"
          >
            <option value="">{t('form.select')}</option>
            <option value="Web Site">{t('form.webSite')}</option>
            <option value="Mobil Uygulama">{t('form.mobileApp')}</option>
            <option value="Otomasyon">{t('form.automation')}</option>
            <option value="UI/UX Tasarım">{t('form.design')}</option>
            <option value="Dijital Danışmanlık">{t('form.consulting')}</option>
            <option value="Diğer">{t('form.other')}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          {t('form.message')} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder={t('form.messagePlaceholder')}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:glow transition-all disabled:opacity-50 disabled:cursor-not-allowed shine"
      >
        {isSubmitting ? (
          t('cta.sending')
        ) : (
          <>
            {t('cta.send')}
            <Send size={20} />
          </>
        )}
      </motion.button>
    </motion.form>
  )
}
