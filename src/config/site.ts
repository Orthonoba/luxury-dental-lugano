import type { ClinicConfig } from './clinic'

/**
 * SITE_CONFIG — the white-label instance configuration for Luxury Dental Paradiso.
 *
 * To deploy a new clinic: update this file with the clinic's data, then update
 * src/translations/*.json and follow the steps in WHITE_LABEL_GUIDE.md.
 */
export const SITE_CONFIG = {
  name: 'Luxury Dental',
  tagline: '& Facial Estética',
  fullName: 'Luxury Dental & Facial Estética',
  shortName: 'Luxury Dental Paradiso',
  description:
    'Premium dental and facial aesthetics clinic in Lugano, Switzerland. Digital Smile Design, Clear Aligners, Veneers, and advanced facial treatments delivered with Swiss precision and artistic excellence.',
  keywords:
    'luxury dental Lugano, digital smile design Switzerland, facial aesthetics Ticino, veneers Lugano, clear aligners Switzerland, teeth whitening Lugano, porcelain veneers, anti-aging, skin rejuvenation, Paradiso Lugano',
  url: 'https://www.luxurydental.ch',
  locale: 'en_US',
  contact: {
    phone: '091 994 50 51',
    phoneSecondary: '091 682 68 05',
    email: 'info@luxurydental.ch',
    whatsapp: 'https://wa.me/41919945051',
    address: {
      street: 'Via Riva Paradiso 4',
      city: 'Paradiso / Lugano',
      country: 'Switzerland',
      zip: '6900',
      full: 'Via Riva Paradiso 4, 6900 Paradiso / Lugano, Switzerland',
      coordinates: { lat: 45.9824, lng: 8.9424 },
    },
  },
  hours: [
    { day: 'Monday – Friday', time: '9:00 – 19:00' },
    { day: 'Saturday', time: '10:00 – 17:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  social: {
    instagram: '#',
    facebook: '#',
    tiktok: '#',
    youtube: '#',
  },
} as const satisfies ClinicConfig
