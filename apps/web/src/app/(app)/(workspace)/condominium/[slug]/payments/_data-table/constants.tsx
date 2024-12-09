'use client'

import { DataTableFilterField } from '@/components/data-table/types'
import { IRecentPayments } from '@/http/dashboard/get-recent-payments'

import { type ColumnSchema } from './schema'

export function createFilterFields(data: IRecentPayments[]) {
  const payerSet = new Set<string>()
  const amountPaidSet = new Set<number>()
  const paymentMethodSet = new Set<string>()

  data.forEach((order) => {
    payerSet.add(order.payer.name)
    amountPaidSet.add(order.amountPaid)
    paymentMethodSet.add(order.paymentMethod)
  })

  return [
    {
      label: 'Pagante',
      value: 'payer',
      type: 'input',
      options: Array.from(payerSet).map((name) => ({
        label: name,
        value: name,
      })),
    },
    {
      label: 'Total pago',
      value: 'amountPaid',
      type: 'input',
      options: Array.from(amountPaidSet).map((email) => ({
        label: email.toPrecision(2),
        value: email,
      })),
    },
    {
      label: 'Pago com',
      value: 'paymentMethod',
      type: 'input',
      options: Array.from(paymentMethodSet).map((email) => ({
        label: email,
        value: email,
      })),
    },
    {
      label: 'Pago em',
      value: 'paymentDate',
      type: 'timerange',
      commandDisabled: true,
    },
  ] satisfies DataTableFilterField<ColumnSchema>[]
}
