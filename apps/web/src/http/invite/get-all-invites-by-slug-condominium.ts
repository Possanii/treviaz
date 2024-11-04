import { ICondominiumInvitesTable } from '@treviaz/entities/schemas/tables/ICondominium-invites-table'

import { api } from '@/lib/api-client'

export async function getAllInvitesBySlugCondominium({
  slug,
}: {
  slug: string
}): Promise<{ invites: ICondominiumInvitesTable[] }> {
  const result = await api.get<{
    body: { invites: ICondominiumInvitesTable[] }
  }>(`/condominium/slug/${slug}/invites`)

  return { ...result.data.body }
}
