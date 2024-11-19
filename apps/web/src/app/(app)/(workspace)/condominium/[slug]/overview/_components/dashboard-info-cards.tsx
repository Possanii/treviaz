'use client'

import { useSuspenseQueries } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { useParams } from 'next/navigation'

import { useQueryGetTotalNewLivers } from '@/hooks/react-query/queries/dashboard/get-total-new-livers-query'
import { useQueryGetTotalNewThreads } from '@/hooks/react-query/queries/dashboard/get-total-new-threads-query'
import { useQueryGetTotalIncomeByMonth } from '@/hooks/react-query/queries/financial/get-total-income-query'
import { formatCurrency } from '@/utils/format-currency'

export function DashboardInfoCards() {
  const { slug } = useParams<{ slug: string }>()

  const [
    { data: totalIncomeData },
    { data: totalNewLiversData },
    { data: totalNewThreadsData },
  ] = useSuspenseQueries({
    queries: [
      useQueryGetTotalIncomeByMonth({ condSlug: slug }),
      useQueryGetTotalNewLivers({ condSlug: slug }),
      useQueryGetTotalNewThreads({ condSlug: slug }),
    ],
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita total</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalIncomeData.totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            +0% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos moradores</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{totalNewLiversData.totalNewLivers}
          </div>
          <p className="text-xs text-muted-foreground">
            +0% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos tópicos</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{totalNewThreadsData.totalNewThreads}
          </div>
          <p className="text-xs text-muted-foreground">
            +0% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
