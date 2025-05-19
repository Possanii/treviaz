import { queryOptions } from '@tanstack/react-query'
import { IReserve } from '@treviaz/entities/schemas/IReserve'

import { getReservesFromCondominium } from '@/http/reserves/get-reserves-from-condominium'

export function useQueryGetReservesFromCondominium({ slug }: { slug: string }) {
  return queryOptions({
    queryKey: ['reserves', 'condominium', slug],
    queryFn: async (): Promise<{
      reserves: IReserve[]
    }> => await getReservesFromCondominium({ condominiumSlug: slug }),
    refetchOnMount: false,
  })
}
