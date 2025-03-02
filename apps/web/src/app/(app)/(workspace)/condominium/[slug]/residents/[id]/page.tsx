import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'
import React from 'react'

import { AppHeader } from '@/components/sidebar/app-header'
import { useQueryGetUserById } from '@/hooks/react-query/queries/user/get-user-by-id'
import { queryClient } from '@/lib/query-client'

import { ViewUserDetails } from './user-details'

export default async function Page({
  params,
}: {
  params: { slug: string; id: string }
}) {
  queryClient.prefetchQuery(
    useQueryGetUserById({ slug: params.slug, id: params.id })
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
          <BreadcrumbLink href={`/condominium/${params.slug}/residents`}>
            Moradores
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>{params.id}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding] flex w-full justify-center items-center">
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<>Loading...</>}>
            <ViewUserDetails />
          </React.Suspense>
        </HydrationBoundary>
      </section>
    </>
  )
}
