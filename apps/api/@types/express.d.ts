import { ISupabaseJwtSchema } from '@/application/schemas/ISupabase-jwt-payload'

declare namespace Express {
  interface Request {
    metadata?: {
      user?: ISupabaseJwtSchema
    }
  }
}
