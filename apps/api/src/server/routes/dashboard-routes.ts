import { makeGetNewLiversByMonthController } from '@/factories/controllers/dashboard/make-get-new-livers-by-month-controller'
import { makeGetNewThreadsByMonthController } from '@/factories/controllers/dashboard/make-get-new-threads-by-month-controller'
import { makeGetRecentPaymentsController } from '@/factories/controllers/dashboard/make-get-recent-payments-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get(
  '/dashboard/:slug/total-new-livers',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetNewLiversByMonthController())
)

app.get(
  '/dashboard/:slug/total-new-threads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetNewThreadsByMonthController())
)

app.get(
  '/dashboard/:slug/recent-payments',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetRecentPaymentsController())
)
