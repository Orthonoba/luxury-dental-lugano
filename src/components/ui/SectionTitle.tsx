import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  accentWord?: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  accentWord,
  subtitle,
  align = 'center',
  theme = 'light',
  className,
}: SectionTitleProps) {
  const isDark = theme === 'dark'
  const isCenter = align === 'center'

  const renderTitle = () => {
    if (!accentWord) {
      return (
        <h2
          className={cn(
            'font-display font-bold leading-[1.08]',
            isDark ? 'text-white' : 'text-luxury-black'
          )}
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
        >
          {title}
        </h2>
      )
    }

    const parts = title.split(accentWord)
    return (
      <h2
        className={cn(
          'font-display font-bold leading-[1.08]',
          isDark ? 'text-white' : 'text-luxury-black'
        )}
        style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
      >
        {parts[0]}
        <span
          style={{
            background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {accentWord}
        </span>
        {parts[1]}
      </h2>
    )
  }

  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <span
          className={cn(
            'block text-[10px] tracking-[0.4em] uppercase font-medium mb-6',
            isDark ? 'text-gold/70' : 'text-gold'
          )}
        >
          {eyebrow}
        </span>
      )}
      {renderTitle()}
      {subtitle && (
        <p
          className={cn(
            'mt-6 text-base leading-relaxed',
            isDark ? 'text-white/60' : 'text-luxury-black/50',
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
