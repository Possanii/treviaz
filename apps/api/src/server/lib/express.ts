import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
