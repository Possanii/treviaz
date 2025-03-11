'use client'

import { DataTableFilterField, Option } from '@/components/data-table/types'
import { IGetCondominiumDeliveries } from '@/http/delivery/get-condominium-deliveries'

import { type ColumnSchema } from './schema'

export const statusColor = {
  DELIVERED: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  PENDING: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  CANCELLED: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
} as Record<string, Record<'badge' | 'dot', string>>

export function createFilterFields(data: IGetCondominiumDeliveries[]) {
  const statusSet = new Set<string>()
  const userSet = new Set<string>()

  data.forEach((row) => {
    statusSet.add(row.status)
  })

  return [
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
      value: 'createdAt',
      type: 'timerange',
      commandDisabled: true,
    },
  ] satisfies DataTableFilterField<ColumnSchema>[]
}
