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

import { DropdownInvitesActions } from './_components/dropdown-invites-actions'
import { statusColor } from './constants'
import type { ColumnSchema } from './schema'

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const value = row.getValue('email') as string

      return <div className="max-w-[200px] truncate">{value}</div>
    },
    meta: {
      label: 'Email',
    },
  },
  {
    accessorKey: 'role',
    header: 'Cargo',
    cell: ({ row }) => {
      const value = row.getValue('role') as string
      return <Badge>{value}</Badge>
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
      label: 'Cargo',
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status') as string
      return <Badge className={statusColor[value]?.badge ?? ''}>{value}</Badge>
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
    accessorKey: 'sent_at',
    header: 'Enviado em',
    cell: ({ row }) => {
      const value = row.getValue('sent_at')

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
      label: 'Entrou em',
    },
  },
  {
    accessorKey: 'expires_at',
    header: 'Expira em',
    cell: ({ row }) => {
      const value = row.getValue('expires_at')

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
      label: 'Expira em',
    },
  },
  {
    accessorKey: 'author',
    header: 'Autor',
    accessorFn: (row) => row.author.name,
    cell: ({ row }) => {
      const author = row.original.author

      return (
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={author.avatar_url ?? undefined}
              alt={author.name}
            />
            <AvatarFallback>
              {author.name
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-lg">{author.name}</span>
            <span className="text-xs font-light">
              {author.condominiums[0].role}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    header: 'More',
    cell: ({ row }) => {
      if (row.original.status === 'PENDING') {
        return <DropdownInvitesActions inviteId={row.original.id} />
      }

      return <span>Sem ações</span>
    },
    enableHiding: false,
  },
]
