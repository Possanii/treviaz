import { IPayment } from '@treviaz/entities/schemas/IPayment'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { api } from '@/lib/api-client'

export interface IRecentPayments
  extends Pick<
    IPayment,
    'id' | 'amountPaid' | 'paymentMethod' | 'paymentDate'
  > {
  payer: IUser
}

export interface IGetRecentPaymentsResponse {
  recentPayments: IRecentPayments[]
}

export async function getRecentPayments({
  condSlug,
}: {
  condSlug: string
}): Promise<IGetRecentPaymentsResponse> {
  const result = await api.get<{ body: IGetRecentPaymentsResponse }>(
    `/dashboard/${condSlug}/recent-payments`
  )

  return { ...result.data.body }
}
