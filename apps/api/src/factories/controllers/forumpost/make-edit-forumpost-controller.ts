import { EditForumPostController } from '@/application/controllers/forumpost/edit-forumpost-controller'
import { makeEditForumPostService } from '@/factories/services/forumpost/make-edit-forumpost-service'

export function makeEditForumPostController() {
  return new EditForumPostController(makeEditForumPostService())
}
