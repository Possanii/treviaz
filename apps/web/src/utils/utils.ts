import { cookiesStorage } from '@treviaz/cookies'
import { getCookie, setCookie } from 'cookies-next'

export function getCurrentCondominium() {
  return getCookie(cookiesStorage.CURRENT_CONDOMINIUM)
}

export function setCurrentCondominium(condominium: string) {
  return setCookie(cookiesStorage.CURRENT_CONDOMINIUM, condominium, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}
