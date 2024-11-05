'use client'

import { DataTableFilterField, Option } from '@/components/data-table/types'
import { IGetForumThreadsToApprove } from '@/http/forum/get-forum-threads-to-approve'

import { type ColumnSchema } from './schema'

export const statusColor = {
  APPROVED: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  PENDING: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  DENIED: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
} as Record<string, Record<'badge' | 'dot', string>>

export function createFilterFields(data: IGetForumThreadsToApprove[]) {
  const statusSet = new Set<string>()
  const userSet = new Set<string>()

  data.forEach((row) => {
    statusSet.add(row.status)
    userSet.add(row.created_by.name)
  })

  return [
    {
      label: 'Post',
      value: 'title',
      type: 'input',
      commandDisabled: true,
    },
    {
      label: 'Status',
      value: 'status',
      type: 'checkbox',
      component: (props: Option) => {
        if (typeof props.value === 'boolean') return null
        if (typeof props.value === 'undefined') return null
        return (
          <div className="flex w-full items-center justify-between gap-2">
            <span className="truncate font-normal">{props.value}</span>
            <span
              className={`h-2 w-2 rounded-full ${statusColor[props.value]?.dot}`}
            />
          </div>
        )
      },
      options: Array.from(statusSet).map((status) => ({
        label: status,
        value: status,
      })),
    },
    {
      label: 'Criado em',
      value: 'created_at',
      type: 'timerange',
      commandDisabled: true,
    },
    {
      label: 'Author',
      value: 'created_by',
      type: 'input',
      options: Array.from(userSet).map((author) => ({
        label: author,
        value: author,
      })),
    },
  ] satisfies DataTableFilterField<ColumnSchema>[]
}
