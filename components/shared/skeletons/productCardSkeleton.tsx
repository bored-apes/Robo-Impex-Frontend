import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Skeleton className="aspect-square w-full" />
      <div className="card-responsive space-responsive">
        <div className="space-responsive">
          <Skeleton className="h-3 w-full sm:h-4" />
          <Skeleton className="h-2 w-1/2 sm:h-3" />
        </div>
        <div className="flex items-center gap-responsive">
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
          <Skeleton className="h-2 w-12 sm:h-3" />
        </div>
        <div className="space-responsive">
          <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
          <Skeleton className="h-2 w-16 sm:h-3" />
        </div>
        <Skeleton className="h-2 w-20 sm:h-3" />
        <div className="flex gap-responsive pt-2 sm:pt-3">
          <Skeleton className="btn-small flex-1" />
          <Skeleton className="btn-small w-16 sm:w-20 md:w-24" />
        </div>
      </div>
    </div>
  )
}
