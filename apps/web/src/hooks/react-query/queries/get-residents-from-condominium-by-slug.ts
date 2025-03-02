import { queryOptions } from '@tanstack/react-query'
import { IresidentsTable } from '@treviaz/entities/schemas/IresidentsTable'

import { getresidentsFromCondominiumBySlug } from '@/http/condominium/get-residents-from-condominium-by-slug'

export function useQueryGetresidentsFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['condominium', 'residents', slug],
    queryFn: async (): Promise<IresidentsTable> =>
      await getresidentsFromCondominiumBySlug({ slug }),
    refetchOnMount: false,
  })
}
