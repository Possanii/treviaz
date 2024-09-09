import BaseError from './base-error'

export class BadRequestError extends BaseError {
  constructor(resource: string, message: string) {
    super(400, `badRequest.${resource}`, message)
  }
}
