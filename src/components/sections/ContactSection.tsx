'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

const selectClass =
  'w-full px-4 py-3.5 rounded-xl border border-beige bg-beige-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-luxury-black text-sm appearance-none cursor-pointer'

const selectLabelClass =
  'block text-[10px] tracking-[0.25em] uppercase text-luxury-black/40 font-semibold mb-2'

const hours = [
  { dayKey: 'weekdays', time: '9:00 – 19:00', closed: false },
  { dayKey: 'saturday', time: '10:00 – 17:00', closed: false },
  { dayKey: 'sunday', time: '', closed: true },
]

export default function ContactSection() {
  const t = useTranslations('contact')

  const serviceOptions = [
    { key: 'smileDesign', label: t('services.smileDesign') },
    { key: 'aligners', label: t('services.aligners') },
    { key: 'veneers', label: t('services.veneers') },
    { key: 'whitening', label: t('services.whitening') },
    { key: 'guards', label: t('services.guards') },
    { key: 'sleep', label: t('services.sleep') },
    { key: 'facial', label: t('services.facial') },
    { key: 'other', label: t('services.other') },
  ]

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            {t('eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-luxury-black leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            {t('headline1')}{' '}
            <span className="text-olive italic font-medium">{t('headline2')}</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C8A96B" strokeWidth={1.5} className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-luxury-black mb-3">
                  {t('successTitle')}
                </h3>
                <p className="text-luxury-black/50 max-w-sm">
                  {t('successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label={t('fullName')}
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder={t('namePlaceholder')}
                  />
                  <Input
                    label={t('emailAddress')}
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="info@esempio.com"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label={t('phoneNumber')}
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+41 91 994 50 51"
                  />
                  <div>
                    <label htmlFor="service" className={selectLabelClass}>
                      {t('serviceInterest')}
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={set('service')}
                      className={selectClass}
                    >
                      <option value="">{t('selectService')}</option>
                      {serviceOptions.map((s) => (
                        <option key={s.key} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Textarea
                  label={t('yourMessage')}
                  id="message"
                  value={form.message}
                  onChange={set('message')}
                  rows={5}
                  placeholder={t('messagePlaceholder')}
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-luxury-black text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-xl hover:bg-olive transition-all duration-400 hover:shadow-xl hover:shadow-olive/20"
                >
                  {t('sendMessage')}
                </button>

                <p className="text-luxury-black/30 text-xs text-center">
                  {t('privacy')}
                </p>
              </form>
            )}
          </motion.div>

          {/* Info — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Map placeholder */}
            <div
              className="w-full rounded-2xl overflow-hidden bg-linear-to-br from-olive/8 via-beige to-beige-light relative border border-beige"
              style={{ aspectRatio: '1.618 / 1' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C8A96B" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <p className="text-luxury-black font-semibold text-sm">Via Riva Paradiso 4</p>
                <p className="text-luxury-black/50 text-xs mt-1">6900 Paradiso / Lugano, Switzerland</p>
                <a
                  href="https://maps.google.com/?q=Via+Riva+Paradiso+4,+6900+Paradiso,+Lugano,+Switzerland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-olive text-[10px] tracking-[0.2em] uppercase font-semibold hover:underline"
                >
                  {t('getDirections')} →
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <div className="pb-6 border-b border-beige">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold mb-3">
                  {t('contactLabel')}
                </p>
                <div className="space-y-1">
                  <a
                    href="tel:0919945051"
                    className="block text-luxury-black font-medium text-sm hover:text-olive transition-colors"
                  >
                    091 994 50 51
                  </a>
                  <a
                    href="tel:0916826805"
                    className="block text-luxury-black/60 text-sm hover:text-olive transition-colors"
                  >
                    091 682 68 05
                  </a>
                  <a
                    href="mailto:info@luxurydental.ch"
                    className="block text-luxury-black/50 text-sm mt-2 hover:text-olive transition-colors"
                  >
                    info@luxurydental.ch
                  </a>
                </div>
              </div>

              <div className="pb-6 border-b border-beige">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold mb-3">
                  {t('openingHours')}
                </p>
                <div className="space-y-2">
                  {hours.map(({ dayKey, time, closed }) => (
                    <div key={dayKey} className="flex justify-between text-sm">
                      <span className="text-luxury-black/50">{t(dayKey as 'weekdays' | 'saturday' | 'sunday')}</span>
                      <span className={closed ? 'text-luxury-black/25' : 'text-luxury-black font-medium'}>
                        {closed ? t('closed') : time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/41919945051"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/8 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-luxury-black font-semibold text-sm group-hover:text-[#128C7E] transition-colors">
                    {t('chatWhatsApp')}
                  </p>
                  <p className="text-luxury-black/40 text-xs mt-0.5">{t('typicallyReplies')}</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
