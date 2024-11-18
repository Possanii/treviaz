import { GetNewLiversByMonthService } from '@/application/services/dashboard/get-new-livers-by-month-service'

export function makeGetNewLiversByMonthService() {
  return new GetNewLiversByMonthService()
}
