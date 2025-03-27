import { api } from '@/lib/api-client'

export type ICreateDeliveryDTO = {
  condominiumSlug: string
  unitId: string
}

export async function createDelivery({
  condominiumSlug,
  unitId,
}: ICreateDeliveryDTO) {
  const result = api.post(`/delivery/${condominiumSlug}`, { unitId })

  return result
}
