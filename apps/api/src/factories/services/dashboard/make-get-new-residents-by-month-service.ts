import { GetNewResidentsByMonthService } from '@/application/services/dashboard/get-new-residents-by-month-service'

export function makeGetNewResidentsByMonthService() {
  return new GetNewResidentsByMonthService()
}
