import { env } from '@treviaz/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  // hooks: {
  //   beforeRequest: [
  //     async (request) => {
  //       let cookieStore: CookiesFn | undefined

  //       if (typeof window === 'undefined') {
  //         const { cookies: serverCookies } = await import('next/headers')

  //         cookieStore = serverCookies
  //       }
  //       const token = getCookie(cookiesStorage.API_AUTH_TOKEN, {
  //         cookies: cookieStore,
  //       })

  //       if (token) {
  //         request.headers.set('Authorization', `Bearer ${token}`)
  //       }
  //     },
  //   ],
  // },
})
