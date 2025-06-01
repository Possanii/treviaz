import { inviteStatusSchema } from '@treviaz/entities/schemas/IInvite'
import { roleEnum } from '@treviaz/entities/schemas/IRole'
import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
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
  email: parseAsString,
  status: parseAsArrayOf(
    parseAsStringLiteral(inviteStatusSchema.options),
    ARRAY_DELIMITER
  ),
  sent_at: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  role: parseAsArrayOf(parseAsStringLiteral(roleEnum.options), ARRAY_DELIMITER),
  expires_at: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
  author: parseAsString,
}

export const searchParamsCache = createSearchParamsCache(searchParamsParser)
