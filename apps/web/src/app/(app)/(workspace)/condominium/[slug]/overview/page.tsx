import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'

import { AppHeader } from '@/components/sidebar/app-header'

import { OverViewPage } from './_components/overview'

export const metadata = {
  title: 'Dashboard : Overview',
}

export default async function page({ params }: { params: { slug: string } }) {
  return (
    <>
      <AppHeader>
        <BreadcrumbItem>
          <BreadcrumbLink href="/condominium">Condominio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/condominium/${params.slug}`}>
            {params.slug}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Overview</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <section className="p-[--main-content-padding]">
        <OverViewPage params={params} />
      </section>
    </>
  )
}
