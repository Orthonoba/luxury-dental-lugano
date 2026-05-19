// Live Content API placeholder — compatible with next-sanity v9.x
// To enable live preview, upgrade next-sanity to a version that includes
// the `next-sanity/live` subpath export and uncomment defineLive below.
import { client } from './client'

type SanityFetchOptions<Q> = {
  query: Q
  params?: Record<string, unknown>
  perspective?: 'published' | 'previewDrafts'
}

/** Basic fetch wrapper around the Sanity client. */
export async function sanityFetch<T>({
  query,
  params = {},
}: SanityFetchOptions<string>): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params)
  return { data }
}

/** No-op server component — replace with real SanityLive when upgrading next-sanity. */
export function SanityLive() {
  return null
}
