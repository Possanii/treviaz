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
import { toast } from 'sonner'

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
      onClick: () => toast('approve'),
    },
    {
      label: 'Reprovar',
      Icon: CircleX,
      onClick: () => toast('denied'),
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
