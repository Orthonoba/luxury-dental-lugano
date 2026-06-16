'use client'

import { motion } from 'framer-motion'

const team = [
  {
    name: 'Dott. Calandrino Andrea',
    role: 'Odontoiatra — Direttrice Medica',
    initials: 'CA',
    bio: 'Fondatrice e Direttrice Medica di Luxury Dental Paradiso. La Dott.ssa Calandrino porta un approccio olistico, chirurgico e restaurativo a ogni caso — unendo la chirurgia orale avanzata al Digital Smile Design per realizzare trasformazioni complete e personalizzate. La sua filosofia è radicata nella convinzione che la maestria clinica e la visione artistica siano inscindibili.',
    credentials: ['Direttrice Medica', 'Chirurgia Orale e Maxillo-Facciale', 'Digital Smile Design Certificata'],
    accent: 'bg-olive',
    gradient: 'from-olive/15 via-olive/5 to-beige-light',
  },
  {
    name: 'Dott. Samper Francesco',
    role: 'Odontoiatra — Dentista Specialista',
    initials: 'SF',
    bio: 'Specialista in odontoiatria conservativa e protesica, il Dott. Samper porta una precisione meticolosa a ogni restauro. La sua esperienza spazia dalle faccette in porcellana alla terapia con allineatori fino alle complesse riabilitazioni complete della bocca. Convinto sostenitore dell\'odontoiatria a minima invasività — ottenere risultati massimi con la minima alterazione dei tessuti.',
    credentials: ['Specialista in Protesi', 'Odontoiatria Estetica', 'Allineatori Certificato'],
    accent: 'bg-gold',
    gradient: 'from-gold/15 via-gold/5 to-beige-light',
  },
  {
    name: 'Gaspare Ingoglia',
    role: 'Administrador — Gestión del Estudio',
    initials: 'GI',
    bio: 'El motor del funcionamiento diario de la clínica. Gaspare garantiza que la experiencia de cada paciente — desde la primera consulta hasta la última cita — sea impecable, cálida y digna del nombre Luxury Dental. Coordina la atención, gestiona la agenda y mantiene los estándares de servicio que definen nuestra clínica.',
    credentials: ['Relaciones con Pacientes', 'Operaciones de Clínica', 'Hospitalidad de Lujo'],
    accent: 'bg-luxury-black',
    gradient: 'from-luxury-black/8 via-luxury-black/4 to-beige-light',
  },
]

export default function TeamContent() {
  return (
    <>
      {/* Team cards */}
      <section className="py-32 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group grid lg:grid-cols-5 gap-0 bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-olive/8 transition-all duration-500"
              >
                {/* Portrait */}
                <div className={`lg:col-span-2 relative h-80 lg:h-auto bg-linear-to-br ${member.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-gold/8" />
                  <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full border border-olive/8" />

                  <div className="relative z-10 flex flex-col items-center">
                    {/* Portrait image placeholder */}
                    <div className="w-36 h-36 rounded-full bg-white shadow-xl flex items-center justify-center mb-4 overflow-hidden border-2 border-beige">
                      <span className="font-display text-4xl font-bold text-luxury-black/60">
                        {member.initials}
                      </span>
                    </div>
                    <div className={`w-10 h-1 rounded-full ${member.accent} opacity-30`} />
                    <p className="text-luxury-black/30 text-[9px] tracking-[0.2em] uppercase mt-3">Portrait Photo</p>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
                  <h2 className="font-display font-bold text-luxury-black text-3xl mb-2">{member.name}</h2>
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">{member.role}</p>
                  <p className="text-luxury-black/50 leading-relaxed mb-8">{member.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {member.credentials.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] tracking-wide px-3 py-1.5 rounded-full bg-beige text-luxury-black/60 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-luxury-black">
        <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent mb-24" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Ready to meet
            <span className="block text-gold italic font-medium">the team in person?</span>
          </motion.h2>
          <p className="text-white/40 mb-10">
            Book a complimentary consultation at our clinic in Paradiso, Lugano.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </div>
      </section>
    </>
  )
}
