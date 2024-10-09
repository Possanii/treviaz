import { EditForumThreadService } from '@/application/services/forumthread/edit-forumthread-service'

export function makeEditForumThreadService() {
  return new EditForumThreadService()
}
