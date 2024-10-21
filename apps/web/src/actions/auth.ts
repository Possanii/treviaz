'use server'

import { env } from '@treviaz/env'
import { createClient } from '@treviaz/supabase/server'
import { HTTPError } from 'ky'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IHttpBody } from '@/interfaces/IHttpBody'
import { encodedRedirect } from '@/utils/utils'

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
  password: z.string().min(8),
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

    const { error } = await supabase.auth.signInWithPassword({
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

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = createClient()
  const origin = headers().get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    )
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    )
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated')
}

export const signOutAction = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}
