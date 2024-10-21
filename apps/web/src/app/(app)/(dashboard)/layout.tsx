import { AuthProvider } from '@/contexts/auth-context'

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
