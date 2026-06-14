'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function MotionSection({ children, className, id }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
