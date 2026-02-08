'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { navLinks, socialLinks, contactInfo, companyDescription } from '@/lib/siteData'
import { useI18n, navTranslationKeys } from '@/lib/i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent via-[#070B1A]/90 to-[#070B1A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/yb-digital-logo.png"
                alt="YB Digital Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                YB Digital
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-2 font-medium">{t('slogan')}</p>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              {companyDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {t(navTranslationKeys[link.href] || '') || link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
            <div className="space-y-4 mb-6">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Mail size={16} className="flex-shrink-0" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Phone size={16} className="flex-shrink-0" />
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors"
              >
                <WhatsAppIcon size={16} className="flex-shrink-0" />
                WhatsApp
              </a>
            </div>

            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{t('footer.socialMedia')}</h4>
            <div className="flex space-x-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-lg text-gray-400 hover:text-primary hover:glow transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-lg text-gray-400 hover:text-primary hover:glow transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} YB Digital. {t('footer.allRights')}
          </p>
          <p className="text-xs text-gray-600">
            {t('slogan')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
