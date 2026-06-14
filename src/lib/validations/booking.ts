import { z } from 'zod'

const personalInfo = z.object({
  firstName: z.string().min(2, 'Nombre: mínimo 2 caracteres').max(60),
  lastName:  z.string().min(2, 'Apellido: mínimo 2 caracteres').max(60),
  email:     z.string().email('Email no válido'),
  phone:     z.string()
               .min(7, 'Teléfono no válido')
               .max(30)
               .regex(/^[+\d\s\-().]+$/, 'Formato de teléfono no válido'),
})

const dateTime = z.object({
  desiredDate: z.string().min(1, 'Selecciona una fecha'),
  desiredTime: z.string().min(1, 'Selecciona un horario'),
})

const gdpr = z.object({
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la política de privacidad para continuar' }),
  }),
})

export const DENTAL_SPECIALTIES = [
  'Primera consulta',
  'Ortodoncia invisible',
  'Diseño de sonrisa',
  'Implantes dentales',
  'Prótesis fija',
  'Carillas dentales',
  'Blanqueamiento dental',
  'Endodoncia',
  'Periodoncia',
  'Cirugía oral',
] as const

export const FACIAL_TREATMENTS = [
  'Botox',
  'Ácido hialurónico',
  'Rejuvenecimiento facial',
  'Armonización facial',
  'Bruxismo terapéutico',
  'Perfilado mandibular',
  'Sonrisa gingival',
] as const

export const dentalBookingSchema = personalInfo.merge(dateTime).merge(gdpr).extend({
  dateOfBirth: z.string().optional(),
  service: z.enum(DENTAL_SPECIALTIES, {
    errorMap: () => ({ message: 'Selecciona una especialidad' }),
  }),
  notes: z.string().max(1000).optional(),
})

export type DentalBookingInput = z.infer<typeof dentalBookingSchema>

export const facialBookingSchema = personalInfo.merge(dateTime).merge(gdpr).extend({
  service: z.enum(FACIAL_TREATMENTS, {
    errorMap: () => ({ message: 'Selecciona un tratamiento' }),
  }),
  notes: z.string().max(1000).optional(),
})

export type FacialBookingInput = z.infer<typeof facialBookingSchema>

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  type: z.enum(['dental', 'facial']),
})
