import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ForumCategoriesSkeleton } from '@treviaz/ui/components/custom/forum-categories-skeleton'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'
import { queryClient } from '@/lib/query-client'

import { ForumThreadsPage } from './forum-threads-page'

export default async function ThreadsPage({
  params,
}: {
  params: { slug: string }
}) {
  queryClient.prefetchQuery(
    useQueryGetAllCategoriesCondominium({ slug: params.slug })
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
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Forum</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <HydrationBoundary state={dehydratedState}>
        <React.Suspense fallback={<ForumCategoriesSkeleton />}>
          <ForumThreadsPage />
        </React.Suspense>
      </HydrationBoundary>
    </>
  )
}
