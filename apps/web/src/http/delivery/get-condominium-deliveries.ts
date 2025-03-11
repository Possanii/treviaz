import { z } from 'zod'

import { api } from '@/lib/api-client'
import { formatStringToDate } from '@/utils/format-string-to-date'

export const deliveryStatusSchema = z.enum([
  'PENDING',
  'DELIVERED',
  'CANCELLED',
])

export const getCondominiumDeliveriesSchema = z.object({
  id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: deliveryStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type IGetCondominiumDeliveries = z.infer<
  typeof getCondominiumDeliveriesSchema
>

export async function getCondominiumDeliveries({
  condominiumSlug,
}: {
  condominiumSlug: string
}): Promise<{ deliveries: IGetCondominiumDeliveries[] }> {
  const result = await api.get<{
    body: { deliveries: IGetCondominiumDeliveries[] }
  }>(`/delivery/condominium/${condominiumSlug}`)

  const formatedDeliveries = formatStringToDate({
    data: result.data.body.deliveries,
    fields: ['createdAt', 'updatedAt'],
  })

  return { deliveries: formatedDeliveries }
}
