import { GetForumCategoriesFromCondominiumController } from '@/application/controllers/forumcategory/get-forum-categories-from-condominium-controller'
import { makeGetForumCategoriesFromCondominiumService } from '@/factories/services/forumcategory/make-get-forum-categories-from-condominium-service'

export function makeGetForumCategoriesFromCondominiumController() {
  return new GetForumCategoriesFromCondominiumController(
    makeGetForumCategoriesFromCondominiumService()
  )
}
