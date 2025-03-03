import { z } from 'zod'

export const permissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  created_at: z.date(),
})

export type IPermission = z.infer<typeof permissionSchema>
