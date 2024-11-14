import { GetTotalOutstandingService } from '@/application/services/financial/get-total-outstanding-service'

export function makeGetTotalOutstandingService() {
  return new GetTotalOutstandingService()
}
