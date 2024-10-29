import { InviteUserCondominiumModalProvider } from '@/contexts/invite-user-condominio-modal-context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <InviteUserCondominiumModalProvider>
      {children}
    </InviteUserCondominiumModalProvider>
  )
}
