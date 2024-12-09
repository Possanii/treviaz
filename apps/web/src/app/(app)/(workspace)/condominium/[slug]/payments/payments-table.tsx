'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetRecentPayments } from '@/hooks/react-query/queries/dashboard/get-recent-payments-query'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface IPaymentsTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function PaymentsTable({ searchParams }: IPaymentsTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetRecentPayments({ condSlug: slug })
  )

  const filterFields = createFilterFields(data.recentPayments)

  const search = searchParamsCache.parse(searchParams)

  return (
    <DataTable
      columns={columns}
      data={data.recentPayments}
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
