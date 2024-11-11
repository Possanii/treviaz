import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ForumThreadDetailsSkeleton } from '@treviaz/ui/components/custom/forum-thread-details-skeleton'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetForumThreadBySlug } from '@/hooks/react-query/queries/forum/get-forum-threads-by-slug'
import { queryClient } from '@/lib/query-client'

import { BlogThreadDetails } from './blog-thread'

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
    <>
      <AppHeader>
        <BreadcrumbItem>
          <BreadcrumbLink href="/condominium">Condominio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/condominium/${params.slug}`}>
            {params.slug}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/condominium/${params.slug}/threads`}>
            Forum
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>{params.threadSlug}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <HydrationBoundary state={dehydratedState}>
        <React.Suspense fallback={<ForumThreadDetailsSkeleton />}>
          <BlogThreadDetails />
        </React.Suspense>
      </HydrationBoundary>
    </>
  )
}
