import { inviteStatusSchema } from '@treviaz/entities/schemas/IInvite'
import { z } from 'zod'

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/components/data-table/schema'
import { getForumThreadsToApproveSchema } from '@/http/forum/get-forum-threads-to-approve'

export const columnSchema = getForumThreadsToApproveSchema

export type ColumnSchema = z.infer<typeof columnSchema>

export const columnFilterSchema = z.object({
  title: z.string().optional(),
  status: inviteStatusSchema
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(inviteStatusSchema)
    .optional(),
  created_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  created_by: z.string().optional(),
})

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>
