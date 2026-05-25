import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <span className="block text-gold text-[10px] tracking-[0.5em] uppercase font-medium mb-6">
            Error 404
          </span>
          <h1
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            Page Not{' '}
            <span className="text-gold italic font-medium">Found</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/it"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  )
}
