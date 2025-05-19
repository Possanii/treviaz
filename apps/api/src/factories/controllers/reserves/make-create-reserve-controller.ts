import { CreateReserveController } from '@/application/controllers/reserve/create-reserve-controller'
import { makeCreateReserveService } from '@/factories/services/reserves/make-create-reserve-service'

export function makeCreateReserveController() {
  return new CreateReserveController(makeCreateReserveService())
}
