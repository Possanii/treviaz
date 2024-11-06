import { GetForumThreadBySlugService } from '@/application/services/forumthread/get-forum-threads-by-slug-service'

export function makeGetForumThreadBySlugService() {
  return new GetForumThreadBySlugService()
}
