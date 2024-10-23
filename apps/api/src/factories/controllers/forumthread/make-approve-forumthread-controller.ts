import { ApproveForumThreadController } from '@/application/controllers/forumthread/approve-forumthread-controller'
import { makeApproveForumThreadService } from '@/factories/services/forumthread/make-approve-forumthread-service'

export function makeApproveForumThreadController() {
  return new ApproveForumThreadController(makeApproveForumThreadService())
}
