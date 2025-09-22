import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./productCardSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen  px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 md:h-5 md:w-24" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-3 w-20 sm:h-4 sm:w-24 md:h-5 md:w-28" />
          <span className="text-muted-foreground">/</span>
          <Skeleton className="h-3 w-24 sm:h-4 sm:w-28 md:h-5 md:w-32" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Image Section */}
          <div className="space-y-4 sm:space-y-6">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Badges */}
            <div className="flex gap-2 sm:gap-3">
              <Skeleton className="h-5 w-20 sm:h-6 sm:w-24 rounded-full" />
              <Skeleton className="h-5 w-24 sm:h-6 sm:w-28 rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-6 w-full sm:h-8 sm:w-3/4 md:h-10 md:w-2/3" />
              <Skeleton className="h-5 w-3/4 sm:h-6 sm:w-2/3 md:h-8 md:w-1/2" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-4 w-24 sm:h-5 sm:w-32 md:h-6 md:w-40" />
              <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 md:h-5 md:w-24" />
            </div>

            {/* Price */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <Skeleton className="h-8 w-28 sm:h-10 sm:w-32 md:h-12 md:w-36" />
                <Skeleton className="h-3 w-20 sm:h-4 sm:w-24 md:h-5 md:w-28" />
              </div>
              <Skeleton className="h-3 w-32 sm:h-4 sm:w-40 md:h-5 md:w-48" />
            </div>

            {/* Stock */}
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 w-28 sm:h-4 sm:w-36 md:h-5 md:w-40" />
              <Skeleton className="h-3 w-36 sm:h-4 sm:w-48 md:h-5 md:w-56" />
            </div>

            {/* Quantity */}
            <div className="space-y-3 sm:space-y-4">
              <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 md:h-5 md:w-24" />
              <div className="flex items-center gap-3 sm:gap-4">
                <Skeleton className="h-8 w-28 sm:h-10 sm:w-32 md:h-12 md:w-36" />
                <Skeleton className="h-3 w-20 sm:h-4 sm:w-24 md:h-5 md:w-28" />
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <Skeleton className="h-10 w-full sm:h-12 md:h-14" />
              <div className="flex gap-2 sm:gap-3">
                <Skeleton className="h-10 flex-1 sm:h-12 md:h-14" />
                <Skeleton className="h-10 flex-1 sm:h-12 md:h-14" />
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:pt-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <Skeleton className="h-3 w-16 mx-auto sm:h-4 sm:w-20 md:h-5 md:w-24" />
                <Skeleton className="h-3 w-20 mx-auto sm:h-4 sm:w-24 md:h-5 md:w-28" />
              </div>
              <div className="text-center space-y-2 sm:space-y-3">
                <Skeleton className="h-3 w-12 mx-auto sm:h-4 sm:w-16 md:h-5 md:w-20" />
                <Skeleton className="h-3 w-24 mx-auto sm:h-4 sm:w-28 md:h-5 md:w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="space-y-6 mb-8 sm:mb-12 md:mb-16 lg:mb-20 mt-8 sm:mt-12 md:mt-16">
          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-4 sm:gap-6 border-b mb-6 sm:mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-20 sm:h-10 sm:w-24 md:h-12 md:w-28"
              />
            ))}
          </div>
          <div className="hidden md:block">
            <TabContentSkeleton />
          </div>

          {/* Mobile Stacked */}
          <div className="md:hidden space-y-4 sm:space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 sm:space-y-4">
                <Skeleton className="h-5 w-28 sm:h-6 sm:w-32 md:h-7 md:w-36" />
                <Skeleton className="h-3 w-full sm:h-4" />
                <Skeleton className="h-3 w-5/6 sm:h-4" />
                <Skeleton className="h-3 w-4/6 sm:h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-40 sm:h-8 sm:w-48 md:h-10 md:w-56" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabContentSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Skeleton className="h-5 w-40 sm:h-6 sm:w-48 md:h-7 md:w-56" />
      <Skeleton className="h-3 w-full sm:h-4" />
      <Skeleton className="h-3 w-5/6 sm:h-4" />
      <Skeleton className="h-3 w-4/6 sm:h-4" />
      <Skeleton className="h-3 w-full sm:h-4" />
      <Skeleton className="h-3 w-3/4 sm:h-4" />
    </div>
  );
}
