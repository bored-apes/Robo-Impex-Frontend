"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { wishlistStorage, cartStorage } from "@/lib/utils/storage";
import { CURRENCY, getProductTypeTheme } from "@/data/constants";
import { getProducts } from "@/lib/apiServices/product.service";
import { Card, CardContent, CardFooter } from "../ui/card";
import { motion } from "framer-motion";
import type { Product, APIProduct } from "@/types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCardSkeleton } from "@/components/shared/skeletons/productCardSkeleton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ALL_PRODUCT_TYPES = [
  "IC",
  "Microcontroller", 
  "Sensor",
  "Module",
  "DevBoard",
  "PCB",
  "Connector",
  "PowerSupply",
  "Display"
];

// Separate ProductCard component to prevent re-renders
const ProductCard = React.memo(({ 
  product, 
  index,
  onWishlistToggle,
  onAddToCart,
  isInWishlist 
}: { 
  product: Product;
  index: number;
  onWishlistToggle: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInWishlist: boolean;
}) => {
  const productType = product.tags[0] || "IC";
  const theme = getProductTypeTheme(productType);

  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group h-full"
      >
        <Card className="h-full flex flex-col border-border bg-card dark:bg-card/90 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
          {/* Image Section - Fixed Height */}
          <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden flex-shrink-0">
            <img
              src={
                product.images[0] ||
                "/placeholder.svg?height=200&width=300&text=Product+Image"
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Wishlist Button */}
            <Button
              variant="secondary"
              size="icon"
              className={`absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm ${
                isInWishlist
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              }`}
              onClick={() => onWishlistToggle(product)}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          {/* Content Section - Flexible but constrained */}
          <CardContent className="px-4 flex-1 flex flex-col min-h-0">
            {/* Product Type */}
            <div className="mb-2 flex items-center justify-start gap-2">
              <div className="mb-3">
                <Badge
                  variant="secondary"
                  className={`${theme.bg} ${theme.text} ${theme.border} border text-xs font-medium`}
                >
                  {productType}
                </Badge>
              </div>
            </div>

            {/* Product Name - Fixed height with ellipsis */}
            <div className="mb-3 min-h-0 flex-shrink-0">
              <Link
                href={`/products/${product.id}`}
                className="font-semibold text-base leading-tight line-clamp-2 hover:text-primary transition-colors block"
                title={product.name}
              >
                {product.name}
              </Link>
            </div>

            {/* Rating - Fixed height */}
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                ({product.ratingCount})
              </span>
            </div>

            {/* Price - Fixed at bottom */}
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {CURRENCY.SYMBOL}
                  {product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Actions - Fixed height */}
          <CardFooter className="px-4 pt-0 flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-sm"
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-shrink-0 hover:border-primary hover:text-primary"
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export function FeaturedProducts() {
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>(ALL_PRODUCT_TYPES);
  const [hasInitialTypesLoaded, setHasInitialTypesLoaded] = useState(false);

  const productsPerPage = 10000;

  const mapAPIProductToProduct = (apiProduct: APIProduct): Product => {
    return {
      id: apiProduct.id.toString(),
      name: apiProduct.name,
      descriptionShort: apiProduct.description || "",
      descriptionLong: apiProduct.description || "",
      price: apiProduct.base_price || 0,
      images: apiProduct.image_url ? [apiProduct.image_url] : [],
      categories: apiProduct.category ? [apiProduct.category] : [],
      tags: apiProduct.type ? [apiProduct.type] : [],
      rating: apiProduct.average_rating || 4.5,
      ratingCount: apiProduct.ratingCount || 0,
      inStock: (apiProduct.stock_quantity || 0) > 0,
      stockQuantity: apiProduct.stock_quantity ?? 0,
    };
  };

  // Fetch all products initially
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProducts({
        page: 1,
        pageSize: productsPerPage,
      });

      if (
        response.success &&
        response.data &&
        typeof response.data === "object" &&
        "data" in response.data
      ) {
        const apiProducts = response.data.data as APIProduct[];
        const mappedProducts = apiProducts.map(mapAPIProductToProduct);

        const types = [
          ...new Set(
            mappedProducts.map((product) => product.tags[0]).filter(Boolean)
          ),
        ] as string[];
        
        if (!hasInitialTypesLoaded) {
          setAvailableTypes(types.length > 0 ? types : ALL_PRODUCT_TYPES);
          setHasInitialTypesLoaded(true);
        }

        setAllProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by type
  const filterProductsByType = useCallback((type: string | null) => {
    if (!type) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => 
        product.tags.includes(type)
      );
      setFilteredProducts(filtered);
    }
  }, [allProducts]);

  // Handle product type change
  const handleProductTypeChange = (type: string | null) => {
    setSelectedProductType(type);
    filterProductsByType(type);
  };

  // Check if product is in wishlist
  const checkWishlistStatus = (productId: string): boolean => {
    return wishlistItems.has(productId);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = useCallback((product: Product): void => {
    const isInWishlist = wishlistItems.has(product.id);
    
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setWishlistItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "",
      };
      wishlistStorage.addItem(wishlistItem);
      setWishlistItems(prev => new Set(prev).add(product.id));
    }
  }, [wishlistItems]);

  // Handle add to cart
  const handleAddToCart = useCallback((product: Product): void => {
    const productInput = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      minQuantityOrder: product.minQuantityOrder || 1,
      stockQuantity: product.stockQuantity || 0,
    };
    cartStorage.addItem(productInput, {}, 1);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Initialize wishlist items from storage
    const items = wishlistStorage.getItems();
    const wishlistIds = new Set(items.map(item => item.id));
    setWishlistItems(wishlistIds);
  }, []);

  const EmptyState = () => (
    <div className="text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <Package className="h-20 w-20 text-muted-foreground/30" />
          <AlertCircle className="h-8 w-8 text-orange-500 absolute -top-2 -right-2" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-muted-foreground">
          No Products Found
        </h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          {selectedProductType
            ? `No products available for "${selectedProductType}" type at the moment.`
            : "No products available at the moment."}
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleProductTypeChange(null)}
          >
            View All Types
          </Button>
          <Button onClick={fetchAllProducts}>
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="w-full py-8 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 bg-gradient-to-b from-muted/10 to-background dark:from-muted/5 dark:to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12 px-2"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Components
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover premium Arduino boards, sensors, microcontrollers, and IoT
            components for your innovative projects
          </p>
        </motion.div>

        {/* Product Type Filters */}
        {availableTypes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8 lg:mb-10 px-2"
          >
            <Button
              variant={selectedProductType === null ? "default" : "outline"}
              size="sm"
              className="text-xs sm:text-sm rounded-full"
              onClick={() => handleProductTypeChange(null)}
              disabled={loading}
            >
              All Types
            </Button>
            {availableTypes.map((type) => {
              const theme = getProductTypeTheme(type);
              return (
                <Button
                  key={type}
                  variant={selectedProductType === type ? "default" : "outline"}
                  size="sm"
                  className={`text-xs sm:text-sm rounded-full transition-all duration-300 ${
                    selectedProductType === type
                      ? `${theme.bg} ${theme.text} ${theme.border} border`
                      : `bg-transparent ${theme.hover} ${theme.border} border hover:${theme.text}`
                  }`}
                  onClick={() => handleProductTypeChange(type)}
                  disabled={loading}
                >
                  {type}
                </Button>
              );
            })}
          </motion.div>
        )}

        {/* Products Swiper */}
        {loading && filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
              <h3 className="text-lg font-semibold mb-2 text-red-600">
                Error Loading Products
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchAllProducts}>
                Try Again
              </Button>
            </motion.div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="relative px-2">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={12}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-featured',
                nextEl: '.swiper-button-next-featured',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-featured',
                renderBullet: (index, className) => {
                  return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
                },
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 12 },
                480: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
                1536: { slidesPerView: 5, spaceBetween: 24 },
              }}
              className="featured-products-swiper"
            >
              {filteredProducts.map((product, index) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard 
                    product={product} 
                    index={index}
                    onWishlistToggle={handleWishlistToggle}
                    onAddToCart={handleAddToCart}
                    isInWishlist={checkWishlistStatus(product.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="swiper-button-prev-featured absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="swiper-button-next-featured absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Pagination */}
            <div className="swiper-pagination-featured mt-6 sm:mt-8"></div>
          </div>
        )}

        {/* Product Count */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-6 sm:mt-8 px-2">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Showing {filteredProducts.length} products
              {selectedProductType && ` for "${selectedProductType}"`}
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6 sm:mt-8 px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              size="lg"
              asChild
              className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-sm sm:text-base"
            >
              <Link href="/products">
                <Cpu className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                View All Components
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 6px;
          height: 6px;
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active-custom {
          background: hsl(var(--primary));
          opacity: 1;
          transform: scale(1.2);
        }

        .swiper-pagination-bullet-custom:hover {
          opacity: 0.7;
          transform: scale(1.1);
        }

        .dark .swiper-pagination-bullet-custom {
          background: hsl(var(--muted-foreground));
        }

        .dark .swiper-pagination-bullet-active-custom {
          background: hsl(var(--primary));
        }

        /* Ensure all cards have same height */
        .featured-products-swiper .swiper-slide {
          height: auto;
        }

        /* Swiper navigation button styles */
        .swiper-button-prev-featured.swiper-button-disabled,
        .swiper-button-next-featured.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }

        /* Responsive line clamp for different screens */
        @media (max-width: 640px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        @media (min-width: 641px) {
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
}