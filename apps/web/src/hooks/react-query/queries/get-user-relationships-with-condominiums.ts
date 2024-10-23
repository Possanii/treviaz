import { queryOptions } from '@tanstack/react-query'

import {
  getAllUsersRelantioshipsWithCondominiums,
  IGetUserRelationshipsWithCondominiums,
} from '@/http/user/get-user-relantionships-with-condominiums'

export function useQueryGetRelationshipsWithCondominiums() {
  return queryOptions({
    queryKey: ['relantionships', 'user', 'condominiums'],
    queryFn: async (): Promise<{
      relantionships: IGetUserRelationshipsWithCondominiums[]
    }> => await getAllUsersRelantioshipsWithCondominiums(),
    refetchOnMount: false,
  })
}
