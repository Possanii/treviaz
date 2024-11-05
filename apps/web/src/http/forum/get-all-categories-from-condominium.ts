import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { api } from '@/lib/api-client'
import { sleep } from '@/utils/sleep'

export interface IGetAllCategoriesFromCondominium {
  categories: (IForumCategory & {
    created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
  })[]
}

export async function getAllCategoriesFromCondominium({
  slug,
}: {
  slug: string
}): Promise<IGetAllCategoriesFromCondominium> {
  const result = await api.get<{ body: IGetAllCategoriesFromCondominium }>(
    `/forumcategory/${slug}`
  )

  // WARNING: I ONLY ADDED IT TO SHOW SKELETON, PLEASE REMOVE IT.
  await sleep()

  return { ...result.data.body }
}
