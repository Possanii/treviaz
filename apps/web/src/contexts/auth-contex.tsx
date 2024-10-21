'use client'

import { useQuery } from '@tanstack/react-query'
import { User } from '@treviaz/supabase/types'
import { createContext } from 'react'

import { useQueryGetUser } from '@/hooks/react-query/queries/get-user'

interface IAuthContextValue {
  user: User | null
}

export const AuthContext = createContext<IAuthContextValue>({ user: null })

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { data: user, isPending } = useQuery(useQueryGetUser())

  return (
    <AuthContext.Provider value={{ user: user ?? null }}>
      {isPending ? <>Loading...</> : children}
    </AuthContext.Provider>
  )
}
