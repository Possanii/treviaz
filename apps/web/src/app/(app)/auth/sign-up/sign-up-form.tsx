'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@treviaz/ui/components/ui/alert'
import { Button } from '@treviaz/ui/components/ui/button'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useFormState } from '@/hooks/use-form-state'

import { signUpAction } from './action'

export default function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: signUpAction,
    onSuccess: () => {
      router.push('/auth/sign-in')
    },
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha no cadastro!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="name">Nome :</Label>
        <Input
          id="name"
          name="name"
          required
          errors={errors?.name && errors.name[0]}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email :</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          errors={errors?.email && errors.email[0]}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha :</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          errors={errors?.password && errors.password[0]}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password_confirmation">Confirmar senha :</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required
          errors={
            errors?.password_confirmation && errors.password_confirmation[0]
          }
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
