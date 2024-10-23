import { queryOptions } from '@tanstack/react-query'
import { createClient } from '@treviaz/supabase/client'
import { User } from '@treviaz/supabase/types'

export function useQueryGetUser() {
  const supabase = createClient()

  return queryOptions({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> =>
      (await supabase.auth.getUser()).data.user,
    refetchOnMount: false,
  })
}
