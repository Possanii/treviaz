import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import logger from '@/application/configs/logger'
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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`)
  next()
})

app.use('/packages', packageRouter(packageController))

app.use('/delivery', packageRouter(packageController))

app.get('/wipe-db', async (req, res) => {
  await prisma.forumCategory.deleteMany()
  await prisma.forumThread.deleteMany()
  await prisma.forumPost.deleteMany()
  await prisma.guest.deleteMany()
  await prisma.invite.deleteMany()
  await prisma.leisureArea.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.reserve.deleteMany()
  await prisma.userCondominium.deleteMany()
  await prisma.userUnit.deleteMany()
  await prisma.financialTransaction.deleteMany()
  await prisma.financialCategory.deleteMany()
  await prisma.unit.deleteMany()
  await prisma.package.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.user.deleteMany()
  await prisma.condominium.deleteMany()
  await prisma.address.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()

  res.status(200).send('Database wiped')
})

export default app
