import { makeEditForumCategoryService } from '@/factories/services/forumcategory/make-edit-forumcategory-service'
import { EditForumCategoryController } from '@/application/controllers/forumcategory/edit-forumcategory-controller'

export function makeEditForumCategoryController() {
  const editForumCategoryService = makeEditForumCategoryService()
  return new EditForumCategoryController(editForumCategoryService)
}
