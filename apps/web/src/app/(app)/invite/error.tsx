'use client'

import { Button } from '@treviaz/ui/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logo from '@/assets/logo/logo-with-text.png'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  const router = useRouter()

  if (error.message.includes('status code 404')) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-10 lg:p-0 xl:flex-row">
        <Image
          className="mx-auto h-auto max-w-full sm:max-w-lg xl:m-0"
          src={Logo}
          alt="Treviaz Logo"
        />
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-easy3d-primary lg:text-9xl">
                404
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Seu convite não é mais válido :(
              </p>
              <p className="mb-4 text-lg font-light text-gray-500">
                O convite procurado já expirou ou não é mais válido. Entre em
                contato com o administrador para solicitar novamente o convite.
              </p>
              <Button
                onClick={() => router.replace('/auth/sign-in')}
                className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                Voltar para autenticação
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-10 lg:p-0 xl:flex-row">
      <Image
        className="mx-auto h-auto max-w-full sm:max-w-lg xl:m-0"
        src={Logo}
        alt="Easy3D Logo"
      />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-easy3d-primary lg:text-9xl">
              500
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Algo deu errado!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500">
              Oops, Algo deu errado com essa página. Contate um administrador.
            </p>
            <Button
              onClick={() => router.replace('/auth/sign-in')}
              className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Voltar para autenticação
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
