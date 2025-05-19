import { z } from 'zod'

import { leisureAreaSchema } from './ILeisureArea.ts'
import { userSchema } from './IUser.ts'

export const reserveStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
])

export const reserveSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  start_date: z.union([
    z.coerce.date(),
    z.string().transform((date) => new Date(date)),
  ]),
  end_date: z.union([
    z.coerce.date(),
    z.string().transform((date) => new Date(date)),
  ]),
  status: reserveStatusSchema,
})

export type IReserve = z.infer<typeof reserveSchema>

export const leisureAreaReserveSchema = reserveSchema
  .merge(leisureAreaSchema.pick({ photo_url: true }))
  .merge(
    userSchema.pick({
      id: true,
      avatar_url: true,
      name: true,
    })
  )

export type ILeisureAreaReserve = z.infer<typeof leisureAreaReserveSchema>
