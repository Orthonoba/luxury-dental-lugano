'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const variantClasses = {
  primary:
    'bg-olive text-white hover:bg-olive-light hover:shadow-2xl hover:shadow-olive/30 hover:-translate-y-0.5',
  secondary:
    'border border-white/15 text-white/80 hover:bg-white/8 hover:border-white/30',
  ghost: 'text-olive hover:text-olive-light hover:bg-olive/8',
  'ghost-dark': 'text-luxury-black/70 hover:text-luxury-black hover:bg-luxury-black/5',
  outline:
    'border border-olive/40 text-olive hover:bg-olive hover:text-white hover:border-olive',
} as const

const sizeClasses = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-8 py-4 text-[11px]',
  lg: 'px-10 py-5 text-[11px]',
} as const

type ButtonVariant = keyof typeof variantClasses
type ButtonSize = keyof typeof sizeClasses

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never
  }

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const baseClasses =
  'inline-flex items-center justify-center rounded-full tracking-[0.25em] uppercase font-semibold transition-all duration-300 cursor-pointer'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    if ('href' in props && props.href !== undefined) {
      const { href, ...anchorProps } = props as ButtonAsAnchor
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      )
    }

    const { ...buttonProps } = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
