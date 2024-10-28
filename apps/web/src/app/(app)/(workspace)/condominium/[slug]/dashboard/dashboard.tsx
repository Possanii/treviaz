'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { useQueryGetCondominiumBySlug } from '@/hooks/react-query/queries/get-condominium-by-slug'

export function CondominiumDashboard() {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useSuspenseQuery(useQueryGetCondominiumBySlug({ slug }))

  return (
    <div>
      <h1>{data.condominium.name} :</h1>
      <pre>{JSON.stringify(data.condominium, null, 2)}</pre>
    </div>
  )
}
