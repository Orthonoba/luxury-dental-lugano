const dentalLinks = [
  'Digital Smile Design',
  'Clear Aligners',
  'Porcelain Veneers',
  'Teeth Whitening',
  'Sleep Dentistry',
  'Mouth Guards',
]

const facialLinks = [
  'Facial Cleansing',
  'Skin Rejuvenation',
  'Facial Harmony',
  'Anti-Aging Treatments',
  'Hydration Therapies',
]

const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'IG' },
  { label: 'Facebook', href: '#', icon: 'FB' },
  { label: 'TikTok', href: '#', icon: 'TK' },
  { label: 'YouTube', href: '#', icon: 'YT' },
]

export default function Footer() {
  return (
    <footer className="bg-luxury-black">
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

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
                  Luxury Dental
                </p>
                <p className="text-[10px] tracking-[0.2em] text-white/40 mt-0.5">& Facial Estética</p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-8">
              Where Swiss precision meets natural beauty. Premium dental and facial aesthetics
              in a serene luxury environment.
            </p>

            {/* Social */}
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
              {dentalLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#dental"
                    className="text-white/35 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {item}
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
              {facialLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#facial"
                    className="text-white/35 text-sm hover:text-gold transition-colors duration-200"
                  >
                    {item}
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
                  123 Luxury Avenue, Suite 500
                  <br />
                  Beverly Hills, CA 90210
                </p>
              </div>
              <div>
                <p className="text-white/55">+1 (555) 123-4567</p>
                <p className="text-white/35 text-xs mt-0.5">hello@luxurydental.com</p>
              </div>
              <div className="pt-4 border-t border-white/8">
                <p className="text-white/25 text-xs leading-relaxed">
                  Mon–Fri: 9 AM – 7 PM
                  <br />
                  Saturday: 10 AM – 5 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Luxury Dental & Facial Estética. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/20 text-xs">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/40 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
