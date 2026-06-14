import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from '@/data/blog'
import { SITE_CONFIG } from '@/config/site'
import { Link } from '@/navigation'
import { routing } from '@/i18n/routing'
import { ImagePlaceholder } from '@/components/ui'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article not found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const related = getRelatedPosts(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.shortName,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${slug}`,
    },
  }

  const words = post.title.split(' ')
  const heroTitle = words.slice(0, -1).join(' ')
  const heroAccent = words.at(-1) ?? ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          eyebrow={post.category}
          title={heroTitle}
          titleAccent={heroAccent}
          subtitle={`${formatDate(post.publishedAt)}  ·  ${post.readTime}`}
        />

        {/* Cover placeholder */}
        <div className="bg-white pt-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-3xl overflow-hidden">
              <ImagePlaceholder aspectRatio="aspect-[16/9]" label="Article Cover" />
            </div>
          </div>
        </div>

        {/* Author card + Body */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            {/* Author */}
            <div className="flex items-center gap-4 mb-12 p-6 rounded-2xl bg-beige-light border border-beige">
              <div className="w-14 h-14 rounded-full bg-luxury-black flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-white text-lg">
                  {post.author.initials}
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-luxury-black text-sm">
                  {post.author.name}
                </p>
                <p className="text-luxury-black/40 text-xs tracking-wide mt-0.5">
                  Luxury Dental Paradiso, Lugano
                </p>
              </div>
              <span className="ml-auto hidden sm:inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold shrink-0">
                {post.category}
              </span>
            </div>

            {/* Body */}
            <PortableTextRenderer blocks={post.body} />
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-24 bg-beige-light">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="mb-12">
                <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-3">
                  Continue Reading
                </span>
                <h2
                  className="font-display font-bold text-luxury-black leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                  Related <span className="text-olive italic font-medium">Articles</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group block"
                  >
                    <div className="mb-5 overflow-hidden rounded-2xl">
                      <div className="group-hover:scale-[1.02] transition-transform duration-500">
                        <ImagePlaceholder aspectRatio="aspect-[16/10]" label="Article Cover" />
                      </div>
                    </div>
                    <span className="inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold mb-3">
                      {rel.category}
                    </span>
                    <h3 className="font-display font-bold text-luxury-black text-lg leading-snug group-hover:text-olive transition-colors duration-300">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 bg-luxury-black">
          <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent mb-24" />
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Questions about
              <span className="block text-gold italic font-medium">your smile?</span>
            </h2>
            <p className="text-white/40 mb-10">
              Book a complimentary consultation with our team in Lugano.
            </p>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
