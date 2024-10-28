'use client'

import { Button } from '@treviaz/ui/components/ui/button'
import { DialogTrigger } from '@treviaz/ui/components/ui/dialog'

interface IModalCreateCondominiumTrigger {
  children?: React.ReactNode
}

export function ModalCreateCondominiumTrigger({
  children,
}: IModalCreateCondominiumTrigger) {
  return (
    <DialogTrigger asChild>
      {children || (
        <Button variant="outline" className="truncate text-sm">
          Create Condominium
        </Button>
      )}
    </DialogTrigger>
  )
}
