import { GetForumCategoriesFromCondominiumService } from '@/application/services/forumcategory/get-forum-categories-from-condominium-service'

export function makeGetForumCategoriesFromCondominiumService() {
  return new GetForumCategoriesFromCondominiumService()
}
