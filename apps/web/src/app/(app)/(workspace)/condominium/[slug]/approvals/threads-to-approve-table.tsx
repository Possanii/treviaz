'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetForumThreadsToApprove } from '@/hooks/react-query/queries/forum/get-forum-threads-to-approve'

import { columns } from './_data-table/columns'
import { createFilterFields } from './_data-table/constants'
import { DataTable } from './_data-table/data-table'
import { searchParamsCache } from './_data-table/search-params'

interface IThreadsToApproveTableProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function ThreadsToApproveTable({
  searchParams,
}: IThreadsToApproveTableProps) {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(
    useQueryGetForumThreadsToApprove({ condominiumSlug: slug })
  )

  const filterFields = createFilterFields(data.threads)

  const search = searchParamsCache.parse(searchParams)

  return (
    <div className="grid gap-6">
      <DataTable
        columns={columns}
        data={data.threads}
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
