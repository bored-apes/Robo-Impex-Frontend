"use client"
import { useState, useEffect, useCallback } from "react"
import { ProductCard } from "@/components/product/product-card"
import { ProductFilters } from "@/components/product/product-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter, X, Search, Package, AlertCircle } from "lucide-react"
import type { APIProduct, Filters, PaginationParams } from "@/types/products"
import { getProducts } from "@/lib/apiServices/product.service"
import { Pagination } from "@/components/shared/common/pagination"
import { Input } from "@/components/ui/input"
import { useCustomToast } from "@/components/shared/common/customToast"
import { ProductGridSkeleton } from "@/components/shared/common/skeletons"
import { useDebounce } from "@/components/shared/hooks/use-debounce"

export default function ProductsPage() {
  const [products, setProducts] = useState<APIProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [sortBy, setSortBy] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filters>({
    category: [],
    type: [],
    status: [],
    priceRange: [0, 100000],
    inStock: false,
  })

  const { showToast } = useCustomToast()
  const productsPerPage = 12

  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const debouncedPriceRange = useDebounce(filters.priceRange, 1200)

  const fetchProducts = useCallback(
    async (page = 1, resetProducts = false) => {
      if (resetProducts) {
        setProducts([])
      }
      setLoading(true)
      setError(null)

      try {
        const params: PaginationParams = {
          page,
          pageSize: productsPerPage,
          ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
          ...((filters.category?.length ?? 0) > 0 && { category: filters.category }),
          ...((filters.type?.length ?? 0) > 0 && { type: filters.type }),
          ...((filters.status?.length ?? 0) > 0 && { status: filters.status }),
          ...(debouncedPriceRange[0] > 0 && { minPrice: debouncedPriceRange[0] }),
          ...(debouncedPriceRange[1] < 100000 && { maxPrice: debouncedPriceRange[1] }),
          ...(filters.inStock && { inStock: true }),
        }

        // Add sorting
        switch (sortBy) {
          case "price-low":
            params.sortBy = "base_price"
            params.sortOrder = "asc"
            break
          case "price-high":
            params.sortBy = "base_price"
            params.sortOrder = "desc"
            break
          default:
            params.sortBy = "created_at"
            params.sortOrder = "desc"
        }

        console.log("[v0] API Request params:", params)
        const response = await getProducts(params)

        if (response.success && response.data) {
          const responseData = response.data as {
            data: APIProduct[]
            pagination: {
              page: number
              pageSize: number
              total: number
              totalPages: number
            }
          }

          setProducts(responseData.data)
          setCurrentPage(responseData.pagination.page)
          setTotalPages(responseData.pagination.totalPages)
          setTotalItems(responseData.pagination.total)
        } else {
          setError(response.message || "Failed to fetch products")
          showToast({
            type: "error",
            title: "Error",
            message: response.message || "Failed to load products. Please try again.",
          })
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching products"
        setError(errorMessage)
        showToast({
          type: "error",
          title: "Network Error",
          message: errorMessage,
        })
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    },
    [debouncedSearchQuery, filters, debouncedPriceRange, sortBy, productsPerPage],
  )

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  const handleMobileApplyFilters = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterOpen(false)
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchProducts(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = useCallback(() => {
    setSearchQuery("")
    setFilters({
      category: [],
      type: [],
      status: [],
      priceRange: [0, 100000],
      inStock: false,
    })
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    fetchProducts(1, true)
  }, [fetchProducts])

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage)
    }
  }, [currentPage, fetchProducts])

  const convertToDisplayProduct = (apiProduct: APIProduct) => ({
    id: apiProduct.id.toString(),
    slug: apiProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    name: apiProduct.name,
    descriptionShort: apiProduct.description || "",
    descriptionLong: apiProduct.description || "",
    price: apiProduct.base_price || 0,
    currency: "INR",
    images: apiProduct.image_url ? [apiProduct.image_url] : [""],
    categories: apiProduct.category ? [apiProduct.category] : [],
    tags: apiProduct.type ? [apiProduct.type] : [],
    inStock: (apiProduct.stock_quantity || 0) > 0,
    brand: "RoboImpex",
    modelNumber: `RI-${apiProduct.id}`,
    warranty: "1 Year",
    rating: 4.5, // Placeholder
    ratingCount: 120, // Placeholder
    similar: [],
  })

  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={() => fetchProducts(1, true)} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
              Clear Filters & Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Our Products</h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Discover premium robotics and machinery components
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 sm:h-11"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Desktop and Tablet Filter Sidebar */}
            <div className="hidden md:block lg:col-span-1">
              <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
                <ProductFilters filters={filters} onFiltersChange={handleFiltersChange} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 md:col-span-1 lg:col-span-4 xl:col-span-3">
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{totalItems} products found</span>
                  {((filters.category?.length ?? 0) > 0 ||
                    (filters.type?.length ?? 0) > 0 ||
                    (filters.status?.length ?? 0) > 0 ||
                    searchQuery) && (
                    <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs bg-transparent h-8">
                      Clear Filters
                    </Button>
                  )}
                  {/* Mobile Filter Sheet */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="md:hidden bg-transparent h-8">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:w-96 flex flex-col p-0 overflow-hidden">
                      <SheetHeader className="flex-shrink-0 p-6 pb-4 border-b">
                        <SheetTitle className="flex items-center justify-between text-lg">
                          Filter Products
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFilterOpen(false)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-hide">
                        <ProductFilters
                          filters={filters}
                          onFiltersChange={() => {}}
                          isMobile
                          localFilters={filters}
                          onApply={handleMobileApplyFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 h-10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="space-y-6">
                  <ProductGridSkeleton count={productsPerPage} />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 sm:py-16 px-4">
                  <Package className="h-16 sm:h-24 w-16 sm:w-24 text-muted-foreground mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                    {searchQuery ||
                    (filters.category?.length ?? 0) > 0 ||
                    (filters.type?.length ?? 0) > 0 ||
                    (filters.status?.length ?? 0) > 0
                      ? "Try adjusting your search criteria or filters to find what you're looking for."
                      : "We're currently updating our product catalog. Please check back soon!"}
                  </p>
                  {(searchQuery ||
                    (filters.category?.length ?? 0) > 0 ||
                    (filters.type?.length ?? 0) > 0 ||
                    (filters.status?.length ?? 0) > 0) && (
                    <Button onClick={clearFilters} variant="outline" size="sm">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              ) : (
                /* Improved responsive grid layout for better tablet and desktop display */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={convertToDisplayProduct(product)} />
                  ))}
                </div>
              )}

              {!loading && products.length > 0 && (
                <div className="mt-8 sm:mt-12">
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
  )
}
