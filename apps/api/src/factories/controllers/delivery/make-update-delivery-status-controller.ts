import { UpdateDeliveryStatusController } from '@/application/controllers/delivery/update-delivery-status-controller'
import { makeUpdateDeliveryStatusService } from '@/factories/services/delivery/make-update-delivery-status-service'

export function makeUpdateDeliveryStatusController() {
  return new UpdateDeliveryStatusController(makeUpdateDeliveryStatusService())
} 