import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Luxury Dental Paradiso, Lugano, Switzerland.',
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-32 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
            Legal
          </span>
          <h1
            className="font-display font-bold text-luxury-black leading-tight mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Privacy Policy
          </h1>

          <div className="prose prose-sm max-w-none text-luxury-black/60 space-y-6">
            <p className="text-luxury-black/40 text-sm">Last updated: May 2026</p>

            <section>
              <h2 className="font-display font-semibold text-luxury-black text-xl mb-3">Data Controller</h2>
              <p>
                Luxury Dental & Facial Estética<br />
                Via Riva Paradiso 4<br />
                6900 Paradiso / Lugano, Switzerland<br />
                Email: info@luxurydental.ch
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-luxury-black text-xl mb-3">Data We Collect</h2>
              <p>
                When you submit the contact form on our website, we collect your name, email address, phone number, and message content. This data is used solely to respond to your enquiry and to schedule consultations at your request.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-luxury-black text-xl mb-3">How We Use Your Data</h2>
              <p>
                Your personal data is used exclusively for the purpose for which it was provided: responding to your enquiry, booking consultations, and providing the services you have requested. We do not sell, share, or transfer your data to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-luxury-black text-xl mb-3">Your Rights</h2>
              <p>
                Under the Swiss Federal Act on Data Protection (revDSG) and applicable EU regulations (GDPR), you have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at info@luxurydental.ch.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-luxury-black text-xl mb-3">Contact</h2>
              <p>
                For any questions regarding this privacy policy, please contact us at{' '}
                <a href="mailto:info@luxurydental.ch" className="text-olive hover:underline">
                  info@luxurydental.ch
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
