import { inviteStatusSchema } from '@treviaz/entities/schemas/IInvite'
import { z } from 'zod'

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/components/data-table/schema'
import {
  deliveryStatusSchema,
  getCondominiumDeliveriesSchema,
} from '@/http/delivery/get-condominium-deliveries'

export const columnSchema = getCondominiumDeliveriesSchema

export type ColumnSchema = z.infer<typeof columnSchema>

export const columnFilterSchema = z.object({
  status: deliveryStatusSchema
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(inviteStatusSchema)
    .optional(),
  createdAt: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  updatedAt: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
})

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>
