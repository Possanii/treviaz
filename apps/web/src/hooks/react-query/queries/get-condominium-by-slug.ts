import { queryOptions } from '@tanstack/react-query'
import { ICondominium } from '@treviaz/entities/schemas/ICondominium'

import { getCondominiumBySlug } from '@/http/condominium/get-condominium-by-slug'

export function useQueryGetCondominiumBySlug({ slug }: { slug: string }) {
  return queryOptions({
    queryKey: ['condominium', slug],
    queryFn: async (): Promise<{
      condominium: Omit<ICondominium, 'owner_id' | 'address_id'>
    }> => await getCondominiumBySlug({ slug }),
    refetchOnMount: false,
  })
}
