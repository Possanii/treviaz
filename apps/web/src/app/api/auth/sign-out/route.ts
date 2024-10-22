import { createClient } from '@treviaz/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  const supabase = createClient()
  await supabase.auth.signOut()

  return NextResponse.redirect(`${origin}/auth/sign-in`)
}
