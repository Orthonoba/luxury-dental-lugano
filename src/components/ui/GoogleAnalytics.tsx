'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_KEY } from './CookieConsent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === 'granted') {
      setConsented(true)
    }

    function handleConsent() {
      setConsented(true)
    }
    window.addEventListener('ld:consentGranted', handleConsent)
    return () => window.removeEventListener('ld:consentGranted', handleConsent)
  }, [])

  if (!GA_ID || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
