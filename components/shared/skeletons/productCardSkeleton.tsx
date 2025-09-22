import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border ">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        <div className="space-y-2 sm:space-y-3">
          <Skeleton className="h-3 w-full sm:h-4" />
          <Skeleton className="h-2 w-1/2 sm:h-3" />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
          <Skeleton className="h-2 w-12 sm:h-3" />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
          <Skeleton className="h-2 w-16 sm:h-3" />
        </div>
        <Skeleton className="h-2 w-20 sm:h-3" />
        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-3">
          <Skeleton className="h-7 flex-1 sm:h-8 md:h-9" />
          <Skeleton className="h-7 w-16 sm:h-8 sm:w-20 md:h-9 md:w-24" />
        </div>
      </div>
    </div>
  )
}