import {
  SidebarInset,
  SidebarProvider,
} from '@treviaz/ui/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { AuthProvider } from '@/contexts/auth-context'

import { DashboardProviders } from './providers'

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardProviders>
          <AppSidebar />
          <SidebarInset>
            <main className="flex flex-1 flex-col gap-4 min-h-screen">
              {children}
            </main>
          </SidebarInset>
        </DashboardProviders>
      </SidebarProvider>
    </AuthProvider>
  )
}
