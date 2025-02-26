import { isStrongPassword } from 'validator'
import { z } from 'zod'

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

export const resetPasswordSchema = z
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

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>
