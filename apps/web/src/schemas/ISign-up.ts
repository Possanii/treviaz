import { isStrongPassword } from 'validator'
import { z } from 'zod'

export const signUpSchema = z
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

export type SignUpDto = z.infer<typeof signUpSchema>
