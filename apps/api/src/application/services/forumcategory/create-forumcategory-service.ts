import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'
import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'
import { createSlug } from '@/application/utils/create-slug'

export class CreateForumCategoryService {
  async execute({
    id,
    slug,
    name,
    description,
  }: Pick<IForumCategory, 'name' | 'description'> &
    Pick<ICondominium, 'slug'> &
    Pick<IUser, 'id'>): Promise<void> {
    const existingForumCategory = await prisma.forumCategory.findFirst({
      where: {
        name,
      },
    })

    if (existingForumCategory) {
      throw new BadRequestError(
        'forumCategory',
        'Forum Category with this name already exists'
      )
    }

    const condominium = await prisma.condominium.findUnique({
      where: {
        slug,
      },
    })

    if (!condominium) {
      throw new NotFoundError('condominium', 'Condominium not found.')
    }

    await prisma.forumCategory.create({
      data: {
        name,
        slug: createSlug(name),
        description,
        created_by_user_id: id,
        condominium_id: condominium.id,
      },
    })
  }
}
