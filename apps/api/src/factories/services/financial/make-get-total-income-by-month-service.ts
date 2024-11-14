import { GetTotalIncomeByMonthService } from '@/application/services/financial/get-total-income-by-month-service'

export function makeGetTotalIncomeByMonthService() {
  return new GetTotalIncomeByMonthService()
}
