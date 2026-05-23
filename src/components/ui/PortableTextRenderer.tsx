'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityBlock } from '@/sanity/lib/queries'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-luxury-black/70 leading-relaxed text-base mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-bold text-luxury-black text-2xl leading-tight mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-bold text-luxury-black text-xl leading-snug mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display font-semibold text-luxury-black text-lg leading-snug mt-8 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold/40 pl-6 py-1 my-8 italic text-luxury-black/55 text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 mb-6 pl-0">{children}</ul>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-luxury-black/70 text-base leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-luxury-black">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-olive underline underline-offset-2 hover:text-olive-light transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(800).auto('format').url()
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image
              src={src}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-luxury-black/35 text-xs tracking-wide mt-3">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextRendererProps {
  blocks: SanityBlock[]
}

export default function PortableTextRenderer({ blocks }: PortableTextRendererProps) {
  return (
    <div className="portable-text">
      <PortableText value={blocks} components={components} />
    </div>
  )
}
