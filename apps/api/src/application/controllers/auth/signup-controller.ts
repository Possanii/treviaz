import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { userSchema } from '@/application/schemas/IUser'
import { SignUpService } from '@/application/services/auth/signup-service'

// Define a custom schema for the condominium in the signup request
const signupCondominiumSchema = z.object({
  role: z.enum(['RESIDENT', 'ADMIN', 'SYNDIC', 'BILLING', 'SERVICES']),
  condominium_id: z.string().uuid(),
})

const createUserSchema = userSchema.omit({ id: true }).extend({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
  password_confirmation: z.string().optional(),
  document_number: z.string().optional(),
  condominium: signupCondominiumSchema.optional(),
})

export class SignUpController implements IController {
  constructor(private signUpService: SignUpService) {}

  async handle(request: IRequest): Promise<IResponse> {
    console.log('SignUpController received request body:', JSON.stringify(request.body, null, 2))
    
    const validatedData = createUserSchema.safeParse(request.body)

    if (!validatedData.success) {
      const errors = validatedData.error.flatten()
      console.log('Validation errors:', JSON.stringify(errors, null, 2))

      return {
        statusCode: 422,
        body: {
          message: 'Invalid user data.',
          errors: errors.fieldErrors,
        },
      }
    }

    console.log('Validation successful, calling service with:', JSON.stringify(validatedData.data, null, 2))
    const user = await this.signUpService.execute(validatedData.data)
    return {
      statusCode: 201,
      body: {
        user,
      },
    }
  }
}
