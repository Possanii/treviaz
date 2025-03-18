import { Button } from '@treviaz/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPrimitive,
  DropdownMenuTrigger,
} from '@treviaz/ui/components/ui/dropdown-menu'
import { ChevronsUpDown, CircleCheck, CircleX, LucideIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { useMutationUpdateDelivery } from '@/hooks/react-query/mutations/delivery/approve-delivery-mutation'
import { useQueryGetCondominiumDeliveries } from '@/hooks/react-query/queries/delivery/get-condominium-deliveries'
import { queryClient } from '@/lib/query-client'

interface IDropdownUpdateDeliveriesActionsProps {
  label: string
  Icon: LucideIcon
  onClick: () => void
}

export function DropdownUpdateDeliveriesActions({
  deliveryId,
}: {
  deliveryId: string
}) {
  const { slug } = useParams<{ slug: string }>()

  const {
    mutateAsync: updateDeliveryMutateAsync,
    isSuccess: updateDeliveryIsSuccess,
    isPending: updateDeliveryIsPending,
  } = useMutationUpdateDelivery()

  useEffect(() => {
    if (updateDeliveryIsSuccess) {
      queryClient.invalidateQueries(
        useQueryGetCondominiumDeliveries({ condominiumSlug: slug })
      )
    }
  }, [queryClient, slug, updateDeliveryIsSuccess])

  const data: IDropdownUpdateDeliveriesActionsProps[] = [
    {
      label: 'Entregue',
      Icon: CircleCheck,
      onClick: () =>
        updateDeliveryMutateAsync({ deliveryId, status: 'DELIVERED' }),
    },
    {
      label: 'Rescusado',
      Icon: CircleX,
      onClick: () =>
        updateDeliveryMutateAsync({ deliveryId, status: 'CANCELLED' }),
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
              onClick={onClick}
              className="w-full cursor-pointer justify-start"
              disabled={updateDeliveryIsPending}
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
