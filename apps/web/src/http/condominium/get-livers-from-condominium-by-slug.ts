import { ILiversTable } from '@treviaz/entities/schemas/ILiversTable'

import { api } from '@/lib/api-client'
import { formatStringToDate } from '@/utils/format-string-to-date'

export async function getLiversFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  const result = await api.get<{ body: ILiversTable }>(
    `/condominium/slug/${slug}/livers`
  )

  const formatedResult = formatStringToDate({
    data: result.data.body.livers!.users,
    fields: ['joined_at'],
  })

  return { livers: { users: formatedResult } }
}
