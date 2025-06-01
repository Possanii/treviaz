import { inviteStatusSchema } from '@treviaz/entities/schemas/IInvite'
import { roleSchema } from '@treviaz/entities/schemas/IRole'
import { condominiumInvitesTableSchema } from '@treviaz/entities/schemas/tables/ICondominium-invites-table'
import { z } from 'zod'

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/components/data-table/schema'

export const columnSchema = condominiumInvitesTableSchema

export type ColumnSchema = z.infer<typeof columnSchema>

export const columnFilterSchema = z.object({
  email: z.string().optional(),
  status: inviteStatusSchema
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(inviteStatusSchema)
    .optional(),
  sent_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  role: roleSchema
    .transform((val) => val.name.split(ARRAY_DELIMITER))
    .pipe(roleSchema)
    .optional(),
  expires_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  author: z.string().optional(),
})

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>
