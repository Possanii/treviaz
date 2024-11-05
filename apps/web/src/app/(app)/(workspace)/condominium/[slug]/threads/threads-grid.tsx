'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { useModalCreateForumCategory } from '@/contexts/create-forum-category-modal-context'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'

export function ThreadsBlog() {
  const { slug } = useParams<{ slug: string }>()

  const {
    data: { categories },
  } = useSuspenseQuery(useQueryGetAllCategoriesCondominium({ slug }))

  const { toggleModal } = useModalCreateForumCategory()

  return (
    <main className="p-[--main-content-padding]">
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
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="aspect-[3/2] object-cover"
            />
            <CardContent className="grid gap-4 p-6">
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </p>
                <h2 className="font-bold tracking-tight">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </main>
  )
}
