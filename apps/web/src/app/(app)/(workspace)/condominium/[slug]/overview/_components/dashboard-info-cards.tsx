'use client'

import { useSuspenseQueries } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { DollarSign, Theater, Users } from 'lucide-react'
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
      <Card className="bg-gradient-to-br from-green-400 to-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita total</CardTitle>
          <DollarSign className="size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalIncomeData.totalIncome)}
          </div>
          <p className="text-xs font-bold text-accent-foreground">
            +87% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-yellow-400 to-yellow-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos moradores</CardTitle>
          <Users className="size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{totalNewLiversData.totalNewLivers}
          </div>
          <p className="text-xs font-bold text-accent-foreground">
            +60% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-400 to-blue-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos tópicos</CardTitle>
          <Theater className="size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{totalNewThreadsData.totalNewThreads}
          </div>
          <p className="text-xs font-bold text-accent-foreground">
            +100% comparado ao mês passado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
