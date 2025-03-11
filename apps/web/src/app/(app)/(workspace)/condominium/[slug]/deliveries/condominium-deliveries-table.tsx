'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetCondominiumDeliveries } from '@/hooks/react-query/queries/delivery/get-condominium-deliveries'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface ICondominiumDeliveriesTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function CondominiumDeliveriesTable({
  searchParams,
}: ICondominiumDeliveriesTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetCondominiumDeliveries({ condominiumSlug: slug })
  )

  const filterFields = createFilterFields(data.deliveries)

  const search = searchParamsCache.parse(searchParams)

  return (
    <div className="grid gap-6">
      <DataTable
        columns={columns}
        data={data.deliveries}
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
