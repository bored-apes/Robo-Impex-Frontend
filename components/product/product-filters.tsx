"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/constants";
import { Filters, ProductFiltersProps } from "@/types/products";

export function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleFilterChange = (
    key: keyof Filters,
    value: Filters[keyof Filters]
  ) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: Filters = {
      category: "",
      priceRange: [0, 100000],
      inStock: false,
      rating: 0,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {CATEGORIES.map((category: { id: string; name: string }) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={localFilters.category === category.id}
                onCheckedChange={(checked: boolean) =>
                  handleFilterChange("category", checked ? category.id : "")
                }
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={localFilters.priceRange}
              onValueChange={(value: [number, number]) =>
                handleFilterChange("priceRange", value)
              }
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${localFilters.priceRange[0].toLocaleString()}</span>
              <span>${localFilters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={localFilters.inStock}
              onCheckedChange={(checked: boolean) =>
                handleFilterChange("inStock", checked)
              }
            />
            <Label htmlFor="inStock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={localFilters.rating === rating}
                onCheckedChange={(checked: boolean) =>
                  handleFilterChange("rating", checked ? rating : 0)
                }
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
