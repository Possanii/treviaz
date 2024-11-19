'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { useParams } from 'next/navigation'

import { useQueryGetRecentPayments } from '@/hooks/react-query/queries/dashboard/get-recent-payments-query'
import { formatCurrency } from '@/utils/format-currency'
import { getNameInitial } from '@/utils/get-name-initials'

export function RecentPayments() {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetRecentPayments({ condSlug: slug })
  )

  return (
    <Card className="col-span-4 md:col-span-4">
      <CardHeader>
        <CardTitle>Pagamentos recentes</CardTitle>
        <CardDescription>
          Você recebeu {data.recentPayments.length} pagamentos esse mês.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {data.recentPayments.length > 0 ? (
            data.recentPayments.map((payment) => (
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={payment.payer.avatar_url || undefined}
                    alt={payment.payer.name}
                  />
                  <AvatarFallback>
                    {getNameInitial(payment.payer.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {payment.payer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment.payer.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  +{formatCurrency(payment.amountPaid)}
                </div>
              </div>
            ))
          ) : (
            <span>Nenhum pagamentos encontrado.</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
