import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

const variantClasses = {
  gold: 'bg-gold/15 text-gold',
  olive: 'bg-olive/15 text-olive',
  dark: 'bg-luxury-black/8 text-luxury-black/60',
} as const

type BadgeVariant = keyof typeof variantClasses

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'gold', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
