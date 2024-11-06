'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@treviaz/ui/components/ui/card'
import { Separator } from '@treviaz/ui/components/ui/separator'
import { Textarea } from '@treviaz/ui/components/ui/textarea'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, MessageSquare, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useQueryGetForumThreadBySlug } from '@/hooks/react-query/queries/forum/get-forum-threads-by-slug'

export function BlogThreadDetails() {
  const { slug, threadSlug } = useParams<{ slug: string; threadSlug: string }>()

  const {
    data: { thread },
  } = useSuspenseQuery(
    useQueryGetForumThreadBySlug({
      condominiumSlug: slug,
      threadSlug,
    })
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span className="text-lg font-semibold">Blog</span>
          </Link>
        </div>
      </header>
      <main className="container px-4 py-12 md:py-16 lg:py-20">
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {thread.title}
          </h1>
          <div className="mb-6 flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={thread.created_by.avatar_url || undefined}
                alt={thread.created_by.name}
              />
              <AvatarFallback>{thread.created_by.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{thread.created_by.name}</p>
              <p className="text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 inline-block h-3 w-3" />
                {formatRelative(thread.created_at, new Date(), {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
          <Image
            src={thread.thumbnail_url}
            alt={thread.title}
            width={800}
            height={400}
            className="mb-8 rounded-lg object-cover"
          />
          <div
            className="prose max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: thread.description }}
          />
          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like (10)
            </Button>
            <p className="text-sm text-muted-foreground">
              {thread.posts.length} comments
            </p>
          </div>
        </article>
        <Separator className="my-8" />
        <section className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold">Comments</h2>
          <Card className="mb-6">
            <CardHeader>
              <Textarea placeholder="Add a comment..." />
            </CardHeader>
            <CardFooter>
              <Button>Thread Comment</Button>
            </CardFooter>
          </Card>
          {thread.posts.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.avatar_url || undefined}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{comment.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelative(comment.created_at, new Date(), {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
