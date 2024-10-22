import Image from 'next/image'

import ResetPasswordForm from './reset-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Recuperar senha</h1>
            <p className="text-muted-foreground text-balance">
              Por favor, insira sua nova senha
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  )
}
