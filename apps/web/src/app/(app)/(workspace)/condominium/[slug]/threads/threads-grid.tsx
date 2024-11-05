'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetAllCategoriesCondominium } from '@/hooks/react-query/queries/forum/get-all-categories-from-condominium'

export function ThreadsBlog() {
  const { slug } = useParams<{ slug: string }>()

  const { data } = useSuspenseQuery(
    useQueryGetAllCategoriesCondominium({ slug })
  )

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
