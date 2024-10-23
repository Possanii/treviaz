import { EditForumPostService } from '@/application/services/forumpost/edit-forumpost-service'

export function makeEditForumPostService() {
  return new EditForumPostService()
}
