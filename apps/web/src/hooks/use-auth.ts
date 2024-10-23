import { useContext } from 'react'

import { AuthContext } from '@/contexts/auth-context'

export function useAuth() {
  const contextValue = useContext(AuthContext)

  if (!contextValue) {
    throw new Error('useUser must be used inside an AuthContext.')
  }

  return contextValue
}
