import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'

import { api } from '@/lib/api-client'

export async function createLeisureArea({
  slug,
  body,
}: {
  slug: string
  body: Pick<ILeisureArea, 'name' | 'description' | 'photo_url'>
}): Promise<void> {
  const result = await api.post(`/leisure-area/condominium/${slug}`, body)

  return { ...result.data.body }
}
