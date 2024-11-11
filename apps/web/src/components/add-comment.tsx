'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import { Card, CardFooter, CardHeader } from '@treviaz/ui/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@treviaz/ui/components/ui/form'
import { Textarea } from '@treviaz/ui/components/ui/textarea'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useMutationCreateCommentPost } from '@/hooks/react-query/mutations/comment-post/create-comment-post-mutation'
import { useQueryGetForumThreadBySlug } from '@/hooks/react-query/queries/forum/get-forum-threads-by-slug'
import { queryClient } from '@/lib/query-client'
import {
  createCommentPostSchema,
  ICreateCommentPostProps,
} from '@/schemas/create-comment-post-schema'

export function AddCommentInput() {
  const { slug, threadSlug } = useParams<{ slug: string; threadSlug: string }>()

  const form = useForm<ICreateCommentPostProps>({
    resolver: zodResolver(createCommentPostSchema),
    defaultValues: {
      condSlug: slug,
      content: '',
      threadSlug,
    },
  })

  const { mutateAsync, isPending, isSuccess } = useMutationCreateCommentPost()

  const handleSubmit = form.handleSubmit(async (form) => {
    console.log(form)
    await mutateAsync(form)
  })

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(
        useQueryGetForumThreadBySlug({
          condSlug: slug,
          threadSlug,
        })
      )
    }
  }, [isSuccess, queryClient])

  return (
    <Card className="mb-6">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Comentário</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add a comment..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </CardHeader>
          <CardFooter>
            <Button disabled={isPending} type="submit">
              Thread Comment
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
