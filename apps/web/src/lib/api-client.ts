import { env } from '@treviaz/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
