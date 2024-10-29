import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetCondominiumBySlug } from '@/hooks/react-query/queries/get-condominium-by-slug'
import { queryClient } from '@/lib/query-client'

import { CondominiumDashboard } from './dashboard'

export default function Page({ params }: { params: { slug: string } }) {
  queryClient.prefetchQuery(useQueryGetCondominiumBySlug({ slug: params.slug }))

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
          <BreadcrumbPage>Moradores</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding]">
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<>Loading...</>}>
            <CondominiumDashboard />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
