'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui'
import { Link } from '@/navigation'
import { BLOG_POSTS } from '@/data/blog'

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-CH', { month: 'long', year: 'numeric' }).format(
    new Date(dateStr)
  )
}

export default function BlogContent() {
  return (
    <>
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post, index) => (
              <motion.article
                key={post.slug}
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
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-olive text-[10px] tracking-[0.2em] uppercase font-semibold hover:gap-3 transition-all"
                  >
                    Read →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
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
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
