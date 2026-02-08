'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function Card({ children, className = '', delay = 0, hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -8, scale: 1.02, rotateY: 2 } : {}}
      className={`glass-enhanced rounded-xl p-6 glow-hover transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}
