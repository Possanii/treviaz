/* eslint-disable camelcase */
import { randomUUID } from 'node:crypto'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'
import { IInvite } from '@/application/schemas/IInvite'

export class CreateInviteService {
  async execute({
    email,
    role,
    condominiumSlug,
    author_id,
  }: Pick<IInvite, 'email' | 'role' | 'author_id'> & {
    condominiumSlug: string
  }): Promise<{ token: string }> {
    const condominium = await prisma.condominium.findUnique({
      where: {
        slug: condominiumSlug,
      },
    })

    if (!condominium) {
      throw new NotFoundError('condominium', 'Condominium not found.')
    }

    const existingInvite = await prisma.invite.findFirst({
      where: { email, condominium_id: condominium.id },
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

    const roleInfo = await prisma.role.findFirst({
      where: { name: role },
    })

    if (!roleInfo) {
      throw new BadRequestError('role', 'Role not found.')
    }

    await prisma.invite.create({
      data: {
        email,
        token,
        status: 'PENDING',
        sent_at: now,
        expires_at: expiresAt,
        condominium_id: condominium.id,
        authorId: author_id,
        role_id: roleInfo.id,
      },
    })

    return { token }
  }
}
