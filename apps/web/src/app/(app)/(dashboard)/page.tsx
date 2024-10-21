'use client'

import { useAuth } from '@/hooks/use-auth'

export default async function Home() {
  const { user } = useAuth()

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
