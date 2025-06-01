import { IReserve } from '@treviaz/entities/schemas/IReserve'

import { api } from '@/lib/api-client'
import { formatStringToDate } from '@/utils/format-string-to-date'

export async function getReservesFromCondominium({
  condominiumSlug,
}: {
  condominiumSlug: string
}): Promise<{ reserves: IReserve[] }> {
  const result = await api.get(`/reserves/condominium/${condominiumSlug}`)

  const reserves = formatStringToDate({
    data: result.data.body.reserves,
    fields: ['start_date', 'end_date'],
  })

  return { reserves } as { reserves: IReserve[] }
}
