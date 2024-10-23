import { Skeleton } from '@treviaz/ui/components/ui/skeleton'
import { ChevronsUpDown } from 'lucide-react'

export function CondominionSwitcherSkeleton() {
  return (
    <Skeleton className="flex flex-1 px-2 py-1.5 items-center">
      <div className="flex flex-col flex-1 gap-1">
        <Skeleton className="h-[18px] w-3/4 bg-gray-300 dark:bg-gray-800" />
        <Skeleton className="h-[14px] w-1/2 bg-gray-300 dark:bg-gray-800" />
      </div>
      <ChevronsUpDown className="size-4 ml-auto" />
    </Skeleton>
  )
}
