import { cookiesStorage } from '@treviaz/cookies'
import { cookies } from 'next/headers'

export function getCurrentCondominium() {
  return cookies().get(cookiesStorage.CURRENT_CONDOMINIUM)?.value
}
