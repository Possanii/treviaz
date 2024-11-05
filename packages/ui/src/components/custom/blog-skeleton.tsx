import { Skeleton } from '../ui/skeleton'

export function ForumThreadsSkeleton() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[3/2] w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
    </div>
  )
}
