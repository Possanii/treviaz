import { CreateForumCategoryModalProvider } from '@/contexts/create-forum-category-modal-context'
import { CreateForumThreadModalProvider } from '@/contexts/create-forum-thread-modal-context'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CreateForumCategoryModalProvider>
      <CreateForumThreadModalProvider>
        {children}
      </CreateForumThreadModalProvider>
    </CreateForumCategoryModalProvider>
  )
}
