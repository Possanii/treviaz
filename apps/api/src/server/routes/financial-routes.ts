import { makeGetTotalIncomeByMonthController } from '@/factories/controllers/financial/make-get-total-income-by-month-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get(
  '/financial/total-income',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetTotalIncomeByMonthController())
)
