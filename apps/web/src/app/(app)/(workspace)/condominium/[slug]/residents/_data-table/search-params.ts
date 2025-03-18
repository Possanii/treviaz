import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
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
  name: parseAsString,
  email: parseAsString,
  role: parseAsArrayOf(parseAsString, ARRAY_DELIMITER),
  joined_at: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParser)
