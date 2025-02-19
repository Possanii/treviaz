import { z } from 'zod'

export const keycloakJwtSchema = z.object({
  exp: z.number(),
  iat: z.number(),
  auth_time: z.number(),
  jti: z.string(),
  iss: z.string(),
  aud: z.string(),
  sub: z.string(),
  typ: z.string(),
  azp: z.string(),
  session_state: z.string(),
  acr: z.string(),
  'allowed-origins': z.array(z.string()),
  realm_access: z.object({
    roles: z.array(z.string())
  }),
  resource_access: z.record(z.object({
    roles: z.array(z.string())
  })),
  scope: z.string(),
  sid: z.string(),
  email_verified: z.boolean(),
  name: z.string(),
  preferred_username: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  email: z.string()
})

export type IKeycloakJwtPayload = z.infer<typeof keycloakJwtSchema> 