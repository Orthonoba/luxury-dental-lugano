import { groq } from 'next-sanity'

export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title, slug },
  "author": author->{ name, image },
  "excerpt": pt::text(body)[0..240]
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body,
  "categories": categories[]->{ _id, title, slug },
  "author": author->{ name, image, bio },
  "excerpt": pt::text(body)[0..240]
}`

export const relatedPostsQuery = groq`*[
  _type == "post" &&
  slug.current != $slug &&
  count((categories[]->slug.current)[@ in $categories]) > 0
] | order(publishedAt desc) [0..2] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title, slug }
}`

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`

export type SanityCategory = {
  _id?: string
  title: string
  slug: { current: string }
}

export type SanityAuthor = {
  name: string
  image?: SanityImageAsset
  bio?: SanityBlock[]
}

export type SanityImageAsset = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export type SanityBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

export type SanityPost = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: SanityImageAsset
  publishedAt?: string
  categories?: SanityCategory[]
  author?: SanityAuthor
  excerpt?: string
  body?: SanityBlock[]
}
