import { CreateForumCategoryController } from '@/application/controllers/forumcategory/create-forumcategory-controller'
import { makeCreateForumCategoryService } from '@/factories/services/forumcategory/make-create-forumcategory-service'

export function makeCreateForumCategoryController() {
  const createForumCategoryService = makeCreateForumCategoryService()
  return new CreateForumCategoryController(createForumCategoryService)
}
