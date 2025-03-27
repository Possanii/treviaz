import { IUnit } from '@treviaz/entities/schemas/IUnit'

import { api } from '@/lib/api-client'

export async function getUnitsFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  const result = await api.get<{ body: { units: IUnit[] } }>(
    `/condominium/slug/${slug}/units`
  )

  return { units: result.data.body.units }
}
