import { api } from '@/lib/api-client'

export interface IGetTotalNewLiversResponse {
  totalNewLivers: number
}

export async function getTotalNewLivers({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetTotalNewLiversResponse> {
  const result = await api.get<{ body: IGetTotalNewLiversResponse }>(
    `/dashboard/${condSlug}/total-new-livers`
  )

  return { ...result.data.body }
}
