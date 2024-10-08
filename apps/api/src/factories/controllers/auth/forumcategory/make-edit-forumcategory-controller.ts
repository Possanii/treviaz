import { makeEditForumCategoryService } from '@/factories/services/auth/forumcategory/make-edit-forumcategory-service'
import { EditForumCategoryController } from '@/application/controllers/auth/forumcategory/edit-forumcategory-controller'

export function makeEditForumCategoryController() {
  const editForumCategoryService = makeEditForumCategoryService()
  return new EditForumCategoryController(editForumCategoryService)
}
