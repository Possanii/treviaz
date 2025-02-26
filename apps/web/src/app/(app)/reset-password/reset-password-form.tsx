'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { ResetPasswordDto, resetPasswordSchema } from '@/actions/auth.dto'
import { useResetPasswordMutation } from '@/hooks/react-query/mutations/auth/reset-password-mutation'

export default function ResetPasswordForm() {
  const { mutateAsync, isPending } = useResetPasswordMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const handleSubmit = useFormHandleSubmit(async (data) => {
    await mutateAsync(data)

    router.replace('/auth/sign-in')
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md p-4 gap-4 [&>input]:mb-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input
          type="password"
          placeholder="Nova senha"
          required
          errors={errors?.password && errors.password.message}
          {...register('password')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm_password">Confirmar nova senha</Label>
        <Input
          type="password"
          placeholder="Confirmar nova senha"
          required
          errors={errors?.confirm_password && errors.confirm_password.message}
          {...register('confirm_password')}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Mudar senha'
        )}
      </Button>
    </form>
  )
}
