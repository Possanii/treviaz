'use client'

import { CreateCondominiumModalProvider } from '@/contexts/create-condominium-modal-context'

export function DashboardProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CreateCondominiumModalProvider>{children}</CreateCondominiumModalProvider>
  )
}
