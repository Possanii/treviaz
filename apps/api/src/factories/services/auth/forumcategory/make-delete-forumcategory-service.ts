import { DeleteForumCategoryService } from '@/application/services/auth/forumcategory/delete-forumcategory.service'

export function makeDeleteForumCategoryService() {
  return new DeleteForumCategoryService()
}
