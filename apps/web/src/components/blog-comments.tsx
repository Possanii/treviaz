import { cn } from '@treviaz/ui/lib/utils'
import { HTMLAttributes } from 'react'
import { z } from 'zod'

import { getForumThreadBySlugSchema } from '@/http/forum/get-forum-thread-by-slug'

import { CommentBox } from './comment-box'

function BlogCommentsRoot({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('mx-auto max-w-3xl', className)} {...rest}>
      {children}
    </section>
  )
}

function BlogCommentsTitle({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadElement>) {
  return (
    <h2 className={cn('mb-4 text-2xl font-bold', className)} {...rest}>
      {children ?? 'Comments'}
    </h2>
  )
}

type IBlogCommentsComments = z.infer<typeof getForumThreadBySlugSchema>

function BlogCommentsComments({
  comments: { posts },
}: {
  comments: Pick<IBlogCommentsComments, 'posts'>
}) {
  return posts.map((comment) => (
    <CommentBox
      key={comment.id}
      avatarUrl={comment.user.avatar_url}
      userName={comment.user.name}
      comment={comment.content}
      createdAt={comment.created_at}
    />
  ))
}

export const BlogComments = {
  Root: BlogCommentsRoot,
  Title: BlogCommentsTitle,
  Comments: BlogCommentsComments,
}
