'use client'

import { useState } from 'react'
import { useForm, useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { facialBookingSchema, type FacialBookingInput, FACIAL_TREATMENTS } from '@/lib/validations/booking'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import DateTimePicker from './DateTimePicker'

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: LUXURY_EASE } },
}

const selectClass =
  'w-full px-4 py-3.5 rounded-xl border border-beige bg-beige-light focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-luxury-black text-sm appearance-none cursor-pointer'
const labelClass =
  'block text-[10px] tracking-[0.25em] uppercase font-semibold text-luxury-black/40 mb-2'
const sectionLabel =
  'text-[10px] tracking-[0.3em] uppercase text-gold font-semibold mb-5 block'

export default function FacialBookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FacialBookingInput>({
    resolver: zodResolver(facialBookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: undefined,
      notes: '',
      desiredDate: '',
      desiredTime: '',
      gdprConsent: undefined,
    },
  })

  const { field: gdprField } = useController({ name: 'gdprConsent', control })
  const desiredDate = watch('desiredDate')
  const desiredTime = watch('desiredTime')

  const onSubmit = async (data: FacialBookingInput) => {
    setServerError(null)
    try {
      const res = await fetch('/api/appointments/facial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? 'Error del servidor.')
      }
      setSubmitted(true)
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Error del servidor. Por favor inténtalo de nuevo.',
      )
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
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
        <h3 className="font-display text-2xl font-bold text-luxury-black mb-3">¡Solicitud recibida!</h3>
        <p className="text-luxury-black/50 max-w-sm text-sm leading-relaxed">
          Hemos recibido su solicitud de cita en Estética Facial. Le confirmaremos la disponibilidad en las
          próximas 24 horas por email.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* 01 — Personal info */}
      <motion.div variants={fadeUp}>
        <span className={sectionLabel}>01 — Información personal</span>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <Input label="Nombre" id="firstName" autoComplete="given-name"
            error={errors.firstName?.message} {...register('firstName')} />
          <Input label="Apellidos" id="lastName" autoComplete="family-name"
            error={errors.lastName?.message} {...register('lastName')} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Email" id="email" type="email" autoComplete="email"
            placeholder="correo@ejemplo.com"
            error={errors.email?.message} {...register('email')} />
          <Input label="Teléfono" id="phone" type="tel" autoComplete="tel"
            placeholder="+41 91 994 50 51"
            error={errors.phone?.message} {...register('phone')} />
        </div>
      </motion.div>

      {/* 02 — Treatment */}
      <motion.div variants={fadeUp}>
        <span className={sectionLabel}>02 — Tratamiento</span>
        <div className="mb-5">
          <label htmlFor="service" className={labelClass}>Tratamiento facial</label>
          <select
            id="service"
            className={`${selectClass} ${errors.service ? 'border-red-400' : ''}`}
            {...register('service')}
          >
            <option value="">Selecciona un tratamiento…</option>
            {FACIAL_TREATMENTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.service && <p className="text-[11px] text-red-500 mt-1.5">{errors.service.message}</p>}
        </div>
        <Textarea
          label="Notas adicionales (opcional)"
          id="notes"
          rows={4}
          placeholder="Cuéntanos sobre tus objetivos o cualquier información relevante…"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </motion.div>

      {/* 03 — Date & time */}
      <motion.div variants={fadeUp}>
        <span className={sectionLabel}>03 — Fecha y hora</span>
        <DateTimePicker
          type="facial"
          dateValue={desiredDate}
          timeValue={desiredTime}
          onDateChange={(d) => setValue('desiredDate', d, { shouldValidate: true })}
          onTimeChange={(t) => setValue('desiredTime', t, { shouldValidate: true })}
          dateError={errors.desiredDate?.message}
          timeError={errors.desiredTime?.message}
        />
      </motion.div>

      {/* 04 — GDPR */}
      <motion.div variants={fadeUp}>
        <span className={sectionLabel}>04 — Privacidad y consentimiento</span>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className="relative mt-0.5 shrink-0"
            onClick={() => gdprField.onChange(!gdprField.value)}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              gdprField.value
                ? 'bg-olive border-olive'
                : errors.gdprConsent
                  ? 'border-red-400'
                  : 'border-beige group-hover:border-olive'
            }`}>
              {gdprField.value && (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-luxury-black/60 leading-relaxed select-none">
            He leído y acepto la{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener" className="text-olive underline underline-offset-2">
              política de privacidad
            </a>
            . Consiento el tratamiento de mis datos personales para la gestión de mi cita médica
            de conformidad con el RGPD (art. 6.1.a).
          </span>
        </label>
        {errors.gdprConsent && (
          <p className="text-[11px] text-red-500 mt-2">{errors.gdprConsent.message}</p>
        )}
      </motion.div>

      {serverError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center bg-red-50 rounded-xl px-4 py-3 border border-red-100"
        >
          {serverError}
        </motion.p>
      )}

      <motion.div variants={fadeUp}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-xl hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
              Enviando solicitud…
            </>
          ) : (
            'Solicitar cita de estética'
          )}
        </button>
        <p className="text-luxury-black/30 text-xs text-center mt-4">
          Le confirmaremos la disponibilidad por email en las próximas 24 horas.
        </p>
      </motion.div>
    </motion.form>
  )
}
