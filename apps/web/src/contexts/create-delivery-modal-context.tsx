'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { CreateDeliveryForm } from '@/forms/create-delivery/form'

type ICreateDeliveryModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: () => void
}

interface ICreateDeliveryModalProviderProps {
  children: React.ReactNode
}

export const CreateDeliveryModalContext =
  React.createContext<ICreateDeliveryModalContextValue | null>(null)

export function useModalCreateDelivery() {
  const context = React.useContext(CreateDeliveryModalContext)
  if (!context) {
    throw new Error(
      'useModalCreateDelivery must be used within a ModalCreateDeliveryContext.'
    )
  }

  return context
}

export const CreateDeliveryModalProvider: React.FC<
  ICreateDeliveryModalProviderProps & {
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

  const contextValue = React.useMemo<ICreateDeliveryModalContextValue>(
    () => ({
      open,
      setOpen,
      toggleModal,
    }),
    [open, setOpen, toggleModal]
  )

  return (
    <CreateDeliveryModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={toggleModal}>
        <Modal.Content>
          <Modal.Header />
          <CreateDeliveryForm />
        </Modal.Content>
      </Modal.Root>
    </CreateDeliveryModalContext.Provider>
  )
}
