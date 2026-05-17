import { SITE_CONFIG } from '@/config/site'

const clinicLinks = [
  { label: 'About', href: '/about' },
  { label: 'Philosophy', href: '/about#philosophy' },
  { label: 'Technology', href: '/dental#technology' },
  { label: 'Team', href: '/team' },
]

const treatmentLinks = [
  { label: 'Smile Design', href: '/dental' },
  { label: 'Porcelain Veneers', href: '/dental' },
  { label: 'Clear Aligners', href: '/dental' },
  { label: 'Sleep Dentistry', href: '/dental' },
  { label: 'Facial Aesthetics', href: '/facial-aesthetics' },
]

const socialLinks = [
  { label: 'Instagram', href: SITE_CONFIG.social.instagram, abbr: 'IG' },
  { label: 'Facebook', href: SITE_CONFIG.social.facebook, abbr: 'FB' },
  { label: 'LinkedIn', href: '#', abbr: 'LI' },
  { label: 'Google Reviews', href: '#', abbr: 'G★' },
]

const servicePills = [
  'Luxury Dentistry in Lugano',
  'Digital Smile Design',
  'Facial Aesthetics',
  'Swiss Premium Care',
]

export default function Footer() {
  return (
    <footer className="bg-luxury-black">
      {/* Decorative top separator */}
      <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      {/* ═══════════════════════════════════════════════
          SECTION A — Cinematic CTA Block
      ═══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,169,107,0.08),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Service pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {servicePills.map((pill) => (
              <span
                key={pill}
                className="px-4 py-1.5 border border-gold/25 text-gold text-[9px] tracking-[0.35em] uppercase font-medium rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h2
            className="font-display font-bold text-white leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Your Perfect Smile
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 60%, #C8A96B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Begins in Lugano
            </span>
          </h2>

          <p className="text-white/40 text-base leading-relaxed max-w-xl mx-auto mb-12">
            Luxury dental and facial aesthetics with Swiss precision. International patients welcome.
            Spanish-speaking assistance available.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-2xl hover:shadow-olive/30 hover:-translate-y-0.5"
            >
              Book Consultation
            </a>
            <a
              href={SITE_CONFIG.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white/70 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/6 hover:border-white/30 hover:text-white transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/10 text-white/45 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/4 hover:border-white/20 hover:text-white/65 transition-all duration-300"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call the Clinic
            </a>
          </div>
        </div>

        {/* Gold line separator */}
        <div className="h-px bg-linear-to-r from-transparent via-gold/15 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION B — 4-column footer grid
      ═══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 — Clinic */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-white text-sm">LD</span>
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm tracking-wide leading-none">
                  {SITE_CONFIG.name}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-white/40 mt-0.5">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-7">
              Where Swiss precision meets natural beauty.
            </p>

            <h4 className="text-white/50 font-semibold text-[10px] tracking-[0.25em] uppercase mb-4">
              Clinic
            </h4>
            <ul className="space-y-2.5">
              {clinicLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/30 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Treatments */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Treatments
            </h4>
            <ul className="space-y-2.5">
              {treatmentLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/30 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-medium mb-1.5">
                  Address
                </p>
                <p className="text-white/45 leading-relaxed">
                  {SITE_CONFIG.contact.address.street}
                  <br />
                  {SITE_CONFIG.contact.address.zip} {SITE_CONFIG.contact.address.city}
                  <br />
                  {SITE_CONFIG.contact.address.country}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-medium mb-1.5">
                  Phone
                </p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                  className="block text-white/45 hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s/g, '')}`}
                  className="block text-white/30 text-xs mt-0.5 hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.contact.phoneSecondary}
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase font-medium mb-1.5">
                  Email
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-white/40 text-xs hover:text-gold transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="pt-2 border-t border-white/6">
                <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-medium mb-1.5">
                  Hours
                </p>
                <p className="text-white/25 text-xs leading-relaxed">
                  Mon–Fri: 9:00 – 19:00
                  <br />
                  Sat: 10:00 – 17:00
                </p>
              </div>
            </div>
          </div>

          {/* Column 4 — Social & Reviews */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Social & Reviews
            </h4>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {socialLinks.map(({ label, href, abbr }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/8 text-white/30 hover:border-gold/40 hover:text-gold transition-all duration-300 group"
                >
                  <span className="text-[10px] font-bold tracking-wide">{abbr}</span>
                  <span className="text-[10px] text-white/20 group-hover:text-gold/60 transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            {/* Google rating badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/6 bg-white/2">
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C8A96B">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] text-white/30 tracking-wide">5.0 Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION C — Micro footer
      ═══════════════════════════════════════════════ */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/20 text-xs">
            <a href="/privacy-policy" className="hover:text-white/40 transition-colors">
              Privacy Policy
            </a>
            <a href="/sitemap.xml" className="hover:text-white/40 transition-colors">
              Sitemap
            </a>
            <a href="#" className="hover:text-white/40 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
