import { queryOptions } from '@tanstack/react-query'

import {
  getTotalNewThreads,
  IGetTotalNewThreadsResponse,
} from '@/http/dashboard/get-total-new-threads'

export function useQueryGetTotalNewThreads({ condSlug }: { condSlug: string }) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'dashboard', 'total', 'new', 'threads'],
    queryFn: async (): Promise<IGetTotalNewThreadsResponse> =>
      await getTotalNewThreads({ condSlug }),
    refetchOnMount: false,
  })
}
