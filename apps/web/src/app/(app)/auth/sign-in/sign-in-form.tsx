'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { SignInDto, signInSchema } from '@/actions/auth.dto'
import { useSignInMutation } from '@/hooks/react-query/mutations/auth/sign-in-mutation'

export function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const { mutateAsync, isPending } = useSignInMutation()

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: params.get('email') || '',
    },
  })

  const handleSubmit = useFormHandleSubmit(async (data) => {
    await mutateAsync(data)

    router.push('/')
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
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
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link
              href="/auth/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            errors={errors?.password && errors.password.message}
            {...register('password')}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Login'}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Não tem uma conta?{' '}
        <Link href="/auth/sign-up" className="underline">
          Cadastrar
        </Link>
      </div>
    </form>
  )
}
