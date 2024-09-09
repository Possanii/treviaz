import BaseError from './base-error'

export class FetchDataError extends BaseError {
  constructor(message: string, body?: Record<string, unknown>) {
    super(400, `badRequest.fetch`, message, { errors: body })
  }
}
