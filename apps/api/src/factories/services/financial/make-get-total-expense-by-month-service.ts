import { GetTotalExpenseByMonthService } from '@/application/services/financial/get-total-expense-by-month-service'

export function makeGetTotalExpenseByMonthService() {
  return new GetTotalExpenseByMonthService()
}
