import { makeGetNewLiversByMonthController } from '@/factories/controllers/dashboard/make-get-new-livers-by-month-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get(
  '/dashboard/:slug/total-new-livers',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetNewLiversByMonthController())
)
