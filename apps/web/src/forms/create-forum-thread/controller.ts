import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useModalCreateForumThread } from '@/contexts/create-forum-thread-modal-context'
import { useMutationCreateForumThread } from '@/hooks/react-query/mutations/forum/create-forum-thread-mutation'
import { useQueryGetAllForumThreads } from '@/hooks/react-query/queries/forum/get-all-forum-threads'
import {
  createForumThreadSchema,
  ICreateForumThread,
} from '@/http/forum/create-forum-thread'
import { queryClient } from '@/lib/query-client'

export function FormCreateForumThreadController() {
  const form = useForm<ICreateForumThread>({
    resolver: zodResolver(createForumThreadSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail_url: '',
      name: '',
    },
  })

  const { setOpen } = useModalCreateForumThread()

  const { mutateAsync, isPending, isSuccess } = useMutationCreateForumThread()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      queryClient.invalidateQueries(useQueryGetAllForumThreads({ slug: 'all' }))
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  const handleSubmit = form.handleSubmit(async (form) => {
    await mutateAsync(form)
  })

  return {
    form,
    handleSubmit,
    createForumThreadIsPending: isPending,
  }
}
