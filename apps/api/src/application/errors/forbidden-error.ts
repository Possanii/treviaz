import BaseError from './base-error'

export class ForbiddenError extends BaseError {
  constructor() {
    super(403, 'forbidden', 'Your are not allowed to access this resource.')
  }
}
