import { GetDeliveriesByUserController } from '@/application/controllers/delivery/get-deliveries-by-user-controller'
import { makeGetDeliveriesByUserService } from '@/factories/services/delivery/make-get-deliveries-by-user-service'

export function makeGetDeliveriesByUserController() {
  return new GetDeliveriesByUserController(makeGetDeliveriesByUserService())
} 