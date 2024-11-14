import { GetTotalExpenseByMonthController } from '@/application/controllers/financial/get-total-expense-by-month-controller'
import { makeGetTotalExpenseByMonthService } from '@/factories/services/financial/make-get-total-expense-by-month-service'

export function makeGetTotalExpenseByMonthController() {
  return new GetTotalExpenseByMonthController(
    makeGetTotalExpenseByMonthService()
  )
}
