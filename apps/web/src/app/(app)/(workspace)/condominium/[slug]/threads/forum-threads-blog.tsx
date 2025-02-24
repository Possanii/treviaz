import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { BlogCardPost } from '@/components/blog-card-post'
import { useModalCreateForumThread } from '@/contexts/create-forum-thread-modal-context'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'
import { useQueryGetAllForumThreads } from '@/hooks/react-query/queries/forum/get-all-forum-threads'

export function ForumThreadsBlog() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const {
    data: { threads },
  } = useSuspenseQuery(
    useQueryGetAllForumThreads({ condSlug: slug, categorySlug: 'all' })
  )

  const {
    data: { categories },
  } = useSuspenseQuery(useQueryGetAllCategoriesCondominium({ slug }))

  const { toggleModal } = useModalCreateForumThread()

  return threads.length > 0 ? (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {threads.map((thread) => (
        <BlogCardPost
          key={thread.id}
          thread={thread}
          onClick={() => router.push(`threads/${thread.slug}`)}
        />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
      <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <PlusCircle className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold">Nenhum post ainda</h2>
      <p className="text-muted-foreground">Comece criando o primeiro post.</p>
      <Button onClick={() => toggleModal({ categories })}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Criar um post
      </Button>
    </div>
  )
}
