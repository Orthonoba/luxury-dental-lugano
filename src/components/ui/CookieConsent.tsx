'use client'

import { useEffect, useState } from 'react'

export const CONSENT_KEY = 'ld_cookie_consent'

const LABELS: Record<string, { notice: string; accept: string; decline: string }> = {
  it: {
    notice:
      "Utilizziamo i cookie analitici per migliorare la tua esperienza. Accetti l'uso dei cookie?",
    accept: 'Accetta',
    decline: 'Rifiuta',
  },
  en: {
    notice:
      'We use analytics cookies to improve your experience. Do you accept the use of cookies?',
    accept: 'Accept',
    decline: 'Decline',
  },
  es: {
    notice:
      '¿Acepta el uso de cookies analíticas para mejorar su experiencia en nuestro sitio web?',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  de: {
    notice:
      'Wir verwenden Analyse-Cookies, um Ihre Erfahrung zu verbessern. Akzeptieren Sie die Verwendung von Cookies?',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  fr: {
    notice:
      'Nous utilisons des cookies analytiques pour améliorer votre expérience. Acceptez-vous leur utilisation?',
    accept: 'Accepter',
    decline: 'Refuser',
  },
}

interface CookieConsentProps {
  locale: string
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [status, setStatus] = useState<'pending' | 'granted' | 'denied' | 'loading'>('loading')

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'granted' || stored === 'denied') {
      setStatus(stored)
    } else {
      setStatus('pending')
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'granted')
    setStatus('granted')
    window.dispatchEvent(new CustomEvent('ld:consentGranted'))
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'denied')
    setStatus('denied')
  }

  if (status !== 'pending') return null

  const labels = LABELS[locale] ?? LABELS['it']

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-luxury-black border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-beige-light/80 text-sm leading-relaxed max-w-2xl">
          {labels.notice}{' '}
          <a
            href={`/${locale}/privacy-policy`}
            className="text-gold hover:text-gold/80 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-beige-light/50 hover:text-beige-light text-sm px-4 py-2 transition-colors cursor-pointer"
          >
            {labels.decline}
          </button>
          <button
            onClick={handleAccept}
            className="bg-gold text-luxury-black text-sm font-medium px-5 py-2 rounded-full hover:bg-gold/90 transition-colors cursor-pointer"
          >
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
