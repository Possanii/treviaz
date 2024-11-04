import { Button } from '@treviaz/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPrimitive,
  DropdownMenuTrigger,
} from '@treviaz/ui/components/ui/dropdown-menu'
import { ChevronsUpDown, CircleX, LucideIcon } from 'lucide-react'

import { useModalRevokeInviteUserCondominium } from '@/contexts/revoke-invite-user-condominio-modal-context'

interface IDropdownInvitesActionsProps {
  label: string
  Icon: LucideIcon
  onClick: (inviteId: string) => void
}

export function DropdownInvitesActions({ inviteId }: { inviteId: string }) {
  const { toggleModal } = useModalRevokeInviteUserCondominium()

  const data: IDropdownInvitesActionsProps[] = [
    {
      label: 'Invalidar convite',
      Icon: CircleX,
      onClick: (inviteId: string) => toggleModal(inviteId),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mb-1 h-10 w-full justify-start" variant={'ghost'}>
          <span className="text-sm truncate">Ações</span>
          <ChevronsUpDown className="ml-4 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {data.map(({ label, Icon, onClick }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Button
              variant={'ghost'}
              onClick={() => onClick(inviteId)}
              className="w-full cursor-pointer justify-start"
            >
              <div className="flex items-center">
                <span className="mr-4">
                  <Icon size={18} />
                </span>
                <p className="max-w-[180px] truncate">{label}</p>
              </div>
            </Button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuPrimitive.DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
