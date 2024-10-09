import { CreateForumThreadService } from '@/application/services/forumthread/create-forumthread-service'

export function makeCreateForumThreadService() {
  return new CreateForumThreadService()
}
