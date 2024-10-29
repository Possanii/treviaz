'use client'

import {
  BreadcrumbItem,
  BreadcrumbPage,
} from '@treviaz/ui/components/ui/breadcrumb'

import { AppHeader } from '@/components/sidebar/app-header'
import { useAuth } from '@/hooks/use-auth'

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <AppHeader>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding]">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </section>
    </>
  )
}
