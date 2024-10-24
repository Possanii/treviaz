import {
  SidebarInset,
  SidebarProvider,
} from '@treviaz/ui/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { AuthProvider } from '@/contexts/auth-context'

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
