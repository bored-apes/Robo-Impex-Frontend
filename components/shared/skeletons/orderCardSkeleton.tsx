// src/components/shared/skeletons/OrderCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OrderCardSkeleton() {
  return (
    <Card className="border-l-4 border-l-gray-200 dark:border-l-gray-600 overflow-hidden">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <Skeleton className="h-6 sm:h-7 w-32 sm:w-36 rounded-md" />
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-5">
        {/* Order Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-3 w-16 sm:w-20 rounded" />
                <Skeleton className="h-4 w-12 sm:w-14 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <Skeleton className="h-px w-full" />

        {/* Price Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2 sm:space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="h-3 w-20 sm:w-24 rounded" />
                <Skeleton className="h-4 w-12 sm:w-16 rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-2 sm:space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <Skeleton className="h-3 w-24 sm:w-28 rounded" />
                <Skeleton className="h-3 w-20 sm:w-24 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-2 sm:pt-3">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-3 w-32 sm:w-36 rounded" />
          </div>
          <Skeleton className="h-8 w-28 rounded-md order-1 sm:order-2" />
        </div>
      </CardContent>
    </Card>
  )
}