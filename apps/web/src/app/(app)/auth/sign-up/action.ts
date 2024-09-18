'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/actions/auth/sign-up'
import { IHttpBody } from '@/interfaces/IHttpBody'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, Insira seu nome completo.',
    }),
    email: z
      .string()
      .email({ message: 'Por favor, forneça um e-mail válido.' }),
    password: z.string().min(6, {
      message: 'Por favor, sua senha deve ter pelo menos 6 caracteres.',
    }),
    password_confirmation: z.string().min(6, {
      message: 'Por favor, sua senha deve ter pelo menos 6 caracteres.',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'A confirmação da senha não corresponde.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, email, password } = result.data

    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message, body } = await err.response.json<IHttpBody>()

      return {
        success: false,
        message: message.message,
        errors: body ? (body.errors as Record<string, string[]>) : null,
      }
    }

    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
