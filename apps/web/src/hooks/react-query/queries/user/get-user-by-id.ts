import { queryOptions } from '@tanstack/react-query'

import { getUserById } from '@/http/user/get-user-by-id'

export function useQueryGetUserById({
  slug,
  id,
}: {
  slug: string
  id: string
}) {
  return queryOptions({
    queryKey: ['user', slug, id],
    queryFn: async () => await getUserById({ slug, id }),
    enabled: !!slug && !!id,
    refetchOnMount: false,
  })
}
