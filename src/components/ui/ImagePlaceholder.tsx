import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  aspectRatio?: string
  label?: string
  className?: string
}

export default function ImagePlaceholder({
  aspectRatio = 'aspect-[4/3]',
  label = 'Photo',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-beige', aspectRatio, className)}>
      {/* Texture grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Subtle gradient overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-beige-light/60 via-beige/40 to-beige/80" />

      {/* Corner accents */}
      <div aria-hidden="true" className="absolute top-4 left-4 w-6 h-6 border-t border-l border-olive/20" />
      <div aria-hidden="true" className="absolute top-4 right-4 w-6 h-6 border-t border-r border-olive/20" />
      <div aria-hidden="true" className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-olive/20" />
      <div aria-hidden="true" className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-olive/20" />

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-full border border-olive/20 flex items-center justify-center">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-5 h-5 text-olive/30">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-olive/30 font-medium">{label}</span>
      </div>
    </div>
  )
}
