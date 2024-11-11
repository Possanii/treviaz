'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Button, ButtonProps } from '@treviaz/ui/components/ui/button'
import { cn } from '@treviaz/ui/lib/utils'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

import { getNameInitial } from '@/utils/get-name-initials'

function BlogPostRoot({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('min-h-screen bg-background', className)} {...rest}>
      <main className="container px-4 py-12 md:py-16 lg:py-20">
        <article className="mx-auto max-w-3xl">{children}</article>
      </main>
    </div>
  )
}

function BlogPostTitle({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('mb-4 text-3xl font-bold md:text-4xl', className)}
      {...rest}
    >
      {children}
    </h1>
  )
}

interface IBlogPostAvatar {
  avatarUrl?: string | null
  userName: string
  createdAt: Date | string | number
}

function BlogPostAvatar({ avatarUrl, userName, createdAt }: IBlogPostAvatar) {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={avatarUrl || undefined} alt={userName} />
        <AvatarFallback>{getNameInitial(userName)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{userName}</p>
        <p className="text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 inline-block h-3 w-3" />
          {formatRelative(createdAt, new Date(), {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  )
}

interface IBlogPostImage extends React.ComponentProps<typeof Image> {
  alt: string
}

function BlogPostImage({ alt, className, ...rest }: IBlogPostImage) {
  return (
    <Image
      alt={alt}
      width={800}
      height={400}
      className={cn(
        'mb-8 rounded-lg object-contain max-h-[400px] max-w-[800px]',
        className
      )}
      {...rest}
    />
  )
}

function BlogPostContent({
  className,
  content,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { content: string }) {
  return (
    <div
      className={cn('prose max-w-none dark:prose-invert', className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...rest}
    />
  )
}

function BlogPostActions({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-8 flex items-center', className)} {...rest}>
      {children}
    </div>
  )
}

function BlogPostActionLike({
  likes,
  ...rest
}: ButtonProps & { likes: string | number }) {
  return (
    <Button variant="outline" size="sm" {...rest}>
      <ThumbsUp className="mr-2 h-4 w-4" />
      Like ({likes})
    </Button>
  )
}

export const BlogPost = {
  Root: BlogPostRoot,
  Title: BlogPostTitle,
  Avatar: BlogPostAvatar,
  Image: BlogPostImage,
  Content: BlogPostContent,
  Actions: BlogPostActions,
  ActionLike: BlogPostActionLike,
}
