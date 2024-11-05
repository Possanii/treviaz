import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'
import { queryClient } from '@/lib/query-client'

import { ThreadsBlog } from './threads-grid'

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
      <section className="p-[--main-content-padding]">
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<DataTableSkeleton />}>
            <ThreadsBlog />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
