import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ForumThreadDetailsSkeleton } from '@treviaz/ui/components/custom/forum-thread-details-skeleton'
import React from 'react'

import { BlogThreadDetails } from '@/components/blog-thread-details'
import { useQueryGetForumThreadBySlug } from '@/hooks/react-query/queries/forum/get-forum-threads-by-slug'
import { queryClient } from '@/lib/query-client'

export default async function ({
  params,
}: {
  params: { slug: string; threadSlug: string }
}) {
  queryClient.prefetchQuery(
    useQueryGetForumThreadBySlug({
      condSlug: params.slug,
      threadSlug: params.threadSlug,
    })
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <React.Suspense fallback={<ForumThreadDetailsSkeleton />}>
        <BlogThreadDetails />
      </React.Suspense>
    </HydrationBoundary>
  )
}
