'use server'

import { cookiesStorage } from '@treviaz/cookies'
import { env } from '@treviaz/env'
import { createClient } from '@treviaz/supabase/server'
import { HTTPError } from 'ky'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { isStrongPassword } from 'validator'
import { z } from 'zod'

import { IHttpBody } from '@/interfaces/IHttpBody'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, Insira seu nome completo.',
    }),
    email: z
      .string()
      .email({ message: 'Por favor, forneça um e-mail válido.' }),
    password: z
      .string({ message: 'Por favor, Insira sua senha' })
      .min(8, 'Sua senha deve conter 8 caracteres.')
      .refine((password) => isStrongPassword(password), {
        message: 'Por favor, insira uma senha forte.',
      }),
    password_confirmation: z
      .string({ message: 'Por favor, Insira sua senha' })
      .min(8, 'Sua senha deve conter 8 caracteres.')
      .refine((password) => isStrongPassword(password), {
        message: 'Por favor, insira uma senha forte.',
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

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL}`,
        data: {
          name,
        },
      },
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        errors: null,
      }
    }
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

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ message: 'Por favor, Insira sua senha' })
    .min(8, 'Sua senha deve conter 8 caracteres.')
    .refine((password) => isStrongPassword(password), {
      message: 'Por favor, insira uma senha forte.',
    }),
})

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

    const supabase = createClient()

    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        errors: null,
      }
    }

    cookies().set(cookiesStorage.API_AUTH_TOKEN, session!.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + session!.expires_in * 1000),
      path: '/',
      sameSite: 'strict',
      secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
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
    const supabase = createClient()
    const origin = headers().get('origin')

    const { email } = result.data

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/api/auth/callback?redirect_to=/reset-password`,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        errors: null,
      }
    }
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
    const supabase = createClient()
    const { password } = result.data

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
        errors: null,
      }
    }
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

export const signOutAction = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  cookies().delete(cookiesStorage.API_AUTH_TOKEN)

  return redirect('/auth/sign-in')
}
