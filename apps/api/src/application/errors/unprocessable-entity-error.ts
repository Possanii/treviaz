import BaseError from './base-error'

export class UnprocessableEntityError extends BaseError {
  constructor(
    resource: string,
    message: string,
    body?: Record<string, unknown>
  ) {
    super(422, `unprocessableEntity.${resource}`, message, { errors: body })
  }
}
