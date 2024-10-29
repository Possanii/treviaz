import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'

import { AppHeader } from '@/components/sidebar/app-header'

export default async function LiversPages({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  return (
    <div>
      <AppHeader>
        <BreadcrumbItem>
          <BreadcrumbLink href="/condominium">Condominio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/condominium/${slug}`}>{slug}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbPage>Moradores</BreadcrumbPage>
        </BreadcrumbItem>
      </AppHeader>
      <p>{slug}</p>
    </div>
  )
}
