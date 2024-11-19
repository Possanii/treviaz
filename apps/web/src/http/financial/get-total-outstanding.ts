import { api } from '@/lib/api-client'

export interface IGetTotalOutstandingByMonthResponse {
  totalOutstanding: number
}

export async function getTotalOutstandingByMonth({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalOutstandingByMonthResponse> {
  const result = await api.get<{ body: { totalOutstanding: number } }>(
    `/financial/${condSlug}/total-outstanding`
  )

  return { ...result.data.body }
}
