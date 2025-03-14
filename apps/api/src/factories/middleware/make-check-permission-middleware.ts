import { CheckPermissionMiddleware } from '@/application/middleware/check-permission-middleware'

export function makeCheckPermissionMiddleware(permission: string) {
  return new CheckPermissionMiddleware(permission)
}