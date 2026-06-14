import type { ReactNode } from 'react'

export interface DentalTreatment {
  icon: ReactNode
  title: string
  description: string
  tag: string
}

export interface FacialService {
  number: string
  title: string
  description: string
  accent: string
}
