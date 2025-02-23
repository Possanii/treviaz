'use server'

import { cookiesStorage } from '@treviaz/cookies'
import { env } from '@treviaz/env'
import { AxiosError } from 'axios'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

import { signIn } from '@/http/auth/sign-in'
import { signUp } from '@/http/auth/sign-up'
import { IHttpBody } from '@/interfaces/IHttpBody'
import { signUpSchema } from '@/schemas/ISign-up'

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    await signUp(result.data)
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message, body } = err.response!.data as IHttpBody

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

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ message: 'Por favor, Insira sua senha' })
    .min(8, 'Sua senha deve conter 8 caracteres.')
    .refine((password) => isStrongPassword(password), {
      message: 'Por favor, insira uma senha forte.',
    }),
})

export type SignInDto = z.infer<typeof signInSchema>

export const signInAction = async (formData: FormData) => {
  const result = signInSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  try {
    const { email, password } = result.data

    const { data } = await signIn({
      email,
      password,
    })

    cookies().set(cookiesStorage.API_AUTH_TOKEN, data.access_token, {
      httpOnly: true,
      expires: new Date(data.expires_in * 1000),
      path: '/',
      sameSite: 'strict',
      secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
    })
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message, body } = err.response!.data as IHttpBody

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

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const forgotPasswordAction = async (formData: FormData) => {
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  try {
    const origin = headers().get('origin')

    const { email } = result.data
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message, body } = err.response!.data as IHttpBody

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

const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: 'Por favor, Insira sua senha' })
      .min(8, 'Sua senha deve conter 8 caracteres.')
      .refine((password) => isStrongPassword(password), {
        message: 'Por favor, insira uma senha forte.',
      }),
    confirm_password: z
      .string({ message: 'Por favor, Insira sua senha' })
      .min(8, 'Sua senha deve conter 8 caracteres.')
      .refine((password) => isStrongPassword(password), {
        message: 'Por favor, insira uma senha forte.',
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'A confirmação da senha não corresponde.',
    path: ['confirm_password'],
  })

export const resetPasswordAction = async (formData: FormData) => {
  const result = resetPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  try {
    const { password } = result.data
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message, body } = err.response!.data as IHttpBody

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

export const signOutAction = async () => {
  cookies().delete(cookiesStorage.API_AUTH_TOKEN)

  return redirect('/auth/sign-in')
}
