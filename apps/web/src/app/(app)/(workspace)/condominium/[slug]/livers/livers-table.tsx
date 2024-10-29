'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetLiversFromCondominiumBySlug } from '@/hooks/react-query/queries/get-livers-from-condominium-by-slug'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface ILiversTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function LiversTable({ searchParams }: ILiversTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetLiversFromCondominiumBySlug({ slug })
  )

  const filterFields = createFilterFields(data.livers!.users)

  const search = searchParamsCache.parse(searchParams)

  return (
    <DataTable
      columns={columns}
      data={data.livers!.users}
      filterFields={filterFields}
      defaultColumnFilters={Object.entries(search)
        .map(([key, value]) => ({
          id: key,
          value,
        }))
        .filter(({ value }) => value ?? undefined)}
    />
  )
}
