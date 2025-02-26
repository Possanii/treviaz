'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useSignUpMutation } from '@/hooks/react-query/mutations/auth/sign-up-mutation'
import { ISignUp, signUpSchema } from '@/schemas/ISign-up'

export default function SignUpForm() {
  const router = useRouter()
  const { mutateAsync, isPending } = useSignUpMutation()

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSubmit = useFormHandleSubmit(async (data) => {
    await mutateAsync(data)

    router.push('/')
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nome :</Label>
        <Input
          id="name"
          required
          errors={errors?.name && errors.name.message}
          {...register('name')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email :</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          errors={errors?.email && errors.email.message}
          {...register('email')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha :</Label>
        <Input
          id="password"
          type="password"
          required
          errors={errors?.password && errors.password.message}
          {...register('password')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password_confirmation">Confirmar senha :</Label>
        <Input
          id="password_confirmation"
          type="password"
          required
          errors={
            errors?.password_confirmation &&
            errors.password_confirmation.message
          }
          {...register('password_confirmation')}
        />
      </div>
      <Button type="submit" className="w-full mt-6" disabled={isPending}>
        {isPending ? (
          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
        ) : (
          'Cadastrar'
        )}
      </Button>
    </form>
  )
}
