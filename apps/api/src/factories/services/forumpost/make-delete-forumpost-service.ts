import { DeleteForumPostService } from '@/application/services/forumpost/delete-forumpost-service'

export function makeDeleteForumPostService() {
  return new DeleteForumPostService()
}
