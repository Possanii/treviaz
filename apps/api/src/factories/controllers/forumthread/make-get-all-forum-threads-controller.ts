import { GetAllForumThreadsController } from '@/application/controllers/forumthread/get-all-forum-threads-controller'
import { makeGetAllForumThreadsService } from '@/factories/services/forumthread/make-get-all-forum-threads-service'

export function makeGetAllForumThreadsController() {
  return new GetAllForumThreadsController(makeGetAllForumThreadsService())
}
