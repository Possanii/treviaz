import { Router } from 'express'

import { IPackageController } from '@/application/package/controller/package.controller.interface'

import { wrapRequest } from '../adapters/wrapRequest'

export function packageRouter(packageController: IPackageController): Router {
  const router = Router()

  router.post(
    '',
    wrapRequest(packageController.createPackage.bind(packageController))
  )

  return router
}
