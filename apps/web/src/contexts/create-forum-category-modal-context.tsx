'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { FormCreateForumCategory } from '@/forms/create-forum-category/form'

type ICreateForumCategoryModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: () => void
}

interface ICreateForumCategoryModalProviderProps {
  children: React.ReactNode
}

export const CreateForumCategoryModalContext =
  React.createContext<ICreateForumCategoryModalContextValue | null>(null)

export function useModalCreateForumCategory() {
  const context = React.useContext(CreateForumCategoryModalContext)
  if (!context) {
    throw new Error(
      'useModalCreateForumCategory must be used within a ModalCreateForumCategoryContext.'
    )
  }

  return context
}

export const CreateForumCategoryModalProvider: React.FC<
  ICreateForumCategoryModalProviderProps & {
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

  const contextValue = React.useMemo<ICreateForumCategoryModalContextValue>(
    () => ({
      open,
      setOpen,
      toggleModal,
    }),
    [open, setOpen, toggleModal]
  )

  return (
    <CreateForumCategoryModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={toggleModal}>
        <Modal.Content>
          <Modal.Header />
          <FormCreateForumCategory />
        </Modal.Content>
      </Modal.Root>
    </CreateForumCategoryModalContext.Provider>
  )
}
