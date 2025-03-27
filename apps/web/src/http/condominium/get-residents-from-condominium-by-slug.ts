import { IResidentsTable } from '@treviaz/entities/schemas/IResidentsTable'

import { api } from '@/lib/api-client'
import { formatStringToDate } from '@/utils/format-string-to-date'

export async function getresidentsFromCondominiumBySlug({
  slug,
}: {
  slug: string
}) {
  const result = await api.get<{ body: IResidentsTable }>(
    `/condominium/slug/${slug}/residents`
  )

  const formatedResult = formatStringToDate({
    data: result.data.body.residents!.users,
    fields: ['joined_at'],
  })

  return { residents: { users: formatedResult } }
}
