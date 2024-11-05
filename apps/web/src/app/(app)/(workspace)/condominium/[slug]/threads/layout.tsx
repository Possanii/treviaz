import { CreateForumCategoryModalProvider } from '@/contexts/create-forum-category-modal-context'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CreateForumCategoryModalProvider>
      {children}
    </CreateForumCategoryModalProvider>
  )
}
