'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@treviaz/ui/components/ui/chart'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TrendingUp } from 'lucide-react'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { useQueryGetTotalCategorySummaryByMonth } from '@/hooks/react-query/queries/financial/get-total-category-summary-query'
import { formatCurrency } from '@/utils/format-currency'
import { randomGraphColor } from '@/utils/random-pie-graph-color'

export function PieGraph() {
  const { slug } = useParams<{ slug: string }>()

  const { data } = useSuspenseQuery(
    useQueryGetTotalCategorySummaryByMonth({ condSlug: slug })
  )

  const chartData = React.useMemo(
    () =>
      data.totalCategorySummary.map((category) => ({
        category: category.name,
        type: category.type,
        total: category.total,
        fill: `var(--color-${category.name})`,
      })),
    [data]
  )

  const chartConfig = {
    total: {
      label: 'Receita',
    },
    ...Object.fromEntries(
      data.totalCategorySummary.map((category) => [
        category.name,
        {
          label: category.name,
          color: randomGraphColor(),
        },
      ])
    ),
  } satisfies ChartConfig

  const totalRevenue = React.useMemo(() => {
    return chartData.reduce(
      (acc, curr) =>
        curr.type === 'INCOME' ? acc + curr.total : acc - curr.total,
      0
    )
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Movimentação financeira</CardTitle>
        <CardDescription>
          {format(new Date(), 'LLLL', { locale: ptBR })} 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatCurrency(totalRevenue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Reais
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando a movimentação total do último mês{' '}
        </div>
      </CardFooter>
    </Card>
  )
}
