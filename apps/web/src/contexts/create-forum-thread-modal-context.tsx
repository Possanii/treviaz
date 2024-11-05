'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { FormCreateForumThread } from '@/forms/create-forum-thread/form'
import { IGetAllCategoriesFromCondominium } from '@/http/forum/get-all-categories-from-condominium'

type ICreateForumThreadModalContextValue = {
  categories: IGetAllCategoriesFromCondominium | null
  setCategories: (categories: IGetAllCategoriesFromCondominium | null) => void
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: (categories?: IGetAllCategoriesFromCondominium | null) => void
}

interface ICreateForumThreadModalProviderProps {
  children: React.ReactNode
}

export const CreateForumThreadModalContext =
  React.createContext<ICreateForumThreadModalContextValue | null>(null)

export function useModalCreateForumThread() {
  const context = React.useContext(CreateForumThreadModalContext)
  if (!context) {
    throw new Error(
      'useModalCreateForumThread must be used within a ModalCreateForumThreadContext.'
    )
  }

  return context
}

export const CreateForumThreadModalProvider: React.FC<
  ICreateForumThreadModalProviderProps & {
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
  const [_categories, _setCategories] =
    React.useState<IGetAllCategoriesFromCondominium | null>(null)

  const open = openProp ?? _open
  const categories = _categories

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === 'function' ? value(open) : value)
      }

      _setOpen(value)
    },
    [setOpenProp, open]
  )

  const setCategories = React.useCallback(
    (value: IGetAllCategoriesFromCondominium | null) => {
      _setCategories(value)
    },
    []
  )

  const toggleModal = React.useCallback(
    (categories?: IGetAllCategoriesFromCondominium | null) => {
      setCategories(categories ?? null)
      setOpen((open) => !open)
    },
    [setOpen, setCategories]
  )

  const contextValue = React.useMemo<ICreateForumThreadModalContextValue>(
    () => ({
      categories,
      setCategories,
      open,
      setOpen,
      toggleModal,
    }),
    [categories, open, setOpen, toggleModal]
  )

  return (
    <CreateForumThreadModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={() => toggleModal(null)}>
        <Modal.Content>
          <Modal.Header />
          {categories && <FormCreateForumThread categories={categories} />}
        </Modal.Content>
      </Modal.Root>
    </CreateForumThreadModalContext.Provider>
  )
}
