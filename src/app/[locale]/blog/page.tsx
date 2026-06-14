import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Explore dental health insights, aesthetic guidance, and expert articles from the team at Luxury Dental Paradiso in Lugano, Switzerland.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Insights & Education"
          title="Knowledge for"
          titleAccent="a Better Smile"
          subtitle="Expert perspectives on dental health, facial aesthetics, and the science of natural beauty from our team in Lugano."
        />
        <BlogContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
