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
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signInAction } from '@/actions/auth'
import { useFormState } from '@/hooks/use-form-state'

export function SignInForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: signInAction,
    onSuccess: () => {
      router.push('/')
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

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
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
            name="password"
            type="password"
            required
            errors={errors?.password && errors.password[0]}
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
