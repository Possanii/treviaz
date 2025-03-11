import { CreateDeliveryController } from '@/application/controllers/delivery/create-delivery-controller'
import { makeCreateDeliveryService } from '@/factories/services/delivery/make-create-delivery-service'

export function makeCreateDeliveryController() {
  return new CreateDeliveryController(makeCreateDeliveryService())
} 