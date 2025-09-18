"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-48 bg-muted" />
        <div className="absolute top-2 left-2">
          <Skeleton className="w-16 h-5 rounded-full bg-muted" />
        </div>
        <div className="absolute top-2 right-2">
          <Skeleton className="w-8 h-8 rounded-full bg-muted" />
        </div>
      </div>

      <CardContent className="p-4">
        <Skeleton className="w-full h-5 mb-2 bg-muted" />
        <Skeleton className="w-3/4 h-4 mb-3 bg-muted" />
        <Skeleton className="w-2/3 h-4 mb-3 bg-muted" />

        <div className="flex items-center mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 bg-muted" />
            ))}
          </div>
          <Skeleton className="w-12 h-4 ml-2 bg-muted" />
        </div>

        <Skeleton className="w-20 h-6 bg-muted" />
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Skeleton className="flex-1 h-9 bg-muted" />
        <Skeleton className="w-9 h-9 bg-muted" />
      </CardFooter>
    </Card>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CartItemSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="w-20 h-20 rounded-lg bg-muted" />
          <div className="flex-1 space-y-3">
            <div>
              <Skeleton className="w-3/4 h-5 mb-2 bg-muted" />
              <Skeleton className="w-1/2 h-4 bg-muted" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-8 h-8 bg-muted" />
                <Skeleton className="w-16 h-8 bg-muted" />
                <Skeleton className="w-8 h-8 bg-muted" />
              </div>

              <div className="text-right">
                <Skeleton className="w-20 h-6 mb-1 bg-muted" />
                <Skeleton className="w-16 h-4 bg-muted" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="w-24 h-8 bg-muted" />
              <Skeleton className="w-16 h-8 bg-muted" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WishlistItemSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Skeleton className="w-full h-48 rounded-lg bg-muted" />
          <Skeleton className="absolute top-2 right-2 w-8 h-8 rounded-full bg-muted" />
        </div>

        <div className="space-y-3">
          <Skeleton className="w-full h-5 bg-muted" />
          <Skeleton className="w-3/4 h-5 bg-muted" />
          <Skeleton className="w-20 h-6 bg-muted" />
        </div>

        <div className="flex gap-2 mt-4">
          <Skeleton className="flex-1 h-9 bg-muted" />
          <Skeleton className="w-9 h-9 bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

export function HeaderSkeleton() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton className="w-32 h-8 bg-muted" />
            <div className="hidden md:flex items-center gap-6">
              <Skeleton className="w-16 h-4 bg-muted" />
              <Skeleton className="w-20 h-4 bg-muted" />
              <Skeleton className="w-18 h-4 bg-muted" />
              <Skeleton className="w-14 h-4 bg-muted" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="w-8 h-8 rounded-full bg-muted" />
            <Skeleton className="w-8 h-8 rounded-full bg-muted" />
            <Skeleton className="w-8 h-8 rounded-full bg-muted" />
            <Skeleton className="w-20 h-8 bg-muted" />
          </div>
        </div>
      </div>
    </header>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="w-20 h-5 mb-3 bg-muted" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 bg-muted" />
              <Skeleton className="w-24 h-4 bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="w-24 h-5 mb-3 bg-muted" />
        <div className="space-y-3">
          <Skeleton className="w-full h-4 bg-muted" />
          <div className="flex justify-between">
            <Skeleton className="w-12 h-4 bg-muted" />
            <Skeleton className="w-16 h-4 bg-muted" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="w-16 h-5 mb-3 bg-muted" />
        <div className="flex items-center space-x-2">
          <Skeleton className="w-4 h-4 bg-muted" />
          <Skeleton className="w-20 h-4 bg-muted" />
        </div>
      </div>
    </div>
  )
}
