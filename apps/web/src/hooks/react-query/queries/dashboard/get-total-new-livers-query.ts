import { queryOptions } from '@tanstack/react-query'

import {
  getTotalNewLivers,
  IGetTotalNewLiversResponse,
} from '@/http/dashboard/get-total-new-livers'

export function useQueryGetTotalNewLivers({ condSlug }: { condSlug: string }) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'dashboard', 'total', 'new', 'livers'],
    queryFn: async (): Promise<IGetTotalNewLiversResponse> =>
      await getTotalNewLivers({ condSlug }),
    refetchOnMount: false,
  })
}
