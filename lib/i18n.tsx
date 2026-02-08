'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react'

export type Locale = 'tr' | 'en'

interface I18nContextType {
  locale: Locale
  toggleLocale: () => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  tr: {
    // Nav
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Biz Kimiz',
    'nav.how': 'Nasıl Yapıyoruz',
    'nav.what': 'Neler Yapıyoruz',
    'nav.contact': 'İletişim',
    // CTA
    'cta.getQuote': 'Teklif Al',
    'cta.talkProject': 'Projeni Konuşalım',
    'cta.ourServices': 'Hizmetlerimizi Gör',
    'cta.seeProcess': 'Tüm Süreci Gör',
    'cta.detail': 'Detay',
    'cta.send': 'Gönder',
    'cta.sending': 'Gönderiliyor...',
    // Sections
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
    // Hero
    'hero.subtitle': '15 kişilik profesyonel ve genç dinamik ekibimizle yanınızdayız.',
    'hero.ctaIdea': 'Fikrini ürüne dönüştürelim.',
    'hero.ctaTeamReady': 'Fikrini ürüne dönüştürelim. 15 kişilik profesyonel ekibimiz hazır.',
    'slogan': 'Sen Düşün, Biz Yapalım',
    // Footer
    'footer.allRights': 'Tüm hakları saklıdır.',
    'footer.quickLinks': 'Hızlı Linkler',
    'footer.contact': 'İletişim',
    'footer.socialMedia': 'Sosyal Medya',
    // Contact Page
    'contact.title': 'Projeni konuşalım.',
    'contact.subtitle': 'Fikrinizi hayata geçirmek için bize ulaşın. Sen düşün, biz yapalım.',
    'contact.email': 'E-posta',
    'contact.phone': 'Telefon',
    'contact.whatsapp': 'WhatsApp',
    'contact.sendMessage': 'Mesaj Gönder',
    'contact.whatsappTitle': 'WhatsApp ile Hızlı İletişim',
    'contact.whatsappDesc': 'Hemen yazın, anında dönüş yapalım. En hızlı iletişim yolu.',
    'contact.whatsappBtn': 'Yazın',
    // Form
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
    // Services
    'service.web.title': 'Web',
    'service.web.desc': 'Modern, hızlı ve SEO uyumlu web siteleri',
    'service.mobile.title': 'Mobil',
    'service.mobile.desc': 'iOS ve Android uygulamaları',
    'service.automation.title': 'Otomasyon',
    'service.automation.desc': 'n8n ile iş akışı otomasyonları',
    'service.design.title': 'Tasarım',
    'service.design.desc': 'UI/UX tasarım ve prototipleme',
    // Process Steps
    'process.1.title': 'Brief & Hedef',
    'process.1.desc': 'Projenin hedeflerini ve gereksinimlerini belirliyoruz.',
    'process.1.duration': '1-2 gün',
    'process.2.title': 'UX Akış',
    'process.2.desc': 'Kullanıcı deneyimi haritasını çıkarıyoruz.',
    'process.2.duration': '2-3 gün',
    'process.3.title': 'UI Tasarım',
    'process.3.desc': 'Modern ve kullanıcı dostu arayüz tasarımları.',
    'process.3.duration': '1 hafta',
    'process.4.title': 'Geliştirme',
    'process.4.desc': 'Web ve mobil uygulamaları geliştiriyoruz.',
    'process.4.duration': '2-4 hafta',
    'process.5.title': 'Test & Optimizasyon',
    'process.5.desc': 'Kapsamlı testler ve performans optimizasyonu.',
    'process.5.duration': '3-5 gün',
    'process.6.title': 'Yayın & Bakım',
    'process.6.desc': 'Canlıya alma ve sürekli destek.',
    'process.6.duration': 'Sürekli',
    // Categories
    'cat.1.title': 'Web Siteleri',
    'cat.1.subtitle': 'Kurumsal / Landing / E-ticaret',
    'cat.1.desc': 'Modern teknolojilerle geliştirilmiş, hızlı ve SEO uyumlu web siteleri. Next.js, React ve performans odaklı mimari.',
    'cat.1.f1.title': 'Kurumsal Web',
    'cat.1.f1.desc': 'Profesyonel kurumsal kimlik',
    'cat.1.f2.title': 'Landing Pages',
    'cat.1.f2.desc': 'Yüksek dönüşüm oranları',
    'cat.1.f3.title': 'E-ticaret',
    'cat.1.f3.desc': 'Güvenli ödeme sistemleri',
    'cat.2.title': 'Mobil Uygulamalar',
    'cat.2.subtitle': 'iOS / Android / Cross-platform',
    'cat.2.desc': 'Native ve cross-platform mobil uygulamalar. React Native ve Flutter ile iOS ve Android desteği.',
    'cat.2.f1.title': 'iOS Uygulamaları',
    'cat.2.f1.desc': 'Swift ve Objective-C',
    'cat.2.f2.title': 'Android Uygulamaları',
    'cat.2.f2.desc': 'Kotlin ve Java',
    'cat.2.f3.title': 'Cross-platform',
    'cat.2.f3.desc': 'React Native / Flutter',
    'cat.3.title': 'UI/UX Tasarım',
    'cat.3.subtitle': 'Figma Prototipleme',
    'cat.3.desc': 'Kullanıcı odaklı tasarım süreçleri. Figma ile interaktif prototipler ve tasarım sistemleri.',
    'cat.3.f1.title': 'Wireframing',
    'cat.3.f1.desc': 'Yapısal taslaklar',
    'cat.3.f2.title': 'Prototipleme',
    'cat.3.f2.desc': 'İnteraktif mockuplar',
    'cat.3.f3.title': 'Design System',
    'cat.3.f3.desc': 'Tutarlı tasarım dili',
    'cat.4.title': 'Otomasyon',
    'cat.4.subtitle': 'n8n Entegrasyonlar',
    'cat.4.desc': 'İş süreçlerinizi otomatikleştirin. n8n ile API entegrasyonları ve workflow otomasyonları.',
    'cat.4.f1.title': 'API Entegrasyonları',
    'cat.4.f1.desc': 'Sistemler arası bağlantı',
    'cat.4.f2.title': 'Workflow',
    'cat.4.f2.desc': 'Otomatik iş akışları',
    'cat.4.f3.title': 'Veri Senkronizasyonu',
    'cat.4.f3.desc': 'Gerçek zamanlı veri akışı',
    'cat.5.title': 'İç Sistemler',
    'cat.5.subtitle': 'Panel / Admin / Dashboard',
    'cat.5.desc': 'Yönetim panelleri ve dashboard\'lar. Güvenli ve ölçeklenebilir iç sistemler.',
    'cat.5.f1.title': 'Admin Panelleri',
    'cat.5.f1.desc': 'Kapsamlı yönetim araçları',
    'cat.5.f2.title': 'Dashboard',
    'cat.5.f2.desc': 'Veri görselleştirme',
    'cat.5.f3.title': 'Raporlama',
    'cat.5.f3.desc': 'Detaylı analitik',
    'cat.6.title': 'Growth / Analytics',
    'cat.6.subtitle': 'Pixel / Event / Raporlama',
    'cat.6.desc': 'Büyüme stratejileri ve veri analitiği. Facebook Pixel, Google Analytics ve özel event takibi.',
    'cat.6.f1.title': 'Pixel Kurulumu',
    'cat.6.f1.desc': 'Facebook ve Google',
    'cat.6.f2.title': 'Event Tracking',
    'cat.6.f2.desc': 'Özel event takibi',
    'cat.6.f3.title': 'Raporlama',
    'cat.6.f3.desc': 'Detaylı analiz raporları',
    // Team
    'team.burak.role': 'Kurucu / Founder',
    'team.burak.bio': 'Burak Gökçe, YB Digital\'in kurucusu ve iOS mobil uygulama geliştiricisidir. Yaklaşık 6–7 yıldır yazılım sektöründe profesyonel projeler üretmekte; mobil uygulama, web sistemleri ve dijital platformlar alanında uzmanlaşmaktadır. Bugün 15 kişilik ekibiyle birlikte yenilikçi ve ölçeklenebilir yazılım çözümleri geliştirmektedir.',
    'team.tolga.role': 'CEO',
    'team.tolga.bio': 'Tolga Bıyık, YB Digital\'in CEO\'su olup yaklaşık 5 yıldır yazılım sektöründe aktif olarak görev almaktadır. Veri bilimi ve yapay zekâ geliştirme alanlarında uzmanlaşmış; şirketin teknoloji vizyonunu yönlendiren, yenilikçi ve sürdürülebilir dijital çözümler üretilmesine liderlik etmektedir.',
    // Company
    'company.description': 'YB Digital olarak dijital dünyada fark yaratan projeler geliştiriyor ve şirketlere yenilikçi çözümler sunuyoruz. 15 kişilik profesyonel ve genç dinamik ekibimizle web sitesi, mobil uygulama, UI/UX tasarım, sosyal medya yönetimi, grafik & video tasarım ve dijital danışmanlık alanlarında yanınızdayız.',
    // International
    'international.badge': 'Almanya ve Hollanda\'dan firmalarla çalıştık',
    'international.title': 'Uluslararası Deneyim',
    'international.desc': 'Almanya ve Hollanda başta olmak üzere Avrupa\'daki firmalarla başarılı projeler gerçekleştirdik. Uluslararası standartlarda hizmet sunuyoruz.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.how': 'How We Do It',
    'nav.what': 'What We Do',
    'nav.contact': 'Contact',
    // CTA
    'cta.getQuote': 'Get a Quote',
    'cta.talkProject': 'Let\'s Talk',
    'cta.ourServices': 'Our Services',
    'cta.seeProcess': 'See Full Process',
    'cta.detail': 'Details',
    'cta.send': 'Send',
    'cta.sending': 'Sending...',
    // Sections
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
    // Hero
    'hero.subtitle': 'We\'re here with our professional and dynamic team of 15.',
    'hero.ctaIdea': 'Let\'s turn your idea into a product.',
    'hero.ctaTeamReady': 'Let\'s turn your idea into a product. Our team of 15 professionals is ready.',
    'slogan': 'You Dream, We Build',
    // Footer
    'footer.allRights': 'All rights reserved.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.socialMedia': 'Social Media',
    // Contact Page
    'contact.title': 'Let\'s talk about your project.',
    'contact.subtitle': 'Reach out to us to bring your idea to life.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.sendMessage': 'Send Message',
    'contact.whatsappTitle': 'Quick Contact via WhatsApp',
    'contact.whatsappDesc': 'Write us now, we\'ll respond instantly. The fastest way to communicate.',
    'contact.whatsappBtn': 'Write Us',
    // Form
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
    // Services
    'service.web.title': 'Web',
    'service.web.desc': 'Modern, fast and SEO-friendly websites',
    'service.mobile.title': 'Mobile',
    'service.mobile.desc': 'iOS and Android applications',
    'service.automation.title': 'Automation',
    'service.automation.desc': 'Workflow automation with n8n',
    'service.design.title': 'Design',
    'service.design.desc': 'UI/UX design and prototyping',
    // Process Steps
    'process.1.title': 'Brief & Goals',
    'process.1.desc': 'We define the project goals and requirements.',
    'process.1.duration': '1-2 days',
    'process.2.title': 'UX Flow',
    'process.2.desc': 'We map out the user experience journey.',
    'process.2.duration': '2-3 days',
    'process.3.title': 'UI Design',
    'process.3.desc': 'Modern and user-friendly interface designs.',
    'process.3.duration': '1 week',
    'process.4.title': 'Development',
    'process.4.desc': 'We develop web and mobile applications.',
    'process.4.duration': '2-4 weeks',
    'process.5.title': 'Test & Optimization',
    'process.5.desc': 'Comprehensive testing and performance optimization.',
    'process.5.duration': '3-5 days',
    'process.6.title': 'Launch & Maintenance',
    'process.6.desc': 'Going live and continuous support.',
    'process.6.duration': 'Ongoing',
    // Categories
    'cat.1.title': 'Websites',
    'cat.1.subtitle': 'Corporate / Landing / E-commerce',
    'cat.1.desc': 'Fast and SEO-friendly websites built with modern technologies. Next.js, React and performance-focused architecture.',
    'cat.1.f1.title': 'Corporate Web',
    'cat.1.f1.desc': 'Professional corporate identity',
    'cat.1.f2.title': 'Landing Pages',
    'cat.1.f2.desc': 'High conversion rates',
    'cat.1.f3.title': 'E-commerce',
    'cat.1.f3.desc': 'Secure payment systems',
    'cat.2.title': 'Mobile Apps',
    'cat.2.subtitle': 'iOS / Android / Cross-platform',
    'cat.2.desc': 'Native and cross-platform mobile apps. iOS and Android support with React Native and Flutter.',
    'cat.2.f1.title': 'iOS Apps',
    'cat.2.f1.desc': 'Swift and Objective-C',
    'cat.2.f2.title': 'Android Apps',
    'cat.2.f2.desc': 'Kotlin and Java',
    'cat.2.f3.title': 'Cross-platform',
    'cat.2.f3.desc': 'React Native / Flutter',
    'cat.3.title': 'UI/UX Design',
    'cat.3.subtitle': 'Figma Prototyping',
    'cat.3.desc': 'User-centered design processes. Interactive prototypes and design systems with Figma.',
    'cat.3.f1.title': 'Wireframing',
    'cat.3.f1.desc': 'Structural drafts',
    'cat.3.f2.title': 'Prototyping',
    'cat.3.f2.desc': 'Interactive mockups',
    'cat.3.f3.title': 'Design System',
    'cat.3.f3.desc': 'Consistent design language',
    'cat.4.title': 'Automation',
    'cat.4.subtitle': 'n8n Integrations',
    'cat.4.desc': 'Automate your business processes. API integrations and workflow automations with n8n.',
    'cat.4.f1.title': 'API Integrations',
    'cat.4.f1.desc': 'Cross-system connections',
    'cat.4.f2.title': 'Workflow',
    'cat.4.f2.desc': 'Automated workflows',
    'cat.4.f3.title': 'Data Sync',
    'cat.4.f3.desc': 'Real-time data flow',
    'cat.5.title': 'Internal Systems',
    'cat.5.subtitle': 'Panel / Admin / Dashboard',
    'cat.5.desc': 'Management panels and dashboards. Secure and scalable internal systems.',
    'cat.5.f1.title': 'Admin Panels',
    'cat.5.f1.desc': 'Comprehensive management tools',
    'cat.5.f2.title': 'Dashboard',
    'cat.5.f2.desc': 'Data visualization',
    'cat.5.f3.title': 'Reporting',
    'cat.5.f3.desc': 'Detailed analytics',
    'cat.6.title': 'Growth / Analytics',
    'cat.6.subtitle': 'Pixel / Event / Reporting',
    'cat.6.desc': 'Growth strategies and data analytics. Facebook Pixel, Google Analytics and custom event tracking.',
    'cat.6.f1.title': 'Pixel Setup',
    'cat.6.f1.desc': 'Facebook and Google',
    'cat.6.f2.title': 'Event Tracking',
    'cat.6.f2.desc': 'Custom event tracking',
    'cat.6.f3.title': 'Reporting',
    'cat.6.f3.desc': 'Detailed analysis reports',
    // Team
    'team.burak.role': 'Founder',
    'team.burak.bio': 'Burak Gökçe is the founder of YB Digital and an iOS mobile app developer. He has been creating professional projects in the software industry for approximately 6-7 years, specializing in mobile applications, web systems and digital platforms. Today, he develops innovative and scalable software solutions with his team of 15.',
    'team.tolga.role': 'CEO',
    'team.tolga.bio': 'Tolga Bıyık is the CEO of YB Digital and has been actively working in the software industry for about 5 years. Specialized in data science and artificial intelligence development, he leads the company\'s technology vision and the creation of innovative and sustainable digital solutions.',
    // Company
    'company.description': 'At YB Digital, we develop projects that make a difference in the digital world and offer innovative solutions to companies. We are by your side with our professional and young dynamic team of 15 in the fields of website, mobile application, UI/UX design, social media management, graphic & video design and digital consulting.',
    // International
    'international.badge': 'We\'ve worked with companies from Germany and the Netherlands',
    'international.title': 'International Experience',
    'international.desc': 'We have successfully completed projects with companies in Europe, particularly in Germany and the Netherlands. We provide services at international standards.',
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

// Service i18n keys mapping
export const serviceI18nKeys = [
  { titleKey: 'service.web.title', descKey: 'service.web.desc', icon: 'globe' },
  { titleKey: 'service.mobile.title', descKey: 'service.mobile.desc', icon: 'smartphone' },
  { titleKey: 'service.automation.title', descKey: 'service.automation.desc', icon: 'cog' },
  { titleKey: 'service.design.title', descKey: 'service.design.desc', icon: 'palette' },
]

// Process steps i18n keys
export const processI18nKeys = [
  { titleKey: 'process.1.title', descKey: 'process.1.desc', durationKey: 'process.1.duration', icon: 'clipboard' },
  { titleKey: 'process.2.title', descKey: 'process.2.desc', durationKey: 'process.2.duration', icon: 'map' },
  { titleKey: 'process.3.title', descKey: 'process.3.desc', durationKey: 'process.3.duration', icon: 'sparkles' },
  { titleKey: 'process.4.title', descKey: 'process.4.desc', durationKey: 'process.4.duration', icon: 'code' },
  { titleKey: 'process.5.title', descKey: 'process.5.desc', durationKey: 'process.5.duration', icon: 'search' },
  { titleKey: 'process.6.title', descKey: 'process.6.desc', durationKey: 'process.6.duration', icon: 'rocket' },
]

// Category i18n keys
export const categoryI18nKeys = [
  {
    titleKey: 'cat.1.title', subtitleKey: 'cat.1.subtitle', descKey: 'cat.1.desc',
    features: [
      { titleKey: 'cat.1.f1.title', descKey: 'cat.1.f1.desc' },
      { titleKey: 'cat.1.f2.title', descKey: 'cat.1.f2.desc' },
      { titleKey: 'cat.1.f3.title', descKey: 'cat.1.f3.desc' },
    ],
  },
  {
    titleKey: 'cat.2.title', subtitleKey: 'cat.2.subtitle', descKey: 'cat.2.desc',
    features: [
      { titleKey: 'cat.2.f1.title', descKey: 'cat.2.f1.desc' },
      { titleKey: 'cat.2.f2.title', descKey: 'cat.2.f2.desc' },
      { titleKey: 'cat.2.f3.title', descKey: 'cat.2.f3.desc' },
    ],
  },
  {
    titleKey: 'cat.3.title', subtitleKey: 'cat.3.subtitle', descKey: 'cat.3.desc',
    features: [
      { titleKey: 'cat.3.f1.title', descKey: 'cat.3.f1.desc' },
      { titleKey: 'cat.3.f2.title', descKey: 'cat.3.f2.desc' },
      { titleKey: 'cat.3.f3.title', descKey: 'cat.3.f3.desc' },
    ],
  },
  {
    titleKey: 'cat.4.title', subtitleKey: 'cat.4.subtitle', descKey: 'cat.4.desc',
    features: [
      { titleKey: 'cat.4.f1.title', descKey: 'cat.4.f1.desc' },
      { titleKey: 'cat.4.f2.title', descKey: 'cat.4.f2.desc' },
      { titleKey: 'cat.4.f3.title', descKey: 'cat.4.f3.desc' },
    ],
  },
  {
    titleKey: 'cat.5.title', subtitleKey: 'cat.5.subtitle', descKey: 'cat.5.desc',
    features: [
      { titleKey: 'cat.5.f1.title', descKey: 'cat.5.f1.desc' },
      { titleKey: 'cat.5.f2.title', descKey: 'cat.5.f2.desc' },
      { titleKey: 'cat.5.f3.title', descKey: 'cat.5.f3.desc' },
    ],
  },
  {
    titleKey: 'cat.6.title', subtitleKey: 'cat.6.subtitle', descKey: 'cat.6.desc',
    features: [
      { titleKey: 'cat.6.f1.title', descKey: 'cat.6.f1.desc' },
      { titleKey: 'cat.6.f2.title', descKey: 'cat.6.f2.desc' },
      { titleKey: 'cat.6.f3.title', descKey: 'cat.6.f3.desc' },
    ],
  },
]

// Team i18n keys
export const teamI18nKeys = [
  { name: 'Burak Gökçe', roleKey: 'team.burak.role', bioKey: 'team.burak.bio', image: '/images/burak-gokce.jpg', social: { linkedin: 'https://www.linkedin.com/in/burak-gokcee/', instagram: 'https://www.instagram.com/burakgokkce/' } },
  { name: 'Tolga Bıyık', roleKey: 'team.tolga.role', bioKey: 'team.tolga.bio', image: '/images/tolga-biyik.jpg', social: { linkedin: 'https://www.linkedin.com/in/tolga-b%C4%B1y%C4%B1k-468a89225/', instagram: 'https://www.instagram.com/tolgapytech/' } },
]

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
