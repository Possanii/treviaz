import BaseError from './base-error'

export class ConflictError extends BaseError {
  constructor(resource: string, message: string) {
    super(409, `badRequest.fetch`, message)
  }
}
