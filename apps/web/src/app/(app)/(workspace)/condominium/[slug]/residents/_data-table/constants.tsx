'use client'

import { ILiverDataTable } from '@treviaz/entities/schemas/IResidentsTable'

import { DataTableFilterField, Option } from '@/components/data-table/types'

import { type ColumnSchema } from './schema'

export const statusColor = {
  RESIDENT: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  ADMIN: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  SYNDIC: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
  BILLING: {
    badge:
      'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10',
    dot: 'bg-[#f97316]',
  },
  SERVICES: {
    badge:
      'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10',
    dot: 'bg-[#f97316]',
  },
} as Record<string, Record<'badge' | 'dot', string>>

export function createFilterFields(data: ILiverDataTable[]) {
  const nameSet = new Set<string>()
  const emailSet = new Set<string>()
  const roleSet = new Set<string>()

  data.forEach((order) => {
    nameSet.add(order.user.name)
    emailSet.add(order.user.email)
    roleSet.add(order.role.name)
  })

  return [
    {
      label: 'Morador',
      value: 'name',
      type: 'input',
      options: Array.from(nameSet).map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      label: 'Email',
      value: 'email',
      type: 'input',
      options: Array.from(emailSet).map((email) => ({
        label: email,
        value: email,
      })),
    },
    {
      label: 'Entrou em',
      value: 'joined_at',
      type: 'timerange',
      commandDisabled: true,
    },
    {
      label: 'Cargo',
      value: 'role',
      type: 'checkbox',
      commandDisabled: true,
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
      options: Array.from(roleSet).map((role) => ({
        label: role,
        value: role,
      })),
    },
  ] satisfies DataTableFilterField<ColumnSchema>[]
}
