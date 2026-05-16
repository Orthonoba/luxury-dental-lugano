import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface LuxuryCardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark'
}

export function LuxuryCard({ theme = 'light', className, children, ...props }: LuxuryCardProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        'transition-all duration-500',
        isDark
          ? 'bg-white/4 rounded-2xl hover:bg-white/6 border border-white/6'
          : 'bg-white rounded-3xl hover:shadow-2xl hover:shadow-olive/8 border border-beige/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
