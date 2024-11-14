import { GetTotalIncomeByMonthController } from '@/application/controllers/financial/get-total-income-by-month-controller'
import { makeGetTotalIncomeByMonthService } from '@/factories/services/financial/make-get-total-income-by-month-service'

export function makeGetTotalIncomeByMonthController() {
  return new GetTotalIncomeByMonthController(makeGetTotalIncomeByMonthService())
}
