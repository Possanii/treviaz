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

import { BlogCardPost } from '@/components/blog-card-post'
import { isArrayOfDates } from '@/components/data-table/utils'

import { DropdownForumThreadApproveActions } from './_components/dropdown-forum-thread-approve-actions'
import { statusColor } from './constants'
import type { ColumnSchema } from './schema'

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'title',
    header: 'Post',
    cell: ({ row }) => {
      const post = row.original

      return (
        <div className="max-w-[320px]">
          <BlogCardPost {...post} />
        </div>
      )
    },
    meta: {
      label: 'Post',
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
    accessorKey: 'created_at',
    header: 'Criado em',
    cell: ({ row }) => {
      const value = row.getValue('created_at')

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
  {
    accessorKey: 'created_by',
    header: 'Autor',
    accessorFn: (row) => row.created_by.name,
    cell: ({ row }) => {
      const author = row.original.created_by

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
          <span className="text-lg">{author.name}</span>
        </div>
      )
    },
  },
  {
    header: 'More',
    cell: ({ row }) => {
      return (
        <DropdownForumThreadApproveActions threadSlug={row.original.slug} />
      )
    },
    enableHiding: false,
  },
]
