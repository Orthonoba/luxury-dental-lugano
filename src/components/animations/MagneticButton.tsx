'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LUXURY_EASE } from '@/lib/animations'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  /** Magnetic pull strength (0–1). Default 0.25 */
  strength?: number
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  'aria-label'?: string
}

export function MagneticButton({
  children,
  className,
  strength = 0.25,
  as: Tag = 'button',
  href,
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPos({ x, y })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const anchorProps = Tag === 'a' ? { href, target, rel } : {}
  const buttonProps = Tag === 'button' ? { onClick } : {}

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 30, ease: LUXURY_EASE }}
      >
        {Tag === 'a' ? (
          <a
            href={href}
            target={target}
            rel={rel}
            aria-label={ariaLabel}
            className={cn('inline-flex items-center justify-center', className)}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={cn('inline-flex items-center justify-center', className)}
            {...buttonProps}
          >
            {children}
          </button>
        )}
      </motion.div>
    </div>
  )
}
