import { api } from '@/lib/api-client'

export interface IGetTotalCategorySummaryByMonthResponse {
  totalCategorySummary: {
    name: string
    type: 'INCOME' | 'EXPENSE'
    total: number
  }[]
}

export async function getTotalCategorySummaryByMonth({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalCategorySummaryByMonthResponse> {
  const result = await api.get<{
    body: {
      totalCategorySummary: {
        name: string
        type: 'INCOME' | 'EXPENSE'
        total: number
      }[]
    }
  }>(`/financial/${condSlug}/total-category-summary`)

  return { ...result.data.body }
}
