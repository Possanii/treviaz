import { cookiesStorage } from '@treviaz/cookies'
import { env } from '@treviaz/env'
import { NextApiRequest } from 'next'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: NextApiRequest) {
  try {
    const origin = new URL(request.url!).origin

    // Read and parse the JSON body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const body = await request.json() // Use `request.json()` to parse the body
    // eslint-disable-next-line camelcase
    const { access_token, expires_in } = body.body // Extract the necessary values

    // eslint-disable-next-line camelcase
    if (!access_token || !expires_in) {
      // Fix: Check if expires_in is present
      return NextResponse.redirect(`${origin}/auth/sign-in`)
    }

    // Set the cookie
    cookies().set(cookiesStorage.API_AUTH_TOKEN, access_token, {
      httpOnly: true,
      // eslint-disable-next-line camelcase
      expires: new Date(Date.now() + expires_in * 1000),
      path: '/',
      sameSite: 'strict',
      secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
    })

    return NextResponse.redirect(`${origin}/`)
  } catch (error) {
    console.error('Erro ao definir o cookie:', error)
    return NextResponse.redirect(`${origin}/auth/sign-in`)
  }
}
