import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@treviaz/ui/components/ui/breadcrumb'

import { AppHeader } from '@/components/sidebar/app-header'
import { getCurrentCondominium } from '@/utils/utils'

export default async function LiversPages() {
  const slug = getCurrentCondominium()

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
