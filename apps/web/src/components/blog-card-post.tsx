import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { Card, CardContent } from '@treviaz/ui/components/ui/card'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface IBlogCardPost {
  thread: Pick<
    IForumThread,
    'id' | 'thumbnail_url' | 'title' | 'created_at' | 'description'
  >
  onClick?: () => void
}

export function BlogCardPost({ thread, onClick }: IBlogCardPost) {
  return (
    <Card
      key={thread.id}
      className="overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={thread.thumbnail_url}
        alt={thread.title}
        width={600}
        height={400}
        className="aspect-[3/2] object-cover"
      />
      <CardContent className="grid gap-4 p-6">
        <div className="space-y-3 max-w-full overflow-hidden">
          <p className="text-sm text-nowrap truncate text-gray-500 dark:text-gray-400">
            {formatRelative(thread.created_at, new Date(), {
              locale: ptBR,
            })}
          </p>
          <h2 className="font-bold text-nowrap truncate tracking-tight">
            {thread.title}
          </h2>
          <p className="text-sm text-wrap truncate line-clamp-3 text-gray-500 dark:text-gray-400">
            {thread.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
