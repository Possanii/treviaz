import { queryOptions } from '@tanstack/react-query'

import {
  getAllCategoriesFromCondominium,
  IGetAllCategoriesFromCondominium,
} from '@/http/forum/get-all-categories-from-condominium'

export function useQueryGetAllCategoriesCondominium({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['condominium', slug, 'categories'],
    queryFn: async (): Promise<IGetAllCategoriesFromCondominium> =>
      await getAllCategoriesFromCondominium({ slug }),
    refetchOnMount: false,
  })
}
