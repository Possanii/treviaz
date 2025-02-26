import { queryOptions } from '@tanstack/react-query'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { getMe } from '@/http/user/get-me'

export function useQueryGetUser() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: async (): Promise<IUser | null> => await getMe(),
    refetchOnMount: false,
  })
}
