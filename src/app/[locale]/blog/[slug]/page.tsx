import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import PortableTextRenderer from '@/components/ui/PortableTextRenderer'
import { sanityFetch } from '@/sanity/lib/live'
import { urlFor } from '@/sanity/lib/image'
import {
  postBySlugQuery,
  relatedPostsQuery,
  allPostSlugsQuery,
} from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/lib/queries'
import { SITE_CONFIG } from '@/config/site'
import { Link } from '@/navigation'
import { routing } from '@/i18n/routing'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const result = await sanityFetch<{ slug: string }[]>({ query: allPostSlugsQuery })
    const slugs = (result.data ?? []).map(({ slug }) => ({ slug }))
    return routing.locales.flatMap((locale) => slugs.map((s) => ({ locale, ...s })))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const result = await sanityFetch<SanityPost>({
      query: postBySlugQuery,
      params: { slug },
    })
    const post = result.data
    if (!post) return { title: 'Article not found' }

    const ogImageUrl =
      post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(630).auto('format').url()
        : undefined

    return {
      title: post.title,
      description: post.excerpt ?? SITE_CONFIG.description,
      openGraph: {
        title: post.title,
        description: post.excerpt ?? SITE_CONFIG.description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: post.author ? [post.author.name] : [],
        images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt ?? SITE_CONFIG.description,
        images: ogImageUrl ? [ogImageUrl] : [],
      },
    }
  } catch {
    return { title: 'Article' }
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function estimateReadTime(excerpt?: string): string {
  const words = excerpt ? excerpt.split(/\s+/).length * 10 : 800
  const mins = Math.max(3, Math.ceil(words / 200))
  return `${mins} min read`
}

function getAuthorInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  const postResult = await sanityFetch<SanityPost>({
    query: postBySlugQuery,
    params: { slug },
  })
  const post = postResult.data

  if (!post) notFound()

  const categorySlug = post.categories?.[0]?.slug?.current ?? ''
  const relatedResult = await sanityFetch<SanityPost[]>({
    query: relatedPostsQuery,
    params: { slug, categories: post.categories?.map((c) => c.slug?.current) ?? [] },
  }).catch(() => ({ data: [] as SanityPost[] }))
  const related = relatedResult.data ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author
      ? { '@type': 'Person', name: post.author.name }
      : { '@type': 'Organization', name: SITE_CONFIG.shortName },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.shortName,
      url: SITE_CONFIG.url,
    },
    image:
      post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(630).auto('format').url()
        : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${slug}`,
    },
  }

  const heroTitle = post.title.includes(' ')
    ? post.title.substring(0, post.title.lastIndexOf(' '))
    : post.title
  const heroAccent = post.title.includes(' ')
    ? post.title.substring(post.title.lastIndexOf(' ') + 1)
    : ''

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
          eyebrow={post.categories?.[0]?.title ?? 'Article'}
          title={heroTitle}
          titleAccent={heroAccent}
          subtitle={`${formatDate(post.publishedAt)}  ·  ${estimateReadTime(post.excerpt)}`}
        />

        {/* Cover image */}
        {post.mainImage?.asset && (
          <div className="bg-white pt-12">
            <div className="max-w-4xl mx-auto px-6">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).auto('format').url()}
                  alt={post.mainImage.alt ?? post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Author card + Body */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-4 mb-12 p-6 rounded-2xl bg-beige-light border border-beige">
                <div className="w-14 h-14 rounded-full bg-luxury-black flex items-center justify-center shrink-0">
                  {post.author.image?.asset ? (
                    <Image
                      src={urlFor(post.author.image).width(56).height(56).auto('format').url()}
                      alt={post.author.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-display font-bold text-white text-lg">
                      {getAuthorInitials(post.author.name)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-display font-semibold text-luxury-black text-sm">
                    {post.author.name}
                  </p>
                  <p className="text-luxury-black/40 text-xs tracking-wide mt-0.5">
                    Luxury Dental Paradiso, Lugano
                  </p>
                </div>
                {post.categories?.[0] && (
                  <span className="ml-auto hidden sm:inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold shrink-0">
                    {post.categories[0].title}
                  </span>
                )}
              </div>
            )}

            {/* Body */}
            {post.body && <PortableTextRenderer blocks={post.body} />}
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
                {related.map((rel, index) => (
                  <Link
                    key={rel._id}
                    href={`/blog/${rel.slug.current}`}
                    className="group block"
                  >
                    <div className="mb-5 overflow-hidden rounded-2xl">
                      {rel.mainImage?.asset ? (
                        <div className="relative aspect-[16/10] group-hover:scale-[1.02] transition-transform duration-500">
                          <Image
                            src={urlFor(rel.mainImage).width(600).height(375).auto('format').url()}
                            alt={rel.mainImage.alt ?? rel.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-beige rounded-2xl flex items-center justify-center">
                          <span className="text-luxury-black/20 text-xs tracking-widest uppercase">
                            Article
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold mb-3">
                      {rel.categories?.[0]?.title ?? 'Article'}
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
