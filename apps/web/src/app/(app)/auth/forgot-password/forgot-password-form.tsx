'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { ForgotPasswordDto, forgotPasswordSchema } from '@/actions/auth.dto'
import { useForgotPasswordMutation } from '@/hooks/react-query/mutations/auth/forgot-password-mutation'

export function ForgotPasswordForm() {
  const { mutateAsync, isPending } = useForgotPasswordMutation()

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleSubmit = useFormHandleSubmit(async (data) => {
    await mutateAsync(data)
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
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
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Recuperar senha'
        )}
      </Button>
      <div className="mt-4 text-center text-sm">
        Lembrou sua senha?{' '}
        <Link href="/auth/sign-in" className="underline">
          Login
        </Link>
      </div>
    </form>
  )
}
