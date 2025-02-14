import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { PackageController } from '@/application/package/controller/package.controller'
import { PackageRepo } from '@/application/package/repo/package.repo'
import { PackageService } from '@/application/package/service/package.service'

import { packageRouter } from '../routes/package.router'

const prisma = new PrismaClient()
const packageRepo = new PackageRepo(prisma)
const packageService = new PackageService(packageRepo)
const packageController = new PackageController(packageService)

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

app.use('/packages', packageRouter(packageController))

export default app
