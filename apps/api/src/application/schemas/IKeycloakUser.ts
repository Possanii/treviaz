import { z } from 'zod'

export const IKeycloakUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  enabled: z.boolean(),
  emailVerified: z.boolean(),
})
