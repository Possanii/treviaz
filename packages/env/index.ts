import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_SECRET_KEY: z.string(),
    NODEMAILER_EMAIL_ADDRESS: z.string().email(),
    NODEMAILER_PASSWORD: z.string(),
    KEYCLOAK_URL: z.string().url(),
    KEYCLOAK_REALM: z.string(),
    KEYCLOAK_CLIENT_ID: z.string(),
    KEYCLOAK_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_KEYCLOAK_URL: z.string().url(),
    NEXT_PUBLIC_KEYCLOAK_REALM: z.string(),
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: z.string(),
  },
  shared: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(['development', 'production'])
      .default('development'),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_WEB_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NODEMAILER_EMAIL_ADDRESS: process.env.NODEMAILER_EMAIL_ADDRESS,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    NEXT_PUBLIC_WEB_BASE_URL: process.env.NEXT_PUBLIC_WEB_BASE_URL,
    KEYCLOAK_URL: process.env.KEYCLOAK_URL,
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    NEXT_PUBLIC_KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    NEXT_PUBLIC_KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  },
  emptyStringAsUndefined: true,
})
