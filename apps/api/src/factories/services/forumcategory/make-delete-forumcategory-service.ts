import { DeleteForumCategoryService } from '@/application/services/forumcategory/delete-forumcategory-service'

export function makeDeleteForumCategoryService() {
  return new DeleteForumCategoryService()
}
