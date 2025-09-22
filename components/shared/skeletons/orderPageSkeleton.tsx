// src/components/shared/skeletons/OrderPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { OrderCardSkeleton } from "./orderCardSkeleton"

export function OrderPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-700 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="w-full sm:w-auto">
              <Skeleton className="h-7 w-40 sm:h-8 sm:w-48 mb-2 sm:mb-3" />
              <Skeleton className="h-3 w-48 sm:h-4 sm:w-64" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <Skeleton className="h-8 w-20 sm:h-9 sm:w-24 rounded-md flex-shrink-0" />
              <Skeleton className="h-8 w-36 sm:h-9 sm:w-48 rounded-md flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-6">
          <Skeleton className="h-4 w-32 sm:h-5 sm:w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}