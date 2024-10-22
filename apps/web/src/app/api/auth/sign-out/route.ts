import { cookiesStorage } from '@treviaz/cookies'
import { createClient } from '@treviaz/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  const supabase = createClient()
  await supabase.auth.signOut()
  cookies().delete(cookiesStorage.API_AUTH_TOKEN)

  return NextResponse.redirect(`${origin}/auth/sign-in`)
}
