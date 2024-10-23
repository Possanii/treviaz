import { PrismaClient } from '@prisma/client'
import { IInvite } from '@/application/schemas/IInvite'
import { BadRequestError } from '@/application/errors/bad-request-error'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export class CreateInviteService {
  async execute(email: string): Promise<IInvite> {
    const existingInvite = await prisma.invite.findFirst({
      where: { email },
    })

    if (existingInvite) {
      throw new BadRequestError('invite', 'An invite for this email already exists')
    }

    const token = uuidv4()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24*60*60*1000) // CONVITE ESTA DURANDO 24 HORAS -> PODEMOS MUDAR

    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        status: 'PENDING',
        sent_at: now,
        expires_at: expiresAt,
      },
    })

    return {
      id: invite.id,
      email: invite.email,
      token: invite.token,
      status: invite.status,
      sent_at: invite.sent_at,
      expires_at: invite.expires_at,
    }
  }
}
