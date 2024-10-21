import { AuthProvider } from '@/contexts/auth-contex'

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
