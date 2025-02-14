import { z, ZodError, ZodSchema } from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'

export function zodValidator<T extends ZodSchema>(
  schame: T,
  data: Record<string, any>
): z.infer<T> {
  try {
    return schame.parse(data)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UnprocessableEntityError(
        'zod',
        'Invalid data',
        error.flatten().fieldErrors
      )
    }
    throw new UnprocessableEntityError('zod', 'Invalid data', { error })
  }
}
