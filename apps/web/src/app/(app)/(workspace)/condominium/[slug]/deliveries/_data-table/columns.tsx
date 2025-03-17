'use client'

import { type ColumnDef } from '@tanstack/react-table'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Badge } from '@treviaz/ui/components/ui/badge'
import { formatRelative, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { isArrayOfDates } from '@/components/data-table/utils'
import { getNameInitial } from '@/utils/get-name-initials'

import { statusColor } from './constants'
import type { ColumnSchema } from './schema'

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'user',
    header: 'Morador',
    cell: ({ row }) => {
      const rowInfo = row.original
      return (
        <div key={rowInfo.user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={rowInfo.user.avatar_url || undefined}
              alt={rowInfo.user.name}
            />
            <AvatarFallback>{getNameInitial(rowInfo.user.name)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {rowInfo.user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {rowInfo.user.email}
            </p>
          </div>
        </div>
      )
    },
    accessorFn: (row) => row.user.name,
    meta: {
      label: 'Morador',
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status') as string
      return <Badge className={statusColor[value].badge}>{value}</Badge>
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string
      if (typeof value === 'string')
        return rowValue.toUpperCase().includes(value.toUpperCase())
      // up to the user to define either `.some` or `.every`
      if (Array.isArray(value))
        return value.some((i) =>
          rowValue.toUpperCase().includes(i.toUpperCase())
        )
      return false
    },
    meta: {
      label: 'Status',
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      const value = row.getValue('createdAt')

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
      label: 'Criado em',
    },
  },
  // {
  //   header: 'More',
  //   cell: ({ row }) => {
  //     return (
  //       <DropdownForumThreadApproveActions threadSlug={row.original.slug} />
  //     )
  //   },
  //   enableHiding: false,
  // },
]
