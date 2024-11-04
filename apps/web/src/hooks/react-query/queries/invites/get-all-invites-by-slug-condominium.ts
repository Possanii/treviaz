import { queryOptions } from '@tanstack/react-query'
import { ICondominiumInvitesTable } from '@treviaz/entities/schemas/tables/ICondominium-invites-table'

import { getAllInvitesBySlugCondominium } from '@/http/invite/get-all-invites-by-slug-condominium'

export function useQueryGetAllInvitesBySlugCondominium({
  slug,
}: {
  slug: string
}) {
  return queryOptions({
    queryKey: ['condominium', slug, 'invites'],
    queryFn: async (): Promise<{ invites: ICondominiumInvitesTable[] }> =>
      await getAllInvitesBySlugCondominium({ slug }),
    refetchOnMount: false,
  })
}
