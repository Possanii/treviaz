import { DeleteForumThreadService } from '@/application/services/forumthread/delete-forumthread-service'

export function makeDeleteForumThreadService() {
  return new DeleteForumThreadService()
}
