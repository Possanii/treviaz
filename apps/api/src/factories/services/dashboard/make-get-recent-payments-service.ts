import { GetRecentPaymentsService } from '@/application/services/dashboard/get-recent-payments-service'

export function makeGetRecentPaymentsService() {
  return new GetRecentPaymentsService()
}
