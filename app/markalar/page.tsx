'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Section from '@/components/Section'
import { brands } from '@/lib/siteData'
import { ArrowRight } from 'lucide-react'

export default function Markalar() {
  return (
    <div className="pt-20">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Markalar
          </h1>
          <p className="text-lg text-gray-400">
            Güvenilir partnerlikler.
          </p>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {brands.slice(0, 3).map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-8 flex items-center justify-center hover:glow transition-all"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">{brand.name}</div>
                <div className="text-sm text-gray-400">{brand.category}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-xl p-6 glow-hover relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-dark/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-4">
                  {brand.category}
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">{brand.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{brand.description}</p>
                <button className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
                  Detay
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  )
}
