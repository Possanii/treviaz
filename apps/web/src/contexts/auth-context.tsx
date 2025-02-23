'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react'

import { signOutAction } from '@/actions/auth'
import { useQueryGetUser } from '@/hooks/react-query/queries/get-user'
import { SignUpDto } from '@/schemas/ISign-up'

interface IAuthContextValue {
  user: SignUpDto | null
}

export const AuthContext = createContext<IAuthContextValue>({ user: null })

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { data: user, isLoading } = useQuery(useQueryGetUser())

  if (isLoading) {
    return <>Loading...</>
  }

  if (!user) {
    signOutAction()
    return null
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
