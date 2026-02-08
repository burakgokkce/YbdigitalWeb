'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Linkedin, Menu, X, Globe } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { navLinks, socialLinks, contactInfo } from '@/lib/siteData'
import { useI18n, navTranslationKeys } from '@/lib/i18n'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { locale, toggleLocale, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-enhanced py-3 shadow-lg backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="flex items-center gap-3 relative"
            >
              {/* Logo glow effect */}
              <div className="absolute -inset-2 bg-cyan-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  src="/images/yb-digital-logo.png"
                  alt="YB Digital Logo"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              <div className="relative flex flex-col">
                <span className="text-lg md:text-xl font-heading font-bold leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  YB Digital
                </span>
                <span className="text-[10px] md:text-[11px] text-cyan-400/60 font-medium tracking-[0.2em] uppercase leading-tight">
                  Software Agency
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t(navTranslationKeys[link.href] || '') || link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-dark"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Toggle + Social & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 glass border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-primary/50 transition-all"
              title={locale === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            >
              <Globe size={16} />
              <span className="uppercase">{locale === 'tr' ? 'EN' : 'TR'}</span>
            </button>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-green-400 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <Link
              href="/iletisim"
              className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/50 transition-all shine text-sm"
            >
              {t('cta.getQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-300'
                  }`}
                >
                  {t(navTranslationKeys[link.href] || '') || link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                {/* Mobile Language Toggle */}
                <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 px-3 py-2 glass border border-white/10 rounded-lg text-sm font-medium text-gray-300"
                >
                  <Globe size={16} />
                  <span className="uppercase">{locale === 'tr' ? 'EN' : 'TR'}</span>
                </button>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-green-400"
                >
                  <WhatsAppIcon size={20} />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary"
                >
                  <Linkedin size={20} />
                </a>
                <Link
                  href="/iletisim"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-auto px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium"
                >
                  {t('cta.getQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
