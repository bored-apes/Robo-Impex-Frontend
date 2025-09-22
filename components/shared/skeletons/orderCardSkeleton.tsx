import { Skeleton } from "@/components/ui/skeleton"

export function OrderCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="p-3 sm:p-4 md:p-5 pb-2 sm:pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="space-y-2 sm:space-y-3">
            <Skeleton className="h-4 w-28 sm:h-5 sm:w-32" />
            <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="h-5 w-20 sm:h-6 sm:w-24 rounded-full" />
            <Skeleton className="h-7 w-20 sm:h-8 sm:w-24" />
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Order Items */}
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded" />
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <Skeleton className="h-3 w-3/4 sm:h-4" />
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Skeleton className="h-2 w-16 sm:h-3" />
                    <Skeleton className="h-2 w-20 sm:h-3" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16 sm:h-5" />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16 sm:h-4" />
                <Skeleton className="h-3 w-20 sm:h-4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12 sm:h-4" />
                <Skeleton className="h-3 w-16 sm:h-4" />
              </div>
              <div className="flex justify-between border-t pt-2">
                <Skeleton className="h-4 w-16 sm:h-5" />
                <Skeleton className="h-4 w-20 sm:h-5" />
              </div>
            </div>
            <Skeleton className="h-8 w-full sm:h-9" />
          </div>
        </div>
      </div>
    </div>
  )
}
