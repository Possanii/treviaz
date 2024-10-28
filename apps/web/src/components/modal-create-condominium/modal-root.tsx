'use client'

import { Dialog } from '@treviaz/ui/components/ui/dialog'

import { useModalCreateCondominium } from '@/contexts/create-condominium-modal-context'

interface IModalCreateCondominiumRoot {
  children: React.ReactNode
}

export function ModalCreateCondominiumRoot({
  children,
}: IModalCreateCondominiumRoot) {
  const { open, toggleModal } = useModalCreateCondominium()

  return (
    <Dialog open={open} onOpenChange={toggleModal} modal>
      {children}
    </Dialog>
  )
}
