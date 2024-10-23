'use client'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@treviaz/ui/components/ui/sidebar'
import * as React from 'react'

import { useQueryGetRelationshipsWithCondominiums } from '@/hooks/react-query/queries/get-user-relationships-with-condominiums'
import { queryClient } from '@/lib/query-client'
import { sidebarData } from '@/utils/sidebar-data'

import { CondominiumSwitcher } from './condominium-switcher'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  queryClient.prefetchQuery(useQueryGetRelationshipsWithCondominiums())

  const dehydratedState = dehydrate(queryClient)

  const data = sidebarData()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HydrationBoundary state={dehydratedState}>
          <React.Suspense fallback={<>Loading...</>}>
            <CondominiumSwitcher condominiums={data.condominium} />
          </React.Suspense>
        </HydrationBoundary>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
