import { GetTotalCategorySummaryService } from '@/application/services/financial/get-total-by-category-summary-service'

export function makeGetTotalCategorySummaryService() {
  return new GetTotalCategorySummaryService()
}
