import { GetRecentPaymentsController } from '@/application/controllers/dashboard/get-recent-payments-controller'
import { makeGetRecentPaymentsService } from '@/factories/services/dashboard/make-get-recent-payments-service'

export function makeGetRecentPaymentsController() {
  return new GetRecentPaymentsController(makeGetRecentPaymentsService())
}
