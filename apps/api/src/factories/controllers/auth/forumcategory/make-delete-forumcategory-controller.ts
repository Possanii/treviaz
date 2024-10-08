import { DeleteForumCategoryController } from '@/application/controllers/auth/forumcategory/delete-forumcategory-controller'
import { makeDeleteForumCategoryService } from '@/factories/services/auth/forumcategory/make-delete-forumcategory-service'

export function makeDeleteForumCategoryController() {
  const deleteForumCategoryService = makeDeleteForumCategoryService()
  return new DeleteForumCategoryController(deleteForumCategoryService)
}
