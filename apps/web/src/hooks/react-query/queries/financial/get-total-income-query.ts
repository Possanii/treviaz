import { queryOptions } from '@tanstack/react-query'

import {
  getTotalIncomeByMonth,
  IGetTotalIncomeByMonthResponse,
} from '@/http/financial/get-total-income'

export function useQueryGetTotalIncomeByMonth({
  condSlug,
}: {
  condSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'financial', 'income'],
    queryFn: async (): Promise<IGetTotalIncomeByMonthResponse> =>
      await getTotalIncomeByMonth({ condSlug }),
    refetchOnMount: false,
  })
}
