"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
import { SectionLoader } from "@/components/shared/common/loader"; 
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react"; 
import type { APIProduct, Filters } from "@/types/products";
import { getProducts } from "@/lib/apiServices/product.service";
import { Pagination } from "@/components/shared/common/pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceRange: [0, 100000],
    inStock: false,
    rating: 0,
  });

  const productsPerPage = 10;

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        pageSize: productsPerPage,
        category: filters.category || undefined,
        minPrice: filters.priceRange[0] || undefined,
        maxPrice: filters.priceRange[1] || undefined,
      };

      const response = await getProducts(params);

      if (response.success && response.data) {
        setProducts(response.data.data);
        setCurrentPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.total);
      } else {
        setError(response.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    if (window.innerWidth < 1024) {
      setIsFilterOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  useEffect(() => {
    fetchProducts(1);
  }, [filters]);

  const convertToDisplayProduct = (apiProduct: APIProduct) => ({
    id: apiProduct.id.toString(),
    slug: apiProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    name: apiProduct.name,
    descriptionShort: apiProduct.description,
    descriptionLong: apiProduct.description,
    price: apiProduct.base_price,
    currency: "INR",
    images: apiProduct.image_url
      ? [apiProduct.image_url]
      : ["/robotics-chip.jpg"],
    categories: [apiProduct.category],
    tags: [apiProduct.type],
    rating: 4.5,
    ratingCount: Math.floor(Math.random() * 100) + 10,
    inStock: apiProduct.stock_quantity > 0,
    brand: "RoboImpex",
    modelNumber: `RI-${apiProduct.id}`,
    warranty: "1 Year",
    variants: {},
    similar: [],
  });


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => fetchProducts(1)} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 xl:px-20">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Robotics & Machinery Parts
            </h1>
            <p className="text-muted-foreground">
              Showing {totalItems} high-quality electronic components and
              robotics parts
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {totalItems} products found
                  </span>
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden bg-transparent"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 sm:w-96">
                      <SheetHeader>
                        <SheetTitle className="flex items-center justify-between">
                          Filter Products
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFilterOpen(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <ProductFilters
                          filters={filters}
                          onFiltersChange={handleFiltersChange}
                        />
                        <div className="mt-6 pt-6 border-t">
                          <Button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full"
                          >
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <SectionLoader
                  text="Loading your products..."
                  minHeight="h-96"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={convertToDisplayProduct(product)}
                    />
                  ))}
                </div>
              )}

              {!loading && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showInfo={true}
                    totalItems={totalItems}
                    itemsPerPage={productsPerPage}
                    className="justify-center"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
