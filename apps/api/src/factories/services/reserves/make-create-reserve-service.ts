import { CreateReserveService } from '@/application/services/reserve/create-reserve-service'

export function makeCreateReserveService() {
  return new CreateReserveService()
}
