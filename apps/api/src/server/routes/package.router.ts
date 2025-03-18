import { Router } from 'express'

import { IPackageController } from '@/application/package/controller/package.controller.interface'
import { makeUpdateDeliveryStatusController } from '@/factories/controllers/delivery/make-update-delivery-status-controller'
import { makeAddCurrentUserToMetadataMiddleware } from '@/factories/middleware/make-add-current-user-to-metadata-middleware'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'
import { middlewareAdapter } from '@/server/adapters/middleware-adapter'
import { routeAdapter } from '@/server/adapters/route-adapter'

import { wrapRequest } from '../adapters/wrapRequest'

export function packageRouter(packageController: IPackageController): Router {
  const router = Router()

  router.post(
    '',
    wrapRequest(packageController.createPackage.bind(packageController))
  )

  router.patch(
    '/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
    routeAdapter(makeUpdateDeliveryStatusController())
  )

  return router
}
