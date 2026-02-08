'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Linkedin, Instagram, User } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    instagram?: string
  }
}

interface TeamCardProps {
  member: TeamMember
  delay?: number
}

export default function TeamCard({ member, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, rotateY: 2 }}
      className="glass rounded-xl overflow-hidden glow-hover"
      style={{ perspective: '1000px' }}
    >
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary-dark/20 overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User size={64} className="text-gray-600" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-4">{member.role}</p>
        <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
        <div className="flex gap-3">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          {member.social.instagram && (
            <a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg text-gray-400 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
