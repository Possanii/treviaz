import { GetDeliveriesByCondominiumController } from '@/application/controllers/delivery/get-deliveries-by-condominium-controller'
import { makeGetDeliveriesByCondominiumService } from '@/factories/services/delivery/make-get-deliveries-by-condominium-service'

export function makeGetDeliveriesByCondominiumController() {
  return new GetDeliveriesByCondominiumController(makeGetDeliveriesByCondominiumService())
} 