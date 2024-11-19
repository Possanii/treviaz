import { api } from '@/lib/api-client'

export interface IGetTotalIncomeByMonthResponse {
  totalIncome: number
}

export async function getTotalIncomeByMonth({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalIncomeByMonthResponse> {
  const result = await api.get<{ body: { totalIncome: number } }>(
    `/financial/${condSlug}/total-income`
  )

  return { ...result.data.body }
}
