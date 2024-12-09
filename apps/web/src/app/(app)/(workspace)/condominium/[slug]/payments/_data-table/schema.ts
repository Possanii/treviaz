import { paymentSchema } from '@treviaz/entities/schemas/IPayment'
import { userSchema } from '@treviaz/entities/schemas/IUser'
import { z } from 'zod'

import { RANGE_DELIMITER } from '@/components/data-table/schema'

export const columnSchema = z
  .object({
    payer: userSchema,
  })
  .merge(
    paymentSchema.omit({
      createdAt: true,
    })
  )

export type ColumnSchema = z.infer<typeof columnSchema>

export const columnFilterSchema = z.object({
  payer: z.string().optional(),
  amountPaid: z.coerce.number().optional(),
  paymentMethod: z.string().optional(),
  paymentDate: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
})

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>
