import { CreateForumCategoryService } from '@/application/services/auth/forumcategory/create-forumcategory-service'

export function makeCreateForumCategoryService() {
  return new CreateForumCategoryService()
}
