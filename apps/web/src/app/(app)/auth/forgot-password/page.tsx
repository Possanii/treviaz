import { Button } from '@treviaz/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="w-full xl:min-h-screen">
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-auto min-w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
            <CardDescription>
              Insira seu email abaixo para recuperar sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="" className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Recuperar senha
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              Voltar para{' '}
              <Link href="/auth/sign-in" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
