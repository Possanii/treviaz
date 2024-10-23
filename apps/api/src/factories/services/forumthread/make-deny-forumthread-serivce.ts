import { DenyForumThreadService } from '@/application/services/forumthread/deny-forumthread-service'

export function makeDenyForumThreadService() {
  return new DenyForumThreadService()
}
