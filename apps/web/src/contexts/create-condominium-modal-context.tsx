'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { FormCreateCondominium } from '@/forms/create-condominium/form'

type ICreateCondominiumModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: () => void
}

interface ICreateCondominiumModalProviderProps {
  children: React.ReactNode
}

export const CreateCondominiumModalContext =
  React.createContext<ICreateCondominiumModalContextValue | null>(null)

export function useModalCreateCondominium() {
  const context = React.useContext(CreateCondominiumModalContext)
  if (!context) {
    throw new Error(
      'useModalCreateCondominium must be used within a ModalCreateCondominiumContext.'
    )
  }

  return context
}

export const CreateCondominiumModalProvider: React.FC<
  ICreateCondominiumModalProviderProps & {
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

  const contextValue = React.useMemo<ICreateCondominiumModalContextValue>(
    () => ({
      open,
      setOpen,
      toggleModal,
    }),
    [open, setOpen, toggleModal]
  )

  return (
    <CreateCondominiumModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={toggleModal}>
        <Modal.Content>
          <Modal.Header />
          <FormCreateCondominium />
        </Modal.Content>
      </Modal.Root>
    </CreateCondominiumModalContext.Provider>
  )
}
