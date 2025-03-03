import { z } from 'zod'

import { roleSchema } from './IRole'

export const liverDataTable = z.object({
  role: roleSchema,
  joined_at: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar_url: z.string().nullable(),
  }),
})

export type ILiverDataTable = z.infer<typeof liverDataTable>

export const residentsTableSchema = z.object({
  residents: z
    .object({
      users: z.array(liverDataTable),
    })
    .nullable(),
})

export type IResidentsTable = z.infer<typeof residentsTableSchema>
