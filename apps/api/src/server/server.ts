import 'module-alias/register'
import './routes'

import { env } from '@treviaz/env'

import app from './lib/express'

app.listen(env.SERVER_PORT, () => {
  console.log('🔥 Listening on port ' + env.SERVER_PORT)
})
