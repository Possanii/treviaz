import { cookiesStorage } from '@treviaz/cookies'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  cookies().delete(cookiesStorage.API_AUTH_TOKEN)

  return NextResponse.redirect(`${origin}/auth/sign-in`)
}
