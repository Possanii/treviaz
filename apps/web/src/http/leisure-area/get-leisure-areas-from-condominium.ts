import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'

import { api } from '@/lib/api-client'

export async function getLeisureAreasFromCondominium({
  slug,
}: {
  slug: string
}): Promise<{ leisureAreas: ILeisureArea[] }> {
  const result = await api.get(`/leisure-area/condominium/${slug}`)

  return { ...result.data.body }
}
