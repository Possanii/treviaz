import { env } from '@treviaz/env'
import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response
    if (
      response?.status === 401 &&
      response?.data?.message.errorCode === 'UNAUTHORIZED_ACCESS_TOKEN_ERROR'
    ) {
      if (typeof window !== 'undefined') {
        window.location.href = '/api/auth/sign-out'

        toast('Sua sessão foi expirada. Faça login novamente.')
      }
    }
    return Promise.reject(error)
  }
)
