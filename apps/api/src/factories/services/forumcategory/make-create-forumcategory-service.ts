import { CreateForumCategoryService } from '@/application/services/forumcategory/create-forumcategory-service'

export function makeCreateForumCategoryService() {
  return new CreateForumCategoryService()
}
