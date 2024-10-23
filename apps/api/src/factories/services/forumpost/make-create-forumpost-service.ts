import { CreateForumPostService } from '@/application/services/forumpost/create-forumpost-service'

export function makeCreateForumPostService() {
  return new CreateForumPostService()
}
