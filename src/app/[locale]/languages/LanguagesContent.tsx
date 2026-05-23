'use client'

import { motion } from 'framer-motion'
import { Link } from '@/navigation'

const languages = [
  {
    code: 'EN',
    name: 'English',
    native: 'English',
    flag: '🇬🇧',
    description: 'Full clinical consultations, treatment planning, and aftercare guidance available in English. Our team is fluent — not just conversational.',
  },
  {
    code: 'ES',
    name: 'Spanish',
    native: 'Español',
    flag: '🇪🇸',
    description: 'Atención completa en español — desde la consulta inicial hasta el seguimiento post-tratamiento. Servimos a pacientes de España y América Latina.',
  },
  {
    code: 'IT',
    name: 'Italian',
    native: 'Italiano',
    flag: '🇮🇹',
    description: 'Essendo situati a Lugano nel Ticino, l\'italiano è la nostra lingua di casa. Tutta la nostra équipe parla italiano fluentemente.',
  },
  {
    code: 'DE',
    name: 'German',
    native: 'Deutsch',
    flag: '🇩🇪',
    description: 'Vollständige Beratung und Behandlungsplanung auf Deutsch. Wir betreuen Patienten aus der Deutschschweiz, Deutschland und Österreich.',
  },
  {
    code: 'FR',
    name: 'French',
    native: 'Français',
    flag: '🇫🇷',
    description: 'Consultations et soins complets en français. Nous accueillons des patients de Suisse romande, de France et du monde francophone.',
  },
]

const countries = [
  'Switzerland', 'Italy', 'Spain', 'Germany', 'France', 'United Kingdom',
  'Argentina', 'Brazil', 'Mexico', 'Colombia', 'Austria', 'Netherlands',
]

export default function LanguagesContent() {
  return (
    <>
      {/* Language cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Five Languages, One Standard of Excellence
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-luxury-black"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              No language barrier.
              <span className="block text-olive italic font-medium">Ever.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-luxury-black/8 rounded-2xl p-8 hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <p className="font-display font-bold text-luxury-black text-lg leading-none">{lang.native}</p>
                    <p className="text-luxury-black/35 text-xs tracking-widest uppercase mt-0.5">{lang.name}</p>
                  </div>
                  <span className="ml-auto text-[10px] tracking-[0.3em] uppercase text-gold font-semibold border border-gold/30 rounded-full px-2.5 py-1">{lang.code}</span>
                </div>
                <p className="text-luxury-black/50 text-sm leading-relaxed">{lang.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries served */}
      <section className="py-24 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Patients From Around the World
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-white mb-12"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
          >
            We serve patients from
            <span className="block text-olive italic font-medium">across the globe</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, i) => (
              <motion.span
                key={country}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="px-4 py-2 bg-white/5 border border-white/8 rounded-full text-white/60 text-xs tracking-wide hover:border-gold/30 hover:text-white/80 transition-colors"
              >
                {country}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Link to International Patients */}
      <section className="py-24 bg-beige-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-luxury-black mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Planning a visit
            <span className="block text-olive italic font-medium">from abroad?</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10 leading-relaxed">
            Our International Patients page provides full guidance on travel to Lugano, accommodation,
            treatment planning across multiple days, and how to co-ordinate with your local dentist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/international-patients"
              className="inline-flex items-center px-8 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
            >
              International Patients
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 border border-luxury-black/20 text-luxury-black text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:border-luxury-black/40 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
