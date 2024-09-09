import BaseError from './base-error'

export class NotActiveError extends BaseError {
  constructor(resource: string, message: string) {
    super(400, `notActive.${resource}`, message)
  }
}
