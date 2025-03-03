import { AddCurrentUserToMetadataMiddleware } from '@/application/middleware/add-current-user-to-metadata-middleware'

export function makeAddCurrentUserToMetadataMiddleware() {
  return new AddCurrentUserToMetadataMiddleware()
}
