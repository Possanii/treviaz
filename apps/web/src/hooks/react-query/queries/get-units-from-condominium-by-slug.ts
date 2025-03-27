import { queryOptions } from '@tanstack/react-query'
import { IUnit } from '@treviaz/entities/schemas/IUnit'

import { getUnitsFromCondominiumBySlug } from '@/http/condominium/get-units-from-condominium-by-slug'

export function useQueryGetUnitsFromCondominium({ slug }: { slug: string }) {
  return queryOptions({
    queryKey: ['condominium', slug, 'units'],
    queryFn: async (): Promise<{ units: IUnit[] }> =>
      await getUnitsFromCondominiumBySlug({ slug }),
    refetchOnMount: false,
  })
}
