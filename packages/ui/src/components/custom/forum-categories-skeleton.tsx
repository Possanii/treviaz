import { Skeleton } from '../ui/skeleton'

export function ForumCategoriesSkeleton() {
  return (
    <main className="container py-[--main-content-padding]">
      <div className="space-y-2 text-center">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-9 w-28" />
          ))}
      </div>
    </main>
  )
}
