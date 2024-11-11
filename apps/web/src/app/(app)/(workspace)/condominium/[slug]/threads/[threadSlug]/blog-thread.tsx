'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Separator } from '@treviaz/ui/components/ui/separator'
import { useParams } from 'next/navigation'

import { AddCommentInput } from '@/components/add-comment'
import { BlogComments } from '@/components/blog-comments'
import { BlogPost } from '@/components/blog-thread'
import { useQueryGetForumThreadBySlug } from '@/hooks/react-query/queries/forum/get-forum-threads-by-slug'

export function BlogThreadDetails() {
  const { slug, threadSlug } = useParams<{ slug: string; threadSlug: string }>()

  const {
    data: { thread },
  } = useSuspenseQuery(
    useQueryGetForumThreadBySlug({
      condSlug: slug,
      threadSlug,
    })
  )

  return (
    <BlogPost.Root>
      <BlogPost.Title>{thread.title}</BlogPost.Title>
      <BlogPost.Avatar
        avatarUrl={thread.created_by.avatar_url}
        userName={thread.created_by.name}
        createdAt={thread.created_at}
      />
      <BlogPost.Image src={thread.thumbnail_url} alt={thread.title} />
      <BlogPost.Content content={thread.description} />
      <BlogPost.Actions>
        <BlogPost.ActionLike likes={10} />
      </BlogPost.Actions>
      <Separator className="my-4" />
      <BlogComments.Root>
        <BlogComments.Title />
        <AddCommentInput />
        <BlogComments.Comments comments={thread} />
      </BlogComments.Root>
    </BlogPost.Root>
  )
}
