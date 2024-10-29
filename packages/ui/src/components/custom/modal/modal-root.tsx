'use client'

import { Dialog } from '@/components/ui/dialog'

interface IModalRoot {
  open: boolean
  toggleModal: () => void
  children: React.ReactNode
}

export function ModalRoot({ open, toggleModal, children }: IModalRoot) {
  return (
    <Dialog open={open} onOpenChange={toggleModal} modal>
      {children}
    </Dialog>
  )
}
