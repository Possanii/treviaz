import { EditForumThreadController } from '@/application/controllers/forumthread/edit-forumthread-controller'
import { makeEditForumThreadService } from '@/factories/services/forumthread/make-edit-forumthread-service'

export function makeEditForumThreadController() {
  return new EditForumThreadController(makeEditForumThreadService())
}
