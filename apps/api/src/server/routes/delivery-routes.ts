import { makeCreateDeliveryController } from '@/factories/controllers/delivery/make-create-delivery-controller'
import { makeGetAllDeliveriesController } from '@/factories/controllers/delivery/make-get-all-deliveries-controller'
import { makeGetDeliveriesByCondominiumController } from '@/factories/controllers/delivery/make-get-deliveries-by-condominium-controller'
import { makeGetDeliveriesByUserController } from '@/factories/controllers/delivery/make-get-deliveries-by-user-controller'
import { makeUpdateDeliveryStatusController } from '@/factories/controllers/delivery/make-update-delivery-status-controller'
import { makeAddCurrentUserToMetadataMiddleware } from '@/factories/middleware/make-add-current-user-to-metadata-middleware'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

// Create a new delivery
app.post(
  '/delivery',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeCreateDeliveryController())
)

// Get all deliveries
app.get(
  '/delivery',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetAllDeliveriesController())
)

// Get deliveries by user
app.get(
  '/delivery/user/',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAddCurrentUserToMetadataMiddleware()),
  routeAdapter(makeGetDeliveriesByUserController())
)

// Get deliveries by condominium
app.get(
  '/delivery/condominium/:condominiumSlug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetDeliveriesByCondominiumController())
)

// Update delivery status
app.patch(
  '/delivery/:id/status',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateDeliveryStatusController())
)
