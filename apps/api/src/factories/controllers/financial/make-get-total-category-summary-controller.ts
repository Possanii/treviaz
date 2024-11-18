import { GetTotalCategorySummaryController } from '@/application/controllers/financial/get-total-category-summary-controller'
import { makeGetTotalCategorySummaryService } from '@/factories/services/financial/make-get-total-category-summary-service'

export function makeGetTotalCategorySummaryController() {
  return new GetTotalCategorySummaryController(
    makeGetTotalCategorySummaryService()
  )
}
