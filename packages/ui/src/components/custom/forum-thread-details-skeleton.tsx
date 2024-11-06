import { Skeleton } from '../ui/skeleton'

export function ForumThreadDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-12 md:py-16 lg:py-20">
        <article className="mx-auto max-w-3xl">
          <Skeleton className="mb-4 h-10 w-3/4" />
          <div className="mb-6 flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </article>
        <Skeleton className="my-8 h-px w-full" />
        <section className="mx-auto max-w-3xl">
          <Skeleton className="mb-4 h-8 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-lg" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
