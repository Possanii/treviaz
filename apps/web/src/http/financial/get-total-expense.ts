import { api } from '@/lib/api-client'

export interface IGetTotalExpenseByMonthResponse {
  totalExpense: number
}

export async function getTotalExpenseByMonth({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalExpenseByMonthResponse> {
  const result = await api.get<{ body: { totalExpense: number } }>(
    `/financial/${condSlug}/total-expense`
  )

  return { ...result.data.body }
}
