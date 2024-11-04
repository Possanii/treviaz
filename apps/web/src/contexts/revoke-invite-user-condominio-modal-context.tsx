'use client'

import { Modal } from '@treviaz/ui/components/custom/modal/index'
import * as React from 'react'

import { RevokeInviteUserCondominiumForm } from '@/forms/revoke-invite-user-condominium/form'

type IRevokeInviteUserCondominiumModalContextValue = {
  inviteId: string | null
  setInviteId: (inviteId: string | null) => void
  open: boolean
  setOpen: (open: boolean) => void
  toggleModal: (inviteId?: string | null) => void
}

interface IRevokeInviteUserCondominiumModalProviderProps {
  children: React.ReactNode
}

export const RevokeInviteUserCondominiumModalContext =
  React.createContext<IRevokeInviteUserCondominiumModalContextValue | null>(
    null
  )

export function useModalRevokeInviteUserCondominium() {
  const context = React.useContext(RevokeInviteUserCondominiumModalContext)
  if (!context) {
    throw new Error(
      'useModalRevokeInviteUserCondominium must be used within a ModalRevokeInviteUserCondominiumContext.'
    )
  }

  return context
}

export const RevokeInviteUserCondominiumModalProvider: React.FC<
  IRevokeInviteUserCondominiumModalProviderProps & {
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
  const [_inviteId, _setInviteId] = React.useState<string | null>(null)

  const open = openProp ?? _open
  const inviteId = _inviteId

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        setOpenProp(typeof value === 'function' ? value(open) : value)
      } else {
        _setOpen(value)
      }
    },
    [setOpenProp, open]
  )

  const setInviteId = React.useCallback((value: string | null) => {
    _setInviteId(value)
  }, [])

  const toggleModal = React.useCallback(
    (inviteId?: string | null) => {
      setInviteId(inviteId ?? null)
      setOpen((open) => !open)
    },
    [setOpen, setInviteId]
  )

  const contextValue =
    React.useMemo<IRevokeInviteUserCondominiumModalContextValue>(
      () => ({
        inviteId,
        setInviteId,
        open,
        setOpen,
        toggleModal,
      }),
      [inviteId, open, setOpen, toggleModal]
    )

  return (
    <RevokeInviteUserCondominiumModalContext.Provider value={contextValue}>
      {children}
      <Modal.Root open={open} toggleModal={() => toggleModal(null)}>
        <Modal.Content>
          <Modal.Header />
          {inviteId && <RevokeInviteUserCondominiumForm inviteId={inviteId} />}
        </Modal.Content>
      </Modal.Root>
    </RevokeInviteUserCondominiumModalContext.Provider>
  )
}
