import { GetForumThreadsToApproveController } from '@/application/controllers/forumthread/get-forum-threads-to-approve-controller'
import { makeGetForumThreadsToApproveService } from '@/factories/services/forumthread/make-get-forum-threads-to-approve-service'

export function makeGetForumThreadsToApproveController() {
  return new GetForumThreadsToApproveController(
    makeGetForumThreadsToApproveService()
  )
}
