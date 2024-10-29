'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { InviteUserCondominiumForm } from '@/forms/invite-user-condominium/form'

type IInviteUserCondominiumModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: () => void
}

interface IInviteUserCondominiumModalProviderProps {
  children: React.ReactNode
}

export const InviteUserCondominiumModalContext =
  React.createContext<IInviteUserCondominiumModalContextValue | null>(null)

export function useModalInviteUserCondominium() {
  const context = React.useContext(InviteUserCondominiumModalContext)
  if (!context) {
    throw new Error(
      'useModalInviteUserCondominium must be used within a ModalInviteUserCondominiumContext.'
    )
  }

  return context
}

export const InviteUserCondominiumModalProvider: React.FC<
  IInviteUserCondominiumModalProviderProps & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
> = ({
  children,
  defaultOpen = false,
  open: openProp,
  onOpenChange: setOpenProp,
}) => {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === 'function' ? value(open) : value)
      }

      _setOpen(value)
    },
    [setOpenProp, open]
  )

  const toggleModal = React.useCallback(() => {
    return setOpen((open) => !open)
  }, [setOpen])

  const contextValue = React.useMemo<IInviteUserCondominiumModalContextValue>(
    () => ({
      open,
      setOpen,
      toggleModal,
    }),
    [open, setOpen, toggleModal]
  )

  return (
    <InviteUserCondominiumModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={toggleModal}>
        <Modal.Content>
          <Modal.Header />
          <InviteUserCondominiumForm />
        </Modal.Content>
      </Modal.Root>
    </InviteUserCondominiumModalContext.Provider>
  )
}
