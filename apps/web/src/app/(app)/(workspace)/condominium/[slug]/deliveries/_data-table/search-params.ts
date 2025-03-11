import { inviteStatusSchema } from '@treviaz/entities/schemas/IInvite'
import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsStringLiteral,
  parseAsTimestamp,
} from 'nuqs/server'

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/components/data-table/schema'

export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split('.')
    if (!id && !desc) return null
    return { id, desc: desc === 'desc' }
  },
  serialize(value) {
    return `${value.id}.${value.desc ? 'desc' : 'asc'}`
  },
})

export const searchParamsParser = {
  status: parseAsArrayOf(
    parseAsStringLiteral(inviteStatusSchema.options),
    ARRAY_DELIMITER
  ),
  createdAt: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  updatedAt: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParser)
