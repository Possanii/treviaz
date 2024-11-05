'use client'

import {
  dehydrate,
  HydrationBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { ForumThreadsSkeleton } from '@treviaz/ui/components/custom/blog-skeleton'
import { Button } from '@treviaz/ui/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import { useModalCreateForumCategory } from '@/contexts/create-forum-category-modal-context'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'
import { useQueryGetAllForumThreads } from '@/hooks/react-query/queries/forum/get-all-forum-threads'
import { queryClient } from '@/lib/query-client'

import { ForumThreadsBlog } from './forum-threads-blog'

export function ForumThreadsPage() {
  const { slug } = useParams<{ slug: string }>()

  const {
    data: { categories },
  } = useSuspenseQuery(useQueryGetAllCategoriesCondominium({ slug }))

  const { toggleModal } = useModalCreateForumCategory()

  queryClient.prefetchQuery(useQueryGetAllForumThreads({ slug: 'all' }))
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className="container py-[--main-content-padding]">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Notícias, insights e muito mais
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Saiba mais sobre todas as novidades do nosso condominio.
        </p>
      </div>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === 'all' ? 'default' : 'outline'}
          >
            {category.name}
          </Button>
        ))}
        <Button onClick={toggleModal}>
          <CirclePlus className="size-4 mr-2" />
          Criar categoria
        </Button>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <React.Suspense fallback={<ForumThreadsSkeleton />}>
          <ForumThreadsBlog />
        </React.Suspense>
      </HydrationBoundary>
    </main>
  )
}
