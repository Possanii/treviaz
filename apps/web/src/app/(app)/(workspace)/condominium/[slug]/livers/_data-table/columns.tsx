'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@treviaz/ui/components/ui/badge'
import { Button } from '@treviaz/ui/components/ui/button'
import { formatDate, isSameDay } from 'date-fns'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { isArrayOfDates } from '@/components/data-table/utils'

import type { ColumnSchema } from './schema'

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: 'name',
    header: 'Morador',
    enableHiding: false,
    accessorFn: (row) => row.user.name,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const value = row.getValue('email') as string

      return <div className="max-w-[200px] truncate">{value}</div>
    },
    accessorFn: (row) => row.user.email,
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
    accessorKey: 'joined_at',
    header: 'Entrou em',
    cell: ({ row }) => {
      const value = row.getValue('joined_at')

      return <p>{formatDate(new Date(`${value}`), 'LLL dd, y HH:mm')}</p>
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
    header: 'More',
    cell: ({ row }) => {
      const { slug } = useParams<{ slug: string }>()

      return (
        <Button size={'sm'} asChild>
          <Link href={`/condominium/${slug}/livers/${row.original.user.id}`}>
            View
          </Link>
        </Button>
      )
    },
    enableHiding: false,
  },
]
