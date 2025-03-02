import { GetNewResidentsByMonthController } from '@/application/controllers/dashboard/get-new-residents-by-month-controller'
import { makeGetNewResidentsByMonthService } from '@/factories/services/dashboard/make-get-new-residents-by-month-service'

export function makeGetNewResidentsByMonthController() {
  return new GetNewResidentsByMonthController(
    makeGetNewResidentsByMonthService()
  )
}
