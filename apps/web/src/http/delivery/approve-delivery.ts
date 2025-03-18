import { AxiosResponse } from 'axios'

import { IDeliveryStatus } from '@/http/delivery/get-condominium-deliveries'
import { api } from '@/lib/api-client'

export async function updateDeliveryStatus({
  deliveryId,
  status,
}: {
  deliveryId: string
  status: IDeliveryStatus
}): Promise<AxiosResponse> {
  const result = await api.patch(`/delivery/${deliveryId}`, {
    status,
  })

  return result
}
