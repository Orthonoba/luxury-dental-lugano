import { cn } from '@/lib/utils'
import type { ElementType, HTMLAttributes } from 'react'

const variantClasses = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-screen-2xl',
} as const

type ContainerVariant = keyof typeof variantClasses

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  variant?: ContainerVariant
  as?: ElementType
}

export function Container({
  variant = 'default',
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto px-6 lg:px-8', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
