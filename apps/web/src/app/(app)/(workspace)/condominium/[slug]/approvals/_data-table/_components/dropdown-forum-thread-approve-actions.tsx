import { Button } from '@treviaz/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPrimitive,
  DropdownMenuTrigger,
} from '@treviaz/ui/components/ui/dropdown-menu'
import {
  ChevronsUpDown,
  CircleCheck,
  CircleX,
  Eye,
  LucideIcon,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useMutationApproveForumThread } from '@/hooks/react-query/mutations/forum/approve-forum-thread-mutation'
import { useMutationDenyForumThread } from '@/hooks/react-query/mutations/forum/deny-forum-thread-mutation'
import { useQueryGetForumThreadsToApprove } from '@/hooks/react-query/queries/forum/get-forum-threads-to-approve'
import { queryClient } from '@/lib/query-client'

interface IDropdownForumThreadApproveActionsProps {
  label: string
  Icon: LucideIcon
  onClick: () => void
}

export function DropdownForumThreadApproveActions({
  threadSlug,
}: {
  threadSlug: string
}) {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()

  const {
    mutateAsync: approveForumThreadMutateAsync,
    isSuccess: approveForumThreadIsSuccess,
    isPending: approveForumThreadIsPending,
  } = useMutationApproveForumThread()

  const {
    mutateAsync: denyForumThreadMutateAsync,
    isSuccess: denyForumThreadIsSuccess,
    isPending: denyForumThreadIsPending,
  } = useMutationDenyForumThread()

  useEffect(() => {
    if (approveForumThreadIsSuccess || denyForumThreadIsSuccess) {
      queryClient.invalidateQueries(
        useQueryGetForumThreadsToApprove({ condominiumSlug: slug })
      )
    }
  }, [queryClient, slug, approveForumThreadIsSuccess, denyForumThreadIsSuccess])

  const data: IDropdownForumThreadApproveActionsProps[] = [
    {
      label: 'Ver',
      Icon: Eye,
      onClick: () =>
        router.push(`/condominium/${slug}/approvals/${threadSlug}`),
    },
    {
      label: 'Aprovar',
      Icon: CircleCheck,
      onClick: () => approveForumThreadMutateAsync({ threadSlug }),
    },
    {
      label: 'Reprovar',
      Icon: CircleX,
      onClick: () => denyForumThreadMutateAsync({ threadSlug }),
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
              disabled={approveForumThreadIsPending || denyForumThreadIsPending}
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
