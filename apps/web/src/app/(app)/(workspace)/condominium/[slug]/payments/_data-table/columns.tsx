'use client'

import { type ColumnDef } from '@tanstack/react-table'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { formatRelative, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { isArrayOfDates } from '@/components/data-table/utils'
import { formatCurrency } from '@/utils/format-currency'
import { getNameInitial } from '@/utils/get-name-initials'

import type { ColumnSchema } from './schema'

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'payer',
    header: 'Pagante',
    enableHiding: false,
    accessorFn: (row) => row.payer.name,
    cell: ({ row }) => {
      const payer = row.original.payer
      return (
        <div key={payer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={payer.avatar_url || undefined} alt={payer.name} />
            <AvatarFallback>{getNameInitial(payer.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payer.name}</p>
            <p className="text-sm text-muted-foreground">{payer.email}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'amountPaid',
    header: 'Total pago',
    cell: ({ row }) => {
      const value = row.getValue('amountPaid') as number

      return <div className="ml-auto font-medium">+{formatCurrency(value)}</div>
    },
    enableColumnFilter: false,
    meta: {
      label: 'Total pago',
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Pago com',
    meta: {
      label: 'Pago Com',
    },
  },
  {
    accessorKey: 'paymentDate',
    header: 'Pago em',
    cell: ({ row }) => {
      const value = row.getValue('paymentDate')

      return (
        <p>
          {formatRelative(new Date(`${value}`), new Date(), {
            locale: ptBR,
          })}
        </p>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id)
      if (value instanceof Date && rowValue instanceof Date) {
        return isSameDay(value, rowValue)
      }
      if (Array.isArray(value)) {
        if (isArrayOfDates(value) && rowValue instanceof Date) {
          const sorted = value.sort((a, b) => a.getTime() - b.getTime())
          // TODO: check length
          return (
            sorted[0]?.getTime() <= rowValue.getTime() &&
            rowValue.getTime() <= sorted[1]?.getTime()
          )
        }
      }
      return false
    },
    meta: {
      label: 'Pago em',
    },
  },
]
