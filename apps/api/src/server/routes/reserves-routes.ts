import { makeCreateReserveController } from '@/factories/controllers/reserves/make-create-reserve-controller'
import { makeGetAllReservesFromCondominiumSlugController } from '@/factories/controllers/reserves/make-get-all-reserves-from-condominium-slug-controller'
import { makeAddCurrentUserToMetadataMiddleware } from '@/factories/middleware/make-add-current-user-to-metadata-middleware'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

// Create a new leisure area
app.post(
  '/reserves',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeCreateReserveController())
)

// Get leisure areas by condominium
app.get(
  '/reserves/condominium/:condominiumSlug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetAllReservesFromCondominiumSlugController())
)
