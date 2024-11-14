import { GetTotalOutstandingController } from '@/application/controllers/financial/get-total-outstanding-controller'
import { makeGetTotalOutstandingService } from '@/factories/services/financial/make-get-total-outstanding-service'

export function makeGetTotalOutstandingController() {
  return new GetTotalOutstandingController(makeGetTotalOutstandingService())
}
