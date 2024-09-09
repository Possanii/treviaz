import BaseError from './base-error'

export class NotFoundError extends BaseError {
  constructor(resource: string, message: string) {
    super(400, `notFound.${resource}`, message)
  }
}
