import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import BlogContent from './BlogContent'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery } from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Explore dental health insights, aesthetic guidance, and expert articles from the team at Luxury Dental Paradiso in Lugano, Switzerland.',
}

export default async function BlogPage() {
  let posts: SanityPost[] = []
  try {
    const result = await sanityFetch<SanityPost[]>({ query: allPostsQuery })
    posts = result.data ?? []
  } catch {
    posts = []
  }

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
        <BlogContent posts={posts} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
