// src/components/shared/skeletons/OrderPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { OrderCardSkeleton } from "./orderCardSkeleton"

export function OrderPageSkeleton() {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Header Skeleton */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="w-full sm:w-auto">
              <Skeleton className="h-8 sm:h-10 md:h-12 w-48 sm:w-56 mb-2 sm:mb-3 rounded-lg" />
              <Skeleton className="h-4 sm:h-5 w-64 sm:w-72 rounded-md" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
              <Skeleton className="h-9 sm:h-10 w-24 sm:w-28 rounded-md flex-shrink-0" />
              <Skeleton className="h-9 sm:h-10 w-36 sm:w-44 rounded-md flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Orders Count Skeleton */}
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-5 w-40 sm:w-48 rounded-md" />
        </div>

        {/* Orders Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <OrderCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <Skeleton className="h-10 w-64 sm:w-80 rounded-lg" />
        </div>
      </div>
    </div>
  )
}