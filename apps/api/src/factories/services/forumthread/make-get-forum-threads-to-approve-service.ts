import { GetForumThreadsToApproveService } from '@/application/services/forumthread/get-forum-threads-to-approve-service'

export function makeGetForumThreadsToApproveService() {
  return new GetForumThreadsToApproveService()
}
