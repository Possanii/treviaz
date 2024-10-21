import { CreateForumThreadController } from '@/application/controllers/forumthread/create-forumthread-controller'
import { makeCreateForumThreadService } from '@/factories/services/forumthread/make-create-forumthread-service'

export function makeCreateForumThreadController() {
  return new CreateForumThreadController(makeCreateForumThreadService())
}
