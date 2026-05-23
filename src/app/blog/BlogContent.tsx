'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ImagePlaceholder } from '@/components/ui'
import { urlFor } from '@/sanity/lib/image'
import type { SanityPost } from '@/sanity/lib/queries'

const mockPosts = [
  {
    category: 'Digital Smile Design',
    title: 'What is Digital Smile Design and How Does It Work?',
    excerpt:
      'Digital Smile Design is transforming cosmetic dentistry. In this article, we explore the technology, the process, and why seeing your result before treatment begins changes everything.',
    readTime: '5 min read',
    date: 'March 2026',
    slug: null,
  },
  {
    category: 'Facial Aesthetics',
    title: 'The Difference Between Natural and Overdone — Why Less is Always More',
    excerpt:
      'In aesthetic medicine, the greatest skill is restraint. We discuss our philosophy of natural-looking results and how we ensure treatments enhance rather than alter.',
    readTime: '4 min read',
    date: 'February 2026',
    slug: null,
  },
  {
    category: 'Patient Guide',
    title: 'Porcelain Veneers: Everything You Need to Know Before Your Consultation',
    excerpt:
      'Thinking about veneers? This comprehensive guide covers the process, candidacy, longevity, and what to expect — so you can arrive at your consultation fully informed.',
    readTime: '7 min read',
    date: 'January 2026',
    slug: null,
  },
]

function estimateReadTime(excerpt?: string): string {
  const words = excerpt ? excerpt.split(/\s+/).length : 150
  const mins = Math.max(3, Math.ceil((words / 200) * 10))
  return `${mins} min read`
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-CH', { month: 'long', year: 'numeric' }).format(
    new Date(dateStr)
  )
}

interface BlogContentProps {
  posts?: SanityPost[]
}

export default function BlogContent({ posts }: BlogContentProps) {
  const hasSanityPosts = posts && posts.length > 0

  return (
    <>
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {hasSanityPosts
              ? posts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.12 }}
                    className="group"
                  >
                    {/* Cover */}
                    <div className="mb-6 overflow-hidden rounded-2xl">
                      {post.mainImage?.asset ? (
                        <div className="relative aspect-[16/10] group-hover:scale-[1.02] transition-transform duration-500">
                          <Image
                            src={urlFor(post.mainImage).width(600).height(375).auto('format').url()}
                            alt={post.mainImage.alt ?? post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="group-hover:scale-[1.02] transition-transform duration-500">
                          <ImagePlaceholder aspectRatio="aspect-[16/10]" label="Article Cover" />
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <span className="inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold mb-4">
                      {post.categories?.[0]?.title ?? 'Article'}
                    </span>

                    {/* Title */}
                    <h2 className="font-display font-bold text-luxury-black text-xl leading-snug mb-3 group-hover:text-olive transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-luxury-black/45 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    {/* Meta + CTA */}
                    <div className="flex items-center justify-between pt-5 border-t border-beige">
                      <div className="flex items-center gap-3 text-luxury-black/30 text-xs">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>·</span>
                        <span>{estimateReadTime(post.excerpt)}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-olive text-[10px] tracking-[0.2em] uppercase font-semibold hover:gap-3 transition-all"
                      >
                        Read →
                      </Link>
                    </div>
                  </motion.article>
                ))
              : mockPosts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.12 }}
                    className="group"
                  >
                    {/* Cover */}
                    <div className="mb-6 overflow-hidden rounded-2xl">
                      <div className="group-hover:scale-[1.02] transition-transform duration-500">
                        <ImagePlaceholder aspectRatio="aspect-[16/10]" label="Article Cover" />
                      </div>
                    </div>

                    {/* Category */}
                    <span className="inline-block text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold mb-4">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="font-display font-bold text-luxury-black text-xl leading-snug mb-3 group-hover:text-olive transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-luxury-black/45 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    {/* Meta + CTA */}
                    <div className="flex items-center justify-between pt-5 border-t border-beige">
                      <div className="flex items-center gap-3 text-luxury-black/30 text-xs">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-luxury-black/25 text-[10px] tracking-[0.2em] uppercase font-semibold cursor-default">
                        Coming soon
                      </span>
                    </div>
                  </motion.article>
                ))}
          </div>

          {/* Coming soon note — only when showing mock posts */}
          {!hasSanityPosts && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20 text-center"
            >
              <p className="text-luxury-black/25 text-sm">
                More articles coming soon — follow us on social for the latest insights.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-beige-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-luxury-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Questions about
            <span className="block text-olive italic font-medium">your smile?</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10">
            Our team is happy to answer any questions during a complimentary consultation.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </div>
      </section>
    </>
  )
}
