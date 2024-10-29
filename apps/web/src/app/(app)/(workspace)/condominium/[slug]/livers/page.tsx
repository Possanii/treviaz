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
import { useQueryGetLiversFromCondominiumBySlug } from '@/hooks/react-query/queries/get-livers-from-condominium-by-slug'
import { queryClient } from '@/lib/query-client'

import { LiversTable } from './livers-table'

export default async function LiversPages({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { slug: string }
}) {
  const { slug } = params

  await queryClient.prefetchQuery(
    useQueryGetLiversFromCondominiumBySlug({ slug })
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
            <LiversTable searchParams={searchParams} />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
