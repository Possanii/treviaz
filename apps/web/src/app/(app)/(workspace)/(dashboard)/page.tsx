'use client'

import {
  BreadcrumbItem,
  BreadcrumbPage,
} from '@treviaz/ui/components/ui/breadcrumb'
import Image from 'next/image'

import Background from '@/assets/background.jpg'
import { AppHeader } from '@/components/sidebar/app-header'

export default function Home() {
  return (
    <>
      <AppHeader>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <Image
        src={Background}
        alt="Um homem de terno com a mão aberta, segurando alguns prédios"
        width={1920}
        height={1080}
      />
    </>
  )
}
