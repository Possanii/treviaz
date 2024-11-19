import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { CalendarDateRangePicker } from '@treviaz/ui/components/ui/date-range-picker'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@treviaz/ui/components/ui/tabs'
import React from 'react'

import DashboardInfoCardSkeleton from '@/components/dashboard-info-card-skeleton'
import { useQueryGetTotalNewLivers } from '@/hooks/react-query/queries/dashboard/get-total-new-livers-query'
import { useQueryGetTotalNewThreads } from '@/hooks/react-query/queries/dashboard/get-total-new-threads-query'
import { useQueryGetTotalIncomeByMonth } from '@/hooks/react-query/queries/financial/get-total-income-query'
import { queryClient } from '@/lib/query-client'

import { DashboardInfoCards } from './dashboard-info-cards'
import { PieGraph } from './pie-graph'
import { RecentSales } from './recent-sales'

export async function OverViewPage({ params }: { params: { slug: string } }) {
  const dehydratedState = dehydrate(queryClient)

  await queryClient.prefetchQuery(
    useQueryGetTotalIncomeByMonth({ condSlug: params.slug })
  )
  await queryClient.prefetchQuery(
    useQueryGetTotalNewLivers({ condSlug: params.slug })
  )
  await queryClient.prefetchQuery(
    useQueryGetTotalNewThreads({ condSlug: params.slug })
  )

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Olá, Bem-vindo de volta 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analítico
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <HydrationBoundary state={dehydratedState}>
              <React.Suspense fallback={<DashboardInfoCardSkeleton />}>
                <DashboardInfoCards />
              </React.Suspense>
            </HydrationBoundary>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 md:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
