import Image from 'next/image'

import LogoWithTextWhiteBg from '@/assets/logo/logo-with-text.png'

import { ForgotPasswordForm } from './forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src={LogoWithTextWhiteBg}
          alt="Image"
          width="1920"
          height="1080"
          className="max-h-screen w-full object-cover bg-green-600"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Esqueceu a senha</h1>
            <p className="text-muted-foreground text-balance">
              Entre com email abaixo para solicitar a recuperação de conta.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
