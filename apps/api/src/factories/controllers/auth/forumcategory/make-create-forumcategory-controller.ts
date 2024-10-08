import { makeCreateForumCategoryService } from '@/factories/services/auth/forumcategory/make-create-forumcategory-service'
import { CreateForumCategoryController } from '@/application/controllers/auth/forumcategory/create-forumcategory-controller'

export function makeCreateForumCategoryController() {
  const createForumCategoryService = makeCreateForumCategoryService()
  return new CreateForumCategoryController(createForumCategoryService)
}
