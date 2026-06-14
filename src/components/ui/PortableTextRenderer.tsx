import type { ContentBlock } from '@/data/blog'

interface BlogBodyProps {
  blocks: ContentBlock[]
}

export default function PortableTextRenderer({ blocks }: BlogBodyProps) {
  return (
    <div className="portable-text">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-luxury-black/70 leading-relaxed text-base mb-6">
                {block.text}
              </p>
            )
          case 'h2':
            return (
              <h2
                key={i}
                className="font-display font-bold text-luxury-black text-2xl leading-tight mt-12 mb-4"
              >
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={i}
                className="font-display font-bold text-luxury-black text-xl leading-snug mt-10 mb-3"
              >
                {block.text}
              </h3>
            )
          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-gold/40 pl-6 py-1 my-8 italic text-luxury-black/55 text-lg leading-relaxed"
              >
                {block.text}
              </blockquote>
            )
          case 'list':
            return (
              <ul key={i} className="list-none space-y-2 mb-6 pl-0">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-luxury-black/70 text-base leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
