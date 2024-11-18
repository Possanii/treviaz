import { GetNewLiversByMonthController } from '@/application/controllers/dashboard/get-new-livers-by-month-controller'
import { makeGetNewLiversByMonthService } from '@/factories/services/dashboard/make-get-new-livers-by-month-service'

export function makeGetNewLiversByMonthController() {
  return new GetNewLiversByMonthController(makeGetNewLiversByMonthService())
}
