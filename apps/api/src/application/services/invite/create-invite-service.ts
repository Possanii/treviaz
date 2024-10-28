import { randomUUID } from 'node:crypto'

import { PrismaClient, Role } from '@prisma/client'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { IInvite } from '@/application/schemas/IInvite'

const prisma = new PrismaClient()

export class CreateInviteService {
  async execute(
    email: string,
    condominium_id: string,
    role: Role
  ): Promise<IInvite> {
    const existingInvite = await prisma.invite.findFirst({
      where: { email, condominium_id },
    })

    if (existingInvite) {
      throw new BadRequestError(
        'invite',
        'An invite for this email already exists in the specified condominium'
      )
    }

    const token = randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 horas

    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        status: 'PENDING',
        sent_at: now,
        expires_at: expiresAt,
        condominium_id,
        role,
      },
    })

    return {
      id: invite.id,
      email: invite.email,
      token: invite.token,
      status: invite.status,
      sent_at: invite.sent_at,
      expires_at: invite.expires_at,
      condominium_id: invite.condominium_id,
      role: invite.role,
    }
  }
}
