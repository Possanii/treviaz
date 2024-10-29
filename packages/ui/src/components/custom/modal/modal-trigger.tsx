'use client'

import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'

interface IModalTrigger {
  label?: string
  children?: React.ReactNode
}

export function ModalTrigger({ label, children }: IModalTrigger) {
  return (
    <DialogTrigger asChild>
      {children || (
        <Button variant="outline" className="truncate text-sm">
          {label || 'Cadastrar'}
        </Button>
      )}
    </DialogTrigger>
  )
}
