import { GetAllDeliveriesController } from '@/application/controllers/delivery/get-all-deliveries-controller'
import { makeGetAllDeliveriesService } from '@/factories/services/delivery/make-get-all-deliveries-service'

export function makeGetAllDeliveriesController() {
  return new GetAllDeliveriesController(makeGetAllDeliveriesService())
} 