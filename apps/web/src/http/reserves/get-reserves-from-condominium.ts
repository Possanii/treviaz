import { IReserve } from '@treviaz/entities/schemas/IReserve'

import { api } from '@/lib/api-client'

export async function getReservesFromCondominium({
  condominiumSlug,
}: {
  condominiumSlug: string
}): Promise<{ reserves: IReserve[] }> {
  const result = await api.get(`/reserves/condominium/${condominiumSlug}`)

  return { ...result.data.body }
}
