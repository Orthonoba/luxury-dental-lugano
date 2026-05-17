'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxLayerProps {
  children: React.ReactNode
  className?: string
  /** How many px to shift vertically over the scroll range. Positive = slower than scroll (upward drift). Default 40 */
  offset?: number
  /** Direction — "up" drifts up as user scrolls, "down" drifts down */
  direction?: 'up' | 'down'
}

export function ParallaxLayer({
  children,
  className,
  offset = 40,
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = direction === 'up' ? [offset, -offset] : [-offset, offset]
  const y = useTransform(scrollYProgress, [0, 1], range)

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
