import { CreateDeliveryService } from '@/application/services/delivery/create-delivery-service'

export function makeCreateDeliveryService() {
  return new CreateDeliveryService()
} 