import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import { Card, CardContent } from '@treviaz/ui/components/ui/card'
import { formatRelative } from 'date-fns'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'

import { useQueryGetAllForumThreads } from '@/hooks/react-query/queries/forum/get-all-forum-threads'

export function ForumThreadsBlog() {
  const {
    data: { threads },
  } = useSuspenseQuery(useQueryGetAllForumThreads({ slug: 'all' }))

  return threads.length > 0 ? (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {threads.map((thread) => (
        <Card key={thread.id} className="overflow-hidden">
          <Image
            src={thread.thumbnail_url}
            alt={thread.title}
            width={600}
            height={400}
            className="aspect-[3/2] object-cover"
          />
          <CardContent className="grid gap-4 p-6">
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatRelative(thread.created_at, new Date())}
              </p>
              <h2 className="font-bold tracking-tight">{thread.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {thread.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
      <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <PlusCircle className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold">Nenhum post ainda</h2>
      <p className="text-muted-foreground">Comece criando o primeiro post.</p>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Criar um post
      </Button>
    </div>
  )
}
