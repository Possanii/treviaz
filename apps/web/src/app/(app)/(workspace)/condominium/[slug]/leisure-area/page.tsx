import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import LeisureAreaCalendar from '@/app/(app)/(workspace)/condominium/[slug]/leisure-area/leiuse-area-calendar'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetReservesFromCondominium } from '@/hooks/react-query/queries/reserves/get-reserves-from-condominium-query'
import { queryClient } from '@/lib/query-client'

export default async function CalendarDemo({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { slug: string }
}) {
  const { slug } = params

  await queryClient.prefetchQuery(useQueryGetReservesFromCondominium({ slug }))

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
          <BreadcrumbPage>Reservas de área comum</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding]">
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<DataTableSkeleton />}>
            <LeisureAreaCalendar />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
