'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetAllInvitesBySlugCondominium } from '@/hooks/react-query/queries/invites/get-all-invites-by-slug-condominium'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface IInvitesTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function InvitesTable({ searchParams }: IInvitesTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetAllInvitesBySlugCondominium({ slug })
  )

  const filterFields = createFilterFields(data.invites)

  const search = searchParamsCache.parse(searchParams)

  return (
    <div className="grid gap-6">
      <DataTable
        columns={columns}
        data={data.invites}
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
