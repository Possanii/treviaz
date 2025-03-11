import { UpdateDeliveryStatusService } from '@/application/services/delivery/update-delivery-status-service'

export function makeUpdateDeliveryStatusService() {
  return new UpdateDeliveryStatusService()
} 