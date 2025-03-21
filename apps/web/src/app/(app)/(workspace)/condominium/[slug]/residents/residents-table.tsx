'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import { useParams } from 'next/navigation'

import { useModalInviteUserCondominium } from '@/contexts/invite-user-condominio-modal-context'
import { useQueryGetresidentsFromCondominiumBySlug } from '@/hooks/react-query/queries/get-residents-from-condominium-by-slug'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface IresidentsTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function ResidentsTable({ searchParams }: IresidentsTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetresidentsFromCondominiumBySlug({ slug })
  )

  const filterFields = createFilterFields(data.residents!.users)

  const search = searchParamsCache.parse(searchParams)

  const { toggleModal } = useModalInviteUserCondominium()

  return (
    <div className="grid gap-6">
      <Button className="ml-auto max-w-fit" onClick={toggleModal}>
        Convidar morador
      </Button>
      <DataTable
        columns={columns}
        data={data.residents!.users}
        filterFields={filterFields}
        defaultColumnFilters={Object.entries(search)
          .map(([key, value]) => ({
            id: key,
            value,
          }))
          .filter(({ value }) => value ?? undefined)}
      />
    </div>
  )
}
