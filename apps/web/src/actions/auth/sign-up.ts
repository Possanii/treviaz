import { api } from '@/lib/api-client'

interface SignUpParams {
  name: string
  email: string
  password: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: SignUpParams): Promise<SignUpResponse> {
  await api.post(`auth/sign-up`, { json: { name, email, password } })
}
