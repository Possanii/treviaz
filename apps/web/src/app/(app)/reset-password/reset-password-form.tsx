'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@treviaz/ui/components/ui/alert'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { toast } from '@treviaz/ui/components/ui/sonner'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { resetPasswordAction } from '@/actions/auth'
import { useFormState } from '@/hooks/use-form-state'

export default function ResetPasswordForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: resetPasswordAction,
    onSuccess: () => {
      router.replace('/auth/sign-in')
      toast('Sua senha foi alterada com sucesso.')
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md p-4 gap-4 [&>input]:mb-4"
    >
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha no cadastro!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input
          type="password"
          name="password"
          placeholder="Nova senha"
          required
          errors={errors?.password && errors.password[0]}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm_password">Confirmar nova senha</Label>
        <Input
          type="password"
          name="confirm_password"
          placeholder="Confirmar nova senha"
          required
          errors={errors?.confirm_password && errors.confirm_password[0]}
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
