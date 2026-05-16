'use client'

import { motion } from 'framer-motion'

const team = [
  {
    name: 'Dr. Sofia Reyes',
    role: 'Aesthetic Dentistry & DSD',
    initials: 'SR',
    bio: '15 years of experience in cosmetic and restorative dentistry. Certified Digital Smile Design specialist and master ceramist. Pioneer in full-mouth rehabilitation.',
    credentials: ['DSD Certified', 'AACD Member', 'Harvard Grad'],
    gradient: 'from-olive/15 via-olive/5 to-beige-light',
    accent: 'bg-olive',
  },
  {
    name: 'Dr. Marco Castellano',
    role: 'Orthodontics & Clear Aligners',
    initials: 'MC',
    bio: 'Specialist in orthodontic treatment with over 900 successful clear aligner cases. Diamond Invisalign provider with expertise in complex bite corrections.',
    credentials: ['Diamond Invisalign', 'Board Certified', 'MIT Research'],
    gradient: 'from-gold/15 via-gold/5 to-beige-light',
    accent: 'bg-gold',
  },
  {
    name: 'Dr. Elena Fontaine',
    role: 'Facial Aesthetics & Rejuvenation',
    initials: 'EF',
    bio: 'Medical aesthetician with expertise in facial harmonization, anti-aging protocols, and skin rejuvenation. Trained at leading European aesthetic medicine institutes.',
    credentials: ['ISPAN Certified', 'Allergan Trainer', 'Paris Institute'],
    gradient: 'from-luxury-black/8 via-luxury-black/4 to-beige-light',
    accent: 'bg-luxury-black',
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-32 bg-beige-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Our Specialists
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-luxury-black leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Meet The
            <span className="block text-olive italic font-medium">Expert Team</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-olive/8 transition-all duration-500"
            >
              {/* Portrait area */}
              <div className={`relative h-72 bg-gradient-to-br ${member.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Decorative rings */}
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-gold/10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-gold/10" />
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full border border-olive/10" />

                {/* Avatar */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
                    <span className="font-display text-3xl font-bold text-luxury-black/70">
                      {member.initials}
                    </span>
                  </div>
                  <div className={`w-8 h-1 rounded-full ${member.accent} opacity-40`} />
                </div>
              </div>

              {/* Info */}
              <div className="p-8">
                <h3 className="font-display font-bold text-luxury-black text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-luxury-black/50 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap gap-2">
                  {member.credentials.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] tracking-wide px-3 py-1 rounded-full bg-beige text-luxury-black/60 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
