/**
 * ClinicConfig — the white-label configuration contract.
 *
 * Every instance of this platform (i.e., each clinic deployment) should have a
 * `src/config/site.ts` that satisfies this interface. Required fields cover what
 * every clinic needs; optional fields enable advanced capabilities when configured.
 *
 * HOW TO WHITE-LABEL:
 * 1. Clone the repo
 * 2. Update src/config/site.ts with the new clinic's data
 * 3. Update src/translations/*.json with clinic-specific copy
 * 4. Update Tailwind theme colors in src/app/globals.css if different branding
 * 5. See WHITE_LABEL_GUIDE.md for the full step-by-step
 */
export interface ClinicConfig {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: string
  tagline: string
  fullName: string
  shortName?: string
  description?: string
  keywords?: string
  url: string
  /** BCP 47 locale code e.g. 'en_US'. Used in OG metadata. */
  locale: string

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    phone: string
    phoneSecondary?: string
    email: string
    /** Full wa.me WhatsApp URL e.g. https://wa.me/41919945051 */
    whatsapp: string
    address: {
      street: string
      city: string
      country: string
      zip: string
      full?: string
      coordinates?: { lat: number; lng: number }
    }
  }

  // ── Hours ─────────────────────────────────────────────────────────────────
  hours: Array<{ day: string; time: string }>

  // ── Social ────────────────────────────────────────────────────────────────
  social: {
    instagram: string
    facebook: string
    tiktok?: string
    youtube?: string
    linkedin?: string
  }

  // ── Team (optional — rendered in TeamSection) ─────────────────────────────
  team?: Array<{
    name: string
    role: string
    title: string
    bio?: string
    avatarInitials?: string
  }>

  // ── Branding (optional — overrides Tailwind tokens at runtime) ────────────
  branding?: {
    /** hex / CSS color for primary CTA buttons. Default: olive (#6b7f3a) */
    primaryColor?: string
    /** hex / CSS color for accent/highlight. Default: gold (#C8A96B) */
    accentColor?: string
    /** Text shown as logo fallback when no image logo. */
    logoText?: string
  }

  // ── Feature flags (optional — hides sections when false) ─────────────────
  features?: {
    chat?: boolean           // AI chatbot widget (requires OPENAI_API_KEY)
    booking?: boolean        // Calendly embed
    blog?: boolean           // Sanity CMS blog
    beforeAfter?: boolean    // Before/after gallery
    multiLanguage?: boolean  // Language switcher
    facialAesthetics?: boolean
  }

  // ── SEO (optional — supplements layout.tsx metadata) ─────────────────────
  seo?: {
    defaultLocale?: string
    locales?: string[]
    schemaType?: 'Dentist' | 'MedicalBusiness'
    specialties?: string[]
    areaServed?: string[]
    aggregateRating?: { ratingValue: number; reviewCount: number }
  }
}
