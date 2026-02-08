'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export type Locale = 'tr' | 'en'

interface I18nContextType {
  locale: Locale
  toggleLocale: () => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Biz Kimiz',
    'nav.how': 'Nasıl Yapıyoruz',
    'nav.what': 'Neler Yapıyoruz',
    'nav.contact': 'İletişim',
    'cta.getQuote': 'Teklif Al',
    'cta.talkProject': 'Projeni Konuşalım',
    'cta.ourServices': 'Hizmetlerimizi Gör',
    'cta.seeProcess': 'Tüm Süreci Gör',
    'cta.detail': 'Detay',
    'cta.send': 'Gönder',
    'cta.sending': 'Gönderiliyor...',
    'section.services': 'Hizmetlerimiz',
    'section.servicesSubtitle': 'Dijital dönüşümünüz için kapsamlı çözümler',
    'section.howWeDoIt': 'Nasıl Yapıyoruz',
    'section.howWeDoItSubtitle': 'Planlı ilerleriz. Hızlı üretiriz. Kaliteyi koruruz.',
    'section.whatWeDo': 'Neler Yapıyoruz',
    'section.whatWeDoSubtitle': 'Geniş hizmet yelpazemizle ihtiyaçlarınıza çözüm üretiyoruz',
    'section.references': 'Referanslarımız',
    'section.referencesSubtitle': 'Birlikte çalıştığımız değerli firmalar ve projeler',
    'section.whoWeAre': 'Biz Kimiz?',
    'section.contactInfo': 'İletişim Bilgileri',
    'section.socialMedia': 'Sosyal Medya',
    'hero.subtitle': '15 kişilik profesyonel ve genç dinamik ekibimizle yanınızdayız.',
    'hero.ctaIdea': 'Fikrini ürüne dönüştürelim.',
    'hero.ctaTeamReady': 'Fikrini ürüne dönüştürelim. 15 kişilik profesyonel ekibimiz hazır.',
    'footer.allRights': 'Tüm hakları saklıdır.',
    'footer.quickLinks': 'Hızlı Linkler',
    'footer.contact': 'İletişim',
    'footer.socialMedia': 'Sosyal Medya',
    'contact.title': 'Projeni konuşalım.',
    'contact.subtitle': 'Fikrinizi hayata geçirmek için bize ulaşın. Sen düşün, biz yapalım.',
    'contact.email': 'E-posta',
    'contact.phone': 'Telefon',
    'contact.whatsapp': 'WhatsApp',
    'contact.sendMessage': 'Mesaj Gönder',
    'form.name': 'Ad Soyad',
    'form.email': 'E-posta',
    'form.phone': 'Telefon',
    'form.projectType': 'Proje Türü',
    'form.message': 'Mesaj',
    'form.select': 'Seçiniz',
    'form.namePlaceholder': 'Adınız Soyadınız',
    'form.messagePlaceholder': 'Projeniz hakkında detaylı bilgi verin...',
    'form.success': 'Mesajınız başarıyla iletildi. En kısa sürede döneceğiz.',
    'form.webSite': 'Web Site',
    'form.mobileApp': 'Mobil Uygulama',
    'form.automation': 'Otomasyon',
    'form.design': 'UI/UX Tasarım',
    'form.consulting': 'Dijital Danışmanlık',
    'form.other': 'Diğer',
    'slogan': 'Sen Düşün, Biz Yapalım',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.how': 'How We Do It',
    'nav.what': 'What We Do',
    'nav.contact': 'Contact',
    'cta.getQuote': 'Get a Quote',
    'cta.talkProject': 'Let\'s Talk',
    'cta.ourServices': 'Our Services',
    'cta.seeProcess': 'See Full Process',
    'cta.detail': 'Details',
    'cta.send': 'Send',
    'cta.sending': 'Sending...',
    'section.services': 'Our Services',
    'section.servicesSubtitle': 'Comprehensive solutions for your digital transformation',
    'section.howWeDoIt': 'How We Do It',
    'section.howWeDoItSubtitle': 'We plan ahead. We deliver fast. We maintain quality.',
    'section.whatWeDo': 'What We Do',
    'section.whatWeDoSubtitle': 'Meeting your needs with our wide range of services',
    'section.references': 'Our References',
    'section.referencesSubtitle': 'Valuable companies and projects we work with',
    'section.whoWeAre': 'Who We Are?',
    'section.contactInfo': 'Contact Information',
    'section.socialMedia': 'Social Media',
    'hero.subtitle': 'We\'re here with our professional and young dynamic team of 15.',
    'hero.ctaIdea': 'Let\'s turn your idea into a product.',
    'hero.ctaTeamReady': 'Let\'s turn your idea into a product. Our team of 15 professionals is ready.',
    'footer.allRights': 'All rights reserved.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.socialMedia': 'Social Media',
    'contact.title': 'Let\'s talk about your project.',
    'contact.subtitle': 'Reach out to us to bring your idea to life.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.sendMessage': 'Send Message',
    'form.name': 'Full Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.projectType': 'Project Type',
    'form.message': 'Message',
    'form.select': 'Select',
    'form.namePlaceholder': 'Your Full Name',
    'form.messagePlaceholder': 'Give us detailed information about your project...',
    'form.success': 'Your message has been sent successfully. We\'ll get back to you soon.',
    'form.webSite': 'Website',
    'form.mobileApp': 'Mobile App',
    'form.automation': 'Automation',
    'form.design': 'UI/UX Design',
    'form.consulting': 'Digital Consulting',
    'form.other': 'Other',
    'slogan': 'You Dream, We Build',
  },
}

// Map nav hrefs to translation keys
export const navTranslationKeys: Record<string, string> = {
  '/': 'nav.home',
  '/biz-kimiz': 'nav.about',
  '/nasil-yapiyoruz': 'nav.how',
  '/neler-yapiyoruz': 'nav.what',
  '/iletisim': 'nav.contact',
}

const I18nContext = createContext<I18nContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('tr')

  const toggleLocale = useCallback(() => {
    setLocale(prev => prev === 'tr' ? 'en' : 'tr')
  }, [])

  const t = useCallback((key: string) => {
    return translations[locale][key] || key
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
