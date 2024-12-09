import Image from 'next/image'
import Link from 'next/link'

import LogoWithTextWhiteBg from '@/assets/logo/logo-with-text.png'

import SignUpForm from './sign-up-form'

export default function SignUpPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="bg-muted hidden lg:block">
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
            <h1 className="text-3xl font-bold">Cadastrar</h1>
            <p className="text-muted-foreground text-balance">
              Entre com suas informações para criar sua conta
            </p>
          </div>
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{' '}
            <Link href="/auth/sign-in" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
