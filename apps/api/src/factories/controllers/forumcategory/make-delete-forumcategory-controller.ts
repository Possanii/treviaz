import { DeleteForumCategoryController } from '@/application/controllers/forumcategory/delete-forumcategory-controller'
import { makeDeleteForumCategoryService } from '@/factories/services/forumcategory/make-delete-forumcategory-service'

export function makeDeleteForumCategoryController() {
  const deleteForumCategoryService = makeDeleteForumCategoryService()
  return new DeleteForumCategoryController(deleteForumCategoryService)
}
