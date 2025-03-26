import { CreateDeliveryController } from '@/application/controllers/delivery/create-delivery-controller'
import { makeGetCondominiumBySlugService } from '@/factories/services/condominium/make-get-condominium-by-slug-service'
import { makeCreateDeliveryService } from '@/factories/services/delivery/make-create-delivery-service'

export function makeCreateDeliveryController() {
  return new CreateDeliveryController(
    makeGetCondominiumBySlugService(),
    makeCreateDeliveryService()
  )
}
