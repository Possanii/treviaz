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
import Link from 'next/link'

import { forgotPasswordAction } from '@/actions/auth'
import { useFormState } from '@/hooks/use-form-state'

export function ForgotPasswordForm() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: forgotPasswordAction,
    onSuccess: () => {
      toast('Mais informações foram enviadas para o email provido.')
    },
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha na solicitação!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          errors={errors?.email && errors?.email[0]}
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
