'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp, LUXURY_EASE } from '@/lib/animations'

const team = [
  {
    name: 'Dra. Andrea Calandrino',
    role: 'Medical Director & Surgeon',
    initials: 'AC',
    bio: 'Founder and Medical Director of Luxury Dental Paradiso. Expert in surgical and restorative dentistry, Digital Smile Design, and full-mouth rehabilitation with a holistic approach to oral health and beauty.',
    credentials: ['Medical Director', 'DSD Certified', 'Oral Surgeon'],
    gradient: 'from-olive/15 via-olive/5 to-beige-light',
    accent: 'bg-olive',
  },
  {
    name: 'Dr. Samperi Francesco',
    role: 'Specialist Dentist',
    initials: 'SF',
    bio: 'Specialist in conservative and prosthetic dentistry. Expert in porcelain veneers, clear aligner therapy, and precision restorations that combine function with aesthetic excellence.',
    credentials: ['Prosthodontics', 'Clear Aligners', 'Aesthetic Dentistry'],
    gradient: 'from-gold/15 via-gold/5 to-beige-light',
    accent: 'bg-gold',
  },
  {
    name: 'Gaspare Ingoglia',
    role: 'Administration',
    initials: 'GI',
    bio: 'Ensures that every patient journey is seamless, from the first consultation to aftercare. Dedicated to delivering a luxury experience at every touchpoint of your visit.',
    credentials: ['Patient Relations', 'Clinic Coordination', 'Swiss Quality'],
    gradient: 'from-luxury-black/8 via-luxury-black/4 to-beige-light',
    accent: 'bg-luxury-black',
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-32 bg-beige-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Our Specialists
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-luxury-black leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Meet The
            <span className="block text-olive italic font-medium">Expert Team</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: LUXURY_EASE }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-olive/10 cursor-default"
              style={{ willChange: 'transform' }}
            >
              {/* Portrait area */}
              <div className={`relative h-72 bg-linear-to-br ${member.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-gold/10 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-gold/10" />
                <div className="absolute top-6 left-6 w-16 h-16 rounded-full border border-olive/10" />

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-4"
                  >
                    <span className="font-display text-3xl font-bold text-luxury-black/70">
                      {member.initials}
                    </span>
                  </motion.div>
                  <div className={`w-8 h-1 rounded-full ${member.accent} opacity-40 group-hover:opacity-70 group-hover:w-12 transition-all duration-400`} />
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

                <div className="flex flex-wrap gap-2">
                  {member.credentials.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] tracking-wide px-3 py-1 rounded-full bg-beige group-hover:bg-beige-light text-luxury-black/60 font-medium transition-colors duration-300"
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
