import { RevokeInviteUserCondominiumModalProvider } from '@/contexts/revoke-invite-user-condominio-modal-context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RevokeInviteUserCondominiumModalProvider>
      {children}
    </RevokeInviteUserCondominiumModalProvider>
  )
}
