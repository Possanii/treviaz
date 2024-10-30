import { api } from '@/lib/api-client'

export async function acceptInvite({
  token,
}: {
  token: string
}): Promise<void> {
  const result = await api.post(`/invite/${token}`)

  return { ...result.data.body }
}
