import { queryOptions } from '@tanstack/react-query'
import { IResidentsTable } from '@treviaz/entities/src/IResidentsTable'

import { getresidentsFromCondominiumBySlug } from '@/http/condominium/get-residents-from-condominium-by-slug'

export function useQueryGetresidentsFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['condominium', 'residents', slug],
    queryFn: async (): Promise<IResidentsTable> =>
      await getresidentsFromCondominiumBySlug({ slug }),
    refetchOnMount: false,
  })
}
