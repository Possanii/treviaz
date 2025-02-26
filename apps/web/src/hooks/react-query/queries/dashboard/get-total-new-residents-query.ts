import { queryOptions } from '@tanstack/react-query'

import {
  getTotalNewresidents,
  IGetTotalNewresidentsResponse,
} from '@/http/dashboard/get-total-new-residents'

export function useQueryGetTotalNewresidents({ condSlug }: { condSlug: string }) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'dashboard', 'total', 'new', 'residents'],
    queryFn: async (): Promise<IGetTotalNewresidentsResponse> =>
      await getTotalNewresidents({ condSlug }),
    refetchOnMount: false,
  })
}
