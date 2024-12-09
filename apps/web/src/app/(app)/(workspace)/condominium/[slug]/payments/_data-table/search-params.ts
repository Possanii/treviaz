import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp,
} from 'nuqs/server'

import { RANGE_DELIMITER } from '@/components/data-table/schema'

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
  payer: parseAsString,
  amountPaid: parseAsInteger,
  paymentMethod: parseAsString,
  paymentDate: parseAsArrayOf(parseAsTimestamp, RANGE_DELIMITER),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParser)
