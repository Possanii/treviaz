import { queryOptions } from '@tanstack/react-query'
import { ILiversTable } from '@treviaz/entities/schemas/ILiversTable'

import { getLiversFromCondominiumBySlug } from '@/http/condominium/get-livers-from-condominium-by-slug'

export function useQueryGetLiversFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['condominium', 'livers', slug],
    queryFn: async (): Promise<ILiversTable> =>
      await getLiversFromCondominiumBySlug({ slug }),
    refetchOnMount: false,
  })
}
