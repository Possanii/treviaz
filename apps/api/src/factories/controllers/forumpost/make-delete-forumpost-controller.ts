import { DeleteForumPostController } from '@/application/controllers/forumpost/delete-forumpost-controller'
import { makeDeleteForumPostService } from '@/factories/services/forumpost/make-delete-forumpost-service'

export function makeDeleteForumPostController() {
  return new DeleteForumPostController(makeDeleteForumPostService())
}
