import { auth } from '@/auth/auth'

export default async function Home() {
  await auth()

  return <div>Dashboard</div>
}
