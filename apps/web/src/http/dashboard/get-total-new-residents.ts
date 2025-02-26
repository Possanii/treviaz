import { api } from '@/lib/api-client'

export interface IGetTotalNewresidentsResponse {
  totalNewresidents: number
}

export async function getTotalNewresidents({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalNewresidentsResponse> {
  const result = await api.get<{ body: IGetTotalNewresidentsResponse }>(
    `/dashboard/${condSlug}/total-new-residents`
  )

  return { ...result.data.body }
}
