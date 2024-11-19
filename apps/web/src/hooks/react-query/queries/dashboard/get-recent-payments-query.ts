import { queryOptions } from '@tanstack/react-query'

import {
  getRecentPayments,
  IGetRecentPaymentsResponse,
} from '@/http/dashboard/get-recent-payments'

export function useQueryGetRecentPayments({ condSlug }: { condSlug: string }) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'dashboard', 'recent', 'payments'],
    queryFn: async (): Promise<IGetRecentPaymentsResponse> =>
      await getRecentPayments({ condSlug }),
    refetchOnMount: false,
  })
}
