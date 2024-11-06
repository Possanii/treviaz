import { GetForumThreadBySlugController } from '@/application/controllers/forumthread/get-forum-thread-by-slug-controller'
import { makeGetForumThreadBySlugService } from '@/factories/services/forumthread/make-get-forum-thread-by-slug-service'

export function makeGetForumThreadBySlugController() {
  return new GetForumThreadBySlugController(makeGetForumThreadBySlugService())
}
