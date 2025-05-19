import { makeCreateLeisureAreaController } from '@/factories/controllers/leisure-area/make-create-leisure-area-controller'
import { makeDeleteLeisureAreaController } from '@/factories/controllers/leisure-area/make-delete-leisure-area-controller'
import { makeGetLeisureAreasByCondominiumController } from '@/factories/controllers/leisure-area/make-get-leisure-areas-by-condominium-controller'
import { makeUpdateLeisureAreaController } from '@/factories/controllers/leisure-area/make-update-leisure-area-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

// Create a new leisure area
app.post(
  '/leisure-area/condominium/:condominiumSlug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateLeisureAreaController())
)

// Get leisure areas by condominium
app.get(
  '/leisure-area/condominium/:condominiumSlug',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetLeisureAreasByCondominiumController())
)

// Update a leisure area
app.put(
  '/leisure-area/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateLeisureAreaController())
)

// Delete a leisure area
app.delete(
  '/leisure-area/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteLeisureAreaController())
)
