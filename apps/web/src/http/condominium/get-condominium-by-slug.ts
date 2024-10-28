import { ICondominium } from '@treviaz/entities/schemas/ICondominium'

import { api } from '@/lib/api-client'

export async function getCondominiumBySlug({
  slug,
}: {
  slug: string
}): Promise<{ condominium: Omit<ICondominium, 'owner_id' | 'address_id'> }> {
  const result = await api.get<{
    body: { condominium: Omit<ICondominium, 'owner_id' | 'address_id'> }
  }>(`/condominium/slug/${slug}`)

  return { ...result.data.body }
}
