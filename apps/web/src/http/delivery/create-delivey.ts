import { api } from '@/lib/api-client'

export type ICreateDeliveryDTO = {
  condominium_id: string
  unitId: string
}

export async function createDelivery(body: ICreateDeliveryDTO) {
  const result = api.post('/delivery', body)

  return result
}
