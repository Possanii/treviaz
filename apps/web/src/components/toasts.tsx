'use client'

import { AlertCircle, Check } from 'lucide-react'
import { toast } from 'sonner'

export function SuccessToast(message: string, description?: string) {
  toast(message, {
    icon: <Check />,
    description,
    className: 'text-white gap-2 bg-green-500',
  })
}

export function ErrorToast(message: string, description: string) {
  toast(message, {
    icon: <AlertCircle />,
    description,
    className: 'text-white gap-2 bg-red-500',
  })
}

export function UnkownErrorToats(err: Error) {
  toast('Algo deu errado', {
    icon: <AlertCircle />,
    description: 'Algum erro inesperado aconteceu. Tenta novamente mais tarde',
    className: 'text-white gap-2 bg-red-500',
  })

  console.log(err)
}
