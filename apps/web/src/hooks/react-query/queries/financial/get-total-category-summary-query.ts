import { queryOptions } from '@tanstack/react-query'

import {
  getTotalCategorySummaryByMonth,
  IGetTotalCategorySummaryByMonthResponse,
} from '@/http/financial/get-total-category-summary'

export function useQueryGetTotalCategorySummaryByMonth({
  condSlug,
}: {
  condSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'financial', 'category', 'summary'],
    queryFn: async (): Promise<IGetTotalCategorySummaryByMonthResponse> =>
      await getTotalCategorySummaryByMonth({ condSlug }),
    refetchOnMount: false,
  })
}
