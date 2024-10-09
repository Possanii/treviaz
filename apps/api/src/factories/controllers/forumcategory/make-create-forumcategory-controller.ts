import { makeCreateForumCategoryService } from '@/factories/services/forumcategory/make-create-forumcategory-service'
import { CreateForumCategoryController } from '@/application/controllers/forumcategory/create-forumcategory-controller'

export function makeCreateForumCategoryController() {
  const createForumCategoryService = makeCreateForumCategoryService()
  return new CreateForumCategoryController(createForumCategoryService)
}
