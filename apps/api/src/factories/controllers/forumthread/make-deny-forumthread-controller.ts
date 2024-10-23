import { DenyForumThreadController } from '@/application/controllers/forumthread/deny-forumthread-controller'
import { makeDenyForumThreadService } from '@/factories/services/forumthread/make-deny-forumthread-serivce'

export function makeDenyForumThreadController() {
  return new DenyForumThreadController(makeDenyForumThreadService())
}
