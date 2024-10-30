import BaseError from './base-error'

export class NotFoundError extends BaseError {
  constructor(resource: string, message: string) {
    super(404, `notFound.${resource}`, message)
  }
}
