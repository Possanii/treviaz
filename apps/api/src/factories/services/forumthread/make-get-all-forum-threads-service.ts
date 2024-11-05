import { GetAllForumThreadsService } from '@/application/services/forumthread/get-all-forum-threads-service'

export function makeGetAllForumThreadsService() {
  return new GetAllForumThreadsService()
}
