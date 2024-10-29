import { env } from '@treviaz/env'
import nodemailer from 'nodemailer'

export const smtp = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.NODEMAILER_EMAIL_ADDRESS,
    pass: env.NODEMAILER_PASSWORD,
  },
})
