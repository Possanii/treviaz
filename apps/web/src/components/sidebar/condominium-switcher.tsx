'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@treviaz/ui/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@treviaz/ui/components/ui/sidebar'
import { ChevronsUpDown, Plus } from 'lucide-react'
import * as React from 'react'

import { useModalCreateCondominium } from '@/contexts/create-condominium-modal-context'
import { useQueryGetRelationshipsWithCondominiums } from '@/hooks/react-query/queries/get-user-relationships-with-condominiums'

export function CondominiumSwitcher() {
  const {
    data: { relantionships },
  } = useSuspenseQuery(useQueryGetRelationshipsWithCondominiums())

  const { isMobile } = useSidebar()
  const { toggleModal } = useModalCreateCondominium()
  const [activeCondominium, setActiveCondominium] = React.useState(
    relantionships[0]
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeCondominium.logo className="size-4" />
              </div> */}
              {activeCondominium ? (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeCondominium.condominium.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeCondominium.condominium.slug}
                  </span>
                </div>
              ) : (
                <div className="flex gap-2 flex-1 items-center text-sm truncate text-left leading-tight">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground text-xs">
                    Add condominium
                  </span>
                </div>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Condominiums
            </DropdownMenuLabel>
            {relantionships.map((relantionship, index) => (
              <DropdownMenuItem
                key={relantionship.condominium.name}
                onClick={() => setActiveCondominium(relantionship)}
                className="gap-2 p-2"
              >
                {/* <div className="flex size-6 items-center justify-center rounded-sm border">
                  <condominium.logo className="size-4 shrink-0" />
                </div> */}
                {relantionship.condominium.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <Button onClick={toggleModal} asChild>
                <div className="font-medium text-muted-foreground">
                  Add condominium
                </div>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
