import { DeleteForumThreadController } from '@/application/controllers/forumthread/delete-forumthread-controller'
import { makeDeleteForumThreadService } from '@/factories/services/forumthread/make-delete-forumthread-service'

export function makeDeleteForumThreadController() {
  return new DeleteForumThreadController(makeDeleteForumThreadService())
}
