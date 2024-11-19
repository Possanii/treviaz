import { queryOptions } from '@tanstack/react-query'

import {
  getTotalOutstandingByMonth,
  IGetTotalOutstandingByMonthResponse,
} from '@/http/financial/get-total-outstanding'

export function useQueryGetTotalOutstandingByMonth({
  condSlug,
}: {
  condSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'financial', 'outstanding'],
    queryFn: async (): Promise<IGetTotalOutstandingByMonthResponse> =>
      await getTotalOutstandingByMonth({ condSlug }),
    refetchOnMount: false,
  })
}
