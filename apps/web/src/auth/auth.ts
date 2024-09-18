import { cookiesStorage } from '@treviaz/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get(cookiesStorage.AUTH_TOKEN)?.value
}

export async function auth() {
  const token = cookies().get(cookiesStorage.AUTH_TOKEN)?.value

  if (!token) {
    redirect('/auth/sign-in')
  }
}
