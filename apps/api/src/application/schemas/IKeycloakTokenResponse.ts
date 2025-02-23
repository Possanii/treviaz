import z from 'zod'

export const IKeycloakTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_expires_in: z.number(),
  refresh_token: z.string(),
  token_type: z.string(),
  id_token: z.string(),
  'not-before-policy': z.number(),
  session_state: z.string(),
  scope: z.string(),
})
