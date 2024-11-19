import { queryOptions } from '@tanstack/react-query'

import {
  getTotalExpenseByMonth,
  IGetTotalExpenseByMonthResponse,
} from '@/http/financial/get-total-expense'

export function useQueryGetTotalExpenseByMonth({
  condSlug,
}: {
  condSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'financial', 'expense'],
    queryFn: async (): Promise<IGetTotalExpenseByMonthResponse> =>
      await getTotalExpenseByMonth({ condSlug }),
    refetchOnMount: false,
  })
}
