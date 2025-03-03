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
import { useQueryGetresidentsFromCondominiumBySlug } from '@/hooks/react-query/queries/get-residents-from-condominium-by-slug'
import { queryClient } from '@/lib/query-client'

import { ResidentsTable } from './residents-table'

export default async function residentsPages({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { slug: string }
}) {
  const { slug } = params

  await queryClient.prefetchQuery(
    useQueryGetresidentsFromCondominiumBySlug({ slug })
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
          <BreadcrumbLink href={`/condominium/${slug}`}>{slug}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Moradores</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding]">
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<DataTableSkeleton />}>
            <ResidentsTable searchParams={searchParams} />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
