"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { PRODUCT_CATEGORIES, PRODUCT_TYPES, PRODUCT_STATUSES } from "@/data/constants"
import type { Filters, ProductFiltersProps } from "@/types/products"
import { useDebounce } from "../shared/hooks/use-debounce"

interface ExtendedProductFiltersProps extends ProductFiltersProps {
  isMobile?: boolean
  localFilters?: Filters
  onApply?: (filters: Filters) => void
}

export function ProductFilters({
  filters,
  onFiltersChange,
  isMobile = false,
  localFilters = filters,
  onApply,
}: ExtendedProductFiltersProps) {
  const [tempFilters, setTempFilters] = useState<Filters>(localFilters)

  const debouncedPriceRange = useDebounce(tempFilters.priceRange, 1200)

  useEffect(() => {
    setTempFilters(localFilters)
  }, [localFilters])

  useEffect(() => {
    if (!isMobile && JSON.stringify(debouncedPriceRange) !== JSON.stringify(filters.priceRange)) {
      const newFilters = { ...tempFilters, priceRange: debouncedPriceRange }
      onFiltersChange(newFilters)
    }
  }, [debouncedPriceRange, isMobile, onFiltersChange, tempFilters, filters.priceRange])

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: Filters[keyof Filters]) => {
      const newFilters = { ...tempFilters, [key]: value }
      setTempFilters(newFilters)
      if (!isMobile && key !== "priceRange") {
        onFiltersChange(newFilters)
      }
    },
    [tempFilters, isMobile, onFiltersChange],
  )

  const handleMultipleSelection = useCallback(
    (key: "category" | "type" | "status", value: string) => {
      const currentValues = tempFilters[key] as string[]
      const newValues = currentValues?.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...(currentValues || []), value]

      handleFilterChange(key, newValues as any)
    },
    [tempFilters, handleFilterChange],
  )

  const isSelected = useCallback(
    (key: "category" | "type" | "status", value: string) => {
      const currentValues = tempFilters[key] as string[]
      return currentValues?.includes(value) || false
    },
    [tempFilters],
  )

  const handleApply = useCallback(() => {
    if (isMobile && onApply) {
      onApply(tempFilters)
    }
  }, [isMobile, onApply, tempFilters])

  const clearFilters = useCallback(() => {
    const clearedFilters: Filters = {
      category: [],
      type: [],
      status: [],
      priceRange: [0, 100000],
      inStock: false,
    }
    setTempFilters(clearedFilters)
    if (!isMobile) {
      onFiltersChange(clearedFilters)
    } else if (onApply) {
      onApply(clearedFilters)
    }
  }, [isMobile, onFiltersChange, onApply])

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={isSelected("category", category.id)}
                onCheckedChange={() => handleMultipleSelection("category", category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product Types */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Product Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PRODUCT_TYPES.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={isSelected("type", type.id)}
                onCheckedChange={() => handleMultipleSelection("type", type.id)}
              />
              <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                {type.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {PRODUCT_STATUSES.map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status.id}`}
                checked={isSelected("status", status.id)}
                onCheckedChange={() => handleMultipleSelection("status", status.id)}
              />
              <Label htmlFor={`status-${status.id}`} className="text-sm cursor-pointer">
                {status.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={tempFilters.priceRange}
              onValueChange={(value: [number, number]) => handleFilterChange("priceRange", value)}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{tempFilters.priceRange[0].toLocaleString()}</span>
              <span>₹{tempFilters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={tempFilters.inStock}
              onCheckedChange={(checked: boolean) => handleFilterChange("inStock", checked)}
            />
            <Label htmlFor="inStock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      {isMobile && (
        <div className="space-y-3 pt-6 border-t">
          <Button onClick={handleApply} className="w-full">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
