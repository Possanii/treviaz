'use client'

import { ICondominiumInvitesTable } from '@treviaz/entities/schemas/tables/ICondominium-invites-table'

import { DataTableFilterField, Option } from '@/components/data-table/types'

import { type ColumnSchema } from './schema'

export const statusColor = {
  PENDING: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  ACCEPT: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  DENIED: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
  REVOKED: {
    badge:
      'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10',
    dot: 'bg-[#f97316]',
  },
} as Record<string, Record<'badge' | 'dot', string>>

export function createFilterFields(data: ICondominiumInvitesTable[]) {
  const emailSet = new Set<string>()
  const statusSet = new Set<string>()
  const roleSet = new Set<string>()
  const authorSet = new Set<string>()

  data.forEach((order) => {
    emailSet.add(order.email)
    statusSet.add(order.status)
    roleSet.add(order.role)
    authorSet.add(order.author.name)
  })

  return [
    {
      label: 'Convidado',
      value: 'email',
      type: 'input',
      options: Array.from(emailSet).map((email) => ({
        label: email,
        value: email,
      })),
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
      label: 'Enviado em',
      value: 'sent_at',
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
    {
      label: 'Expira em',
      value: 'expires_at',
      type: 'timerange',
      commandDisabled: true,
    },
    {
      label: 'Author',
      value: 'author',
      type: 'input',
      options: Array.from(authorSet).map((author) => ({
        label: author,
        value: author,
      })),
    },
  ] satisfies DataTableFilterField<ColumnSchema>[]
}
