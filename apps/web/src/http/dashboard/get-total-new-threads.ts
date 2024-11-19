import { api } from '@/lib/api-client'

export interface IGetTotalNewThreadsResponse {
  totalNewThreads: number
}

export async function getTotalNewThreads({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalNewThreadsResponse> {
  const result = await api.get<{ body: IGetTotalNewThreadsResponse }>(
    `/dashboard/${condSlug}/total-new-threads`
  )

  return { ...result.data.body }
}
