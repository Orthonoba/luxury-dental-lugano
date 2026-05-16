import { SITE_CONFIG } from '@/config/site'

const dentalLinks = [
  { label: 'Digital Smile Design', href: '/dental' },
  { label: 'Clear Aligners', href: '/dental' },
  { label: 'Porcelain Veneers', href: '/dental' },
  { label: 'Teeth Whitening', href: '/dental' },
  { label: 'Sleep Dentistry', href: '/dental' },
  { label: 'Mouth Guards', href: '/dental' },
]

const facialLinks = [
  { label: 'Facial Cleansing', href: '/facial-aesthetics' },
  { label: 'Skin Rejuvenation', href: '/facial-aesthetics' },
  { label: 'Facial Harmony', href: '/facial-aesthetics' },
  { label: 'Anti-Aging Treatments', href: '/facial-aesthetics' },
  { label: 'Hydration Therapies', href: '/facial-aesthetics' },
]

const socialLinks = [
  { label: 'Instagram', href: SITE_CONFIG.social.instagram, icon: 'IG' },
  { label: 'Facebook', href: SITE_CONFIG.social.facebook, icon: 'FB' },
  { label: 'TikTok', href: SITE_CONFIG.social.tiktok, icon: 'TK' },
  { label: 'YouTube', href: SITE_CONFIG.social.youtube, icon: 'YT' },
]

export default function Footer() {
  return (
    <footer className="bg-luxury-black">
      <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-white text-sm">LD</span>
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm tracking-wide leading-none">
                  {SITE_CONFIG.name}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-white/40 mt-0.5">{SITE_CONFIG.tagline}</p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-8">
              Where Swiss precision meets natural beauty. Premium dental and facial aesthetics
              in Lugano, Switzerland.
            </p>

            <div className="flex gap-2.5">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-gold/50 hover:text-gold transition-all duration-300 text-[10px] font-semibold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dental */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Dental
            </h4>
            <ul className="space-y-3">
              {dentalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/35 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Facial */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Facial
            </h4>
            <ul className="space-y-3">
              {facialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/35 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Visit Us
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white/55 leading-relaxed">
                  {SITE_CONFIG.contact.address.street}
                  <br />
                  {SITE_CONFIG.contact.address.zip} {SITE_CONFIG.contact.address.city}
                  <br />
                  {SITE_CONFIG.contact.address.country}
                </p>
              </div>
              <div>
                <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-white/55 hover:text-gold transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
                <br />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-white/35 text-xs mt-0.5 hover:text-gold transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="pt-4 border-t border-white/8">
                <p className="text-white/25 text-xs leading-relaxed">
                  Mon–Fri: 9:00 – 19:00
                  <br />
                  Saturday: 10:00 – 17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/20 text-xs">
            <a href="/privacy-policy" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
