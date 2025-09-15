"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/product/product-filters";
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
import { PAGINATION } from "@/data/constants";
import productsData from "@/data/products.json";
import { Filters } from "@/types/products";
import { getProducts } from "@/lib/apiServices/product.service";

export default function ProductsPage() {
  const [products, setProducts] = useState(productsData);
  const [productsInfo, setProductInfo] = useState();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 100000],
    inStock: false,
    rating: 0,
  });

  const productsPerPage = PAGINATION.PRODUCTS_PER_PAGE;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    if (window.innerWidth < 1024) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.categories.includes(filters.category)
      );
    }

    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        break;
      default: // popularity
        filtered.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, sortBy, products]);

// useEffect(() => {
//   const fetchProducts = async () => {

//     const parems = { page: 1, pageSize: 20 };
//     try {
//       const response = await getProducts(parems);
//       setProductInfo(response);  
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
//   fetchProducts();
// }, []);



  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 xl:px-20">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#38b6ff]">
              All Products
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
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
                    {filteredProducts.length} products found
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
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page}>...</span>;
                    }
                    return null;
                  })}

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
