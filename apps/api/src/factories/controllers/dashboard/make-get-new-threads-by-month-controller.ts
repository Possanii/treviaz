import { GetNewThreadsByMonthController } from '@/application/controllers/dashboard/get-new-threads-by-month-controller'
import { makeGetNewThreadsByMonthService } from '@/factories/services/dashboard/make-get-new-threads-by-month-service'

export function makeGetNewThreadsByMonthController() {
  return new GetNewThreadsByMonthController(makeGetNewThreadsByMonthService())
}
