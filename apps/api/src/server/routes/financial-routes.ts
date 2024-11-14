import { makeGetTotalExpenseByMonthController } from '@/factories/controllers/financial/make-get-total-expense-by-month-controller'
import { makeGetTotalIncomeByMonthController } from '@/factories/controllers/financial/make-get-total-income-by-month-controller'
import { makeGetTotalOutstandingController } from '@/factories/controllers/financial/make-get-total-outstanding-controller'
import { makeAuthenticationMiddleware } from '@/factories/middleware/make-authentication-middleware'

import { middlewareAdapter } from '../adapters/middleware-adapter'
import { routeAdapter } from '../adapters/route-adapter'
import app from '../lib/express'

app.get(
  '/financial/total-income',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetTotalIncomeByMonthController())
)

app.get(
  '/financial/total-expense',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetTotalExpenseByMonthController())
)

app.get(
  '/financial/total-outstanding',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetTotalOutstandingController())
)
