import { GetNewThreadsByMonthService } from '@/application/services/dashboard/get-new-threads-by-month-service'

export function makeGetNewThreadsByMonthService() {
  return new GetNewThreadsByMonthService()
}
