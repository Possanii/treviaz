'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

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
    </BlogPost.Root>
  )
}
