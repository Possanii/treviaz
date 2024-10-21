import { CreateForumPostController } from '@/application/controllers/forumpost/create-forumpost-controller'
import { makeCreateForumPostService } from '@/factories/services/forumpost/make-create-forumpost-service'

export function makeCreateForumPostController() {
  return new CreateForumPostController(makeCreateForumPostService())
}
