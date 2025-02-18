import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    // DIRECT_URL: z.string().url(),
    JWT_SECRET_KEY: z.string(),
    NODEMAILER_EMAIL_ADDRESS: z.string().email(),
    NODEMAILER_PASSWORD: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_NODE_ENV: z
      .enum(['development', 'production'])
      .default('development'),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL: z.string().url(),
    NEXT_PUBLIC_WEB_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    // DIRECT_URL: process.env.DIRECT_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL:
      process.env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NODEMAILER_EMAIL_ADDRESS: process.env.NODEMAILER_EMAIL_ADDRESS,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    NEXT_PUBLIC_WEB_BASE_URL: process.env.NEXT_PUBLIC_WEB_BASE_URL,
  },
  emptyStringAsUndefined: true,
})
