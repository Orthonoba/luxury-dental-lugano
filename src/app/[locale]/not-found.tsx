'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/navigation'

export default function NotFound() {
  const locale = useLocale()

  const messages: Record<string, { label: string; heading: string; sub: string; cta: string }> = {
    en: { label: 'Error 404', heading: 'Page Not', sub: "The page you're looking for doesn't exist or has been moved.", cta: 'Back to Home' },
    it: { label: 'Errore 404', heading: 'Pagina Non', sub: 'La pagina che stai cercando non esiste o è stata spostata.', cta: 'Torna alla Home' },
    es: { label: 'Error 404', heading: 'Página No', sub: 'La página que buscas no existe o ha sido movida.', cta: 'Volver al inicio' },
    de: { label: 'Fehler 404', heading: 'Seite Nicht', sub: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
    fr: { label: 'Erreur 404', heading: 'Page Non', sub: "La page que vous recherchez n'existe pas ou a été déplacée.", cta: "Retour à l'accueil" },
  }

  const t = messages[locale] ?? messages.en
  const accent: Record<string, string> = { en: 'Found', it: 'Trovata', es: 'Encontrada', de: 'Gefunden', fr: 'Trouvée' }

  return (
    <section className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="block text-gold text-[10px] tracking-[0.5em] uppercase font-medium mb-6">
          {t.label}
        </span>
        <h1
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          {t.heading}{' '}
          <span className="text-gold italic font-medium">{accent[locale] ?? accent.en}</span>
        </h1>
        <p className="text-white/40 text-sm leading-relaxed mb-10">{t.sub}</p>
        <Link
          href="/"
          className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  )
}
