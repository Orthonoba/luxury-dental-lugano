'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { hoverLift } from '@/lib/animations'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  /** 'dark' for dark glass, 'light' for frosted white glass */
  theme?: 'dark' | 'light'
  /** Enable hover lift animation */
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  theme = 'light',
  hover = true,
}: GlassCardProps) {
  const baseClasses =
    theme === 'dark'
      ? 'bg-white/5 border border-white/8 backdrop-blur-xl shadow-2xl shadow-black/20'
      : 'bg-white/70 border border-white/60 backdrop-blur-xl shadow-xl shadow-black/5'

  if (!hover) {
    return (
      <div className={cn('rounded-2xl', baseClasses, className)}>{children}</div>
    )
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverLift}
      className={cn('rounded-2xl cursor-default', baseClasses, className)}
    >
      {children}
    </motion.div>
  )
}
