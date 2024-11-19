import { api } from '@/lib/api-client'

export interface IGetTotalCategorySummaryByMonthResponse {
  totalCategorySummary: Record<string, number>[]
}

export async function getTotalCategorySummaryByMonth({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalCategorySummaryByMonthResponse> {
  const result = await api.get<{
    body: { totalCategorySummary: Record<string, number>[] }
  }>(`/financial/${condSlug}/total-category-summary`)

  return { ...result.data.body }
}
