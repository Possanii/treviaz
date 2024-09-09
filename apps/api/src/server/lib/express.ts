import cors from 'cors'
import express from 'express'

const app = express()

app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
