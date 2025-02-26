'use client'

import { useQuery } from '@tanstack/react-query'
import { IUser } from '@treviaz/entities/schemas/IUser'
import { useRouter } from 'next/navigation'
import { createContext } from 'react'

import { useQueryGetUser } from '@/hooks/react-query/queries/get-user'

interface IAuthContextValue {
  user: IUser | null
}

export const AuthContext = createContext<IAuthContextValue>({ user: null })

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { data: user, isLoading } = useQuery(useQueryGetUser())
  const router = useRouter()

  if (isLoading) {
    return <>Loading...</>
  }

  if (!user) {
    router.replace('/api/auth/sign-out')
    return null
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
