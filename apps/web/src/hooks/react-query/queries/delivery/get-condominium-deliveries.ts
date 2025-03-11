import { queryOptions } from '@tanstack/react-query'

import {
  getCondominiumDeliveries,
  IGetCondominiumDeliveries,
} from '@/http/delivery/get-condominium-deliveries'

export function useQueryGetCondominiumDeliveries({
  condominiumSlug,
}: {
  condominiumSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condominiumSlug, 'threads', 'approve'],
    queryFn: async (): Promise<{ deliveries: IGetCondominiumDeliveries[] }> =>
      await getCondominiumDeliveries({ condominiumSlug }),
    refetchOnMount: 'always',
  })
}
