import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useModalCreateForumCategory } from '@/contexts/create-forum-category-modal-context'
import { useMutationCreateForumCategory } from '@/hooks/react-query/mutations/forum/create-condominium-mutation'
import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'
import {
  createForumCategorySchema,
  ICreateForumCategory,
} from '@/http/forum/create-forum-category'
import { queryClient } from '@/lib/query-client'

export function FormCreateForumCategoryController({ slug }: { slug: string }) {
  const form = useForm<ICreateForumCategory>({
    resolver: zodResolver(createForumCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { setOpen } = useModalCreateForumCategory()

  const { mutateAsync, isPending, isSuccess } = useMutationCreateForumCategory()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      queryClient.invalidateQueries(
        useQueryGetAllCategoriesCondominium({ slug })
      )
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  const handleSubmit = form.handleSubmit(async (form) => {
    await mutateAsync({ slug, ...form })
  })

  return {
    form,
    handleSubmit,
    createForumCategoryIsPending: isPending,
  }
}
