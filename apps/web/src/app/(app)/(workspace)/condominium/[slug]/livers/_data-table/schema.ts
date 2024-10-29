import { liverDataTable } from '@treviaz/entities/schemas/ILiversTable'
import { roleSchema } from '@treviaz/entities/schemas/IRole'
import { z } from 'zod'

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/components/data-table/schema'

export const columnSchema = liverDataTable

export type ColumnSchema = z.infer<typeof columnSchema>

export const columnFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: roleSchema
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(roleSchema)
    .optional(),
  joined_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
})

export type ColumnFilterSchema = z.infer<typeof columnFilterSchema>
