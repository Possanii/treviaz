import { IReserve } from '@treviaz/entities/schemas/IReserve'

import { api } from '@/lib/api-client'

export async function createReserve({
  leisureAreaId,
  body,
}: {
  leisureAreaId: string
  body: Pick<IReserve, 'start_date' | 'end_date'>
}): Promise<void> {
  const result = await api.post(`/reserves`, { id: leisureAreaId, ...body })

  return { ...result.data.body }
}
