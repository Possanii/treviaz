import { queryOptions } from '@tanstack/react-query'
import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'

import { getLeisureAreasFromCondominium } from '@/http/leisure-area/get-leisure-areas-from-condominium'

export function useQueryGetLeisureAreasFromCondominium({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['leisure-areas', 'condominium', slug],
    queryFn: async (): Promise<{
      leisureAreas: ILeisureArea[]
    }> => await getLeisureAreasFromCondominium({ slug }),
    refetchOnMount: false,
  })
}
