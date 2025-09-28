"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Zap,
  Cpu,
  Wifi,
  Database,
  Microscope as Microchip,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { wishlistStorage, cartStorage } from "@/lib/utils/storage";
import { CURRENCY, PRODUCT_TYPES } from "@/data/constants";
import { getProducts } from "@/lib/apiServices/product.service";
import { Card, CardContent, CardFooter } from "../ui/card";
import { motion } from "framer-motion";
import type { Product, APIProduct } from "@/types/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCardSkeleton } from "@/components/shared/skeletons/productCardSkeleton";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function FeaturedProducts() {
  const [wishlistItems, setWishlistItems] = useState<{ id: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const swiperRef = useRef<SwiperType>();

  const productsPerPage = 5;

  const mapAPIProductToProduct = (apiProduct: APIProduct): Product => {
    return {
      id: apiProduct.id.toString(),
      slug: apiProduct.name.toLowerCase().replace(/\s+/g, "-"),
      name: apiProduct.name,
      descriptionShort: apiProduct.description || "",
      descriptionLong: apiProduct.description || "",
      price: apiProduct.base_price || 0,
      currency: CURRENCY.CODE,
      images: apiProduct.image_url ? [apiProduct.image_url] : [],
      categories: apiProduct.category ? [apiProduct.category] : [],
      tags: apiProduct.type ? [apiProduct.type] : [],
      rating: apiProduct.average_rating || 4.5,
      ratingCount: apiProduct.ratingCount || 0,
      inStock: (apiProduct.stock_quantity || 0) > 0,
      brand: "RoboImpex",
      modelNumber: `RI-${apiProduct.id}`,
      warranty: "1 Year",
      similar: [],
    };
  };

  const fetchProducts = async (productType: string | null = null, page = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      console.log("[v0] Fetching products:", { productType, page, append });

      const response = await getProducts({
        page,
        pageSize: productsPerPage,
        type: productType ?? undefined,
      });

      console.log("[v0] API Response:", response);

      if (response.success && response.data && typeof response.data === "object" && "data" in response.data) {
        const apiProducts = response.data.data as APIProduct[];
        const mappedProducts = apiProducts.map(mapAPIProductToProduct);

        if (append) {
          setProducts((prev) => [...prev, ...mappedProducts]);
        } else {
          setProducts(mappedProducts);
          setCurrentPage(1);
          setCurrentSlide(0);
        }

        setTotalProducts(response.data.pagination?.total || mappedProducts.length);
        setHasMore(mappedProducts.length === productsPerPage);

        if (!append && swiperRef.current) {
          swiperRef.current.slideTo(0);
        }
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("[v0] Error fetching products:", err);
      setError("Failed to load products. Please try again.");
      if (!append) {
        setProducts([]);
        setTotalProducts(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!hasMore || loading || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      await fetchProducts(selectedProductType, currentPage + 1, true);
      setCurrentPage((prev) => prev + 1);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSlideChange = async (swiper: SwiperType) => {
    const newSlide = swiper.activeIndex;
    setCurrentSlide(newSlide);

    const slidesPerView = (swiper.params.slidesPerView as number) || 1;
    const totalSlides = products.length;
    const remainingSlides = totalSlides - newSlide;

    if (remainingSlides <= 2 && hasMore && !loading && !isLoadingMore) {
      console.log("[v0] Near end of slides, loading more products...");
      await loadMoreProducts();
    }
  };

  useEffect(() => {
    fetchProducts(selectedProductType);
  }, [selectedProductType]);

  const handleWishlistToggle = (product: Product): void => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || "",
      };
      wishlistStorage.addItem(wishlistItem);
      setWishlistItems((prev) => [...prev, wishlistItem]);
    }
  };

  const handleAddToCart = (product: Product): void => {
    const productInput = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    };
    cartStorage.addItem(productInput, {}, 1);
  };

  const getProductTypeTheme = (type: string) => {
    const themes = {
      IC: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-600",
        hover: "hover:bg-blue-500/20",
      },
      Microcontroller: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-600",
        hover: "hover:bg-purple-500/20",
      },
      Sensor: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-600",
        hover: "hover:bg-green-500/20",
      },
      Module: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-600",
        hover: "hover:bg-orange-500/20",
      },
      DevBoard: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-600",
        hover: "hover:bg-red-500/20",
      },
      PCB: {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/30",
        text: "text-indigo-600",
        hover: "hover:bg-indigo-500/20",
      },
      Connector: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-600",
        hover: "hover:bg-yellow-500/20",
      },
      PowerSupply: {
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        text: "text-pink-600",
        hover: "hover:bg-pink-500/20",
      },
      Display: {
        bg: "bg-teal-500/10",
        border: "border-teal-500/30",
        text: "text-teal-600",
        hover: "hover:bg-teal-500/20",
      },
    };
    return themes[type as keyof typeof themes] || themes.IC;
  };

  const ProductCard = ({ product, index }: { product: Product; index: number }) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    const productType = product.tags[0] || "IC";
    const theme = getProductTypeTheme(productType);

    return (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group h-full"
      >
        <Card
          className={`iot-card border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden h-full ${theme.border} hover:${theme.bg} transition-all duration-500`}
        >
          <div className="relative overflow-hidden">
            <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 h-32 sm:h-40 md:h-48 lg:h-56">
              <img
                src={
                  product.images[0] ||
                  "/placeholder.svg?height=200&width=300&query=arduino+electronics+component" ||
                  "/placeholder.svg"
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                <Cpu className="absolute top-2 sm:top-3 md:top-4 lg:top-5 right-2 sm:right-3 md:right-4 lg:right-5 w-3 sm:w-4 md:w-5 lg:w-6 h-3 sm:h-4 md:h-5 lg:h-6 text-primary animate-chip-glow" />
                <Wifi className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-2 sm:left-3 md:left-4 lg:left-5 w-2 sm:w-3 md:w-4 lg:w-5 h-2 sm:h-3 md:h-4 lg:h-5 text-accent animate-sensor-wave" />
                <Database className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 sm:w-5 md:w-6 lg:w-7 h-4 sm:h-5 md:h-6 lg:h-7 text-primary/60 animate-floating-up" />
              </div>
            </div>

            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
              {product.inStock ? (
                <Badge className="bg-primary text-primary-foreground electronics-glow animate-micro-bounce text-xs sm:text-sm">
                  <Zap className="h-2 sm:h-3 md:h-4 w-2 sm:w-3 md:w-4 mr-0.5 sm:mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs sm:text-sm">Out of Stock</Badge>
              )}
            </div>

            <div className="absolute top-2 sm:top-3 md:top-4 right-8 sm:right-10 md:right-12">
              <Badge
                className={`${theme.bg} ${theme.text} ${theme.border} border text-xs sm:text-sm`}
              >
                {productType}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 transition-all duration-300 hover:bg-background/80 ${
                isInWishlist
                  ? "text-red-500 animate-circuit-pulse"
                  : "text-gray-500 hover:text-red-500"
              }`}
              onClick={() => handleWishlistToggle(product)}
            >
              <Heart
                className={`h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 ${isInWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <CardContent className="p-2 sm:p-3 md:p-4 relative z-10 flex-1">
            <div className="mb-1 sm:mb-2 md:mb-3">
              <Link
                href={`/products/${product.id}`}
                className="font-semibold text-sm sm:text-base md:text-lg hover:text-primary transition-colors line-clamp-2 leading-tight"
              >
                {product.name}
              </Link>
            </div>
            <div className="flex items-center mb-1 sm:mb-2 md:mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm md:text-base text-muted-foreground ml-1 sm:ml-2 md:ml-3">
                {product.rating} ({product.ratingCount})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                <Microchip className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-primary animate-arduino-blink" />
                <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
                  {CURRENCY.SYMBOL}
                  {product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-2 sm:p-3 md:p-4 pt-0 flex gap-2 sm:gap-3 md:gap-4 relative z-10">
            <Button
              size="sm"
              className="flex-1 group bg-primary hover:bg-primary/90 text-xs sm:text-sm md:text-base electronics-glow cursor-pointer"
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 mr-1 sm:mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:border-primary hover:text-primary bg-transparent px-1 sm:px-2 md:px-3"
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-3 sm:mb-4 md:mb-6">
          <Package className="h-12 sm:h-16 md:h-20 lg:h-24 w-12 sm:w-16 md:w-20 lg:w-24 text-muted-foreground/30" />
          <AlertCircle className="h-4 sm:h-6 md:h-8 lg:h-10 w-4 sm:w-6 md:w-8 lg:w-10 text-orange-500 absolute -top-1 sm:-top-2 md:-top-3 lg:-top-4 -right-1 sm:-right-2 md:-right-3 lg:-right-4" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4 text-muted-foreground">
          No Products Found
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-3 sm:mb-4 md:mb-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          {selectedProductType
            ? `No products available for "${selectedProductType}" type at the moment.`
            : "No products available at the moment."}
        </p>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedProductType(null)}
            className="hover:border-primary hover:text-primary text-xs sm:text-sm md:text-base"
          >
            View All Types
          </Button>
          <Button
            onClick={() => fetchProducts(selectedProductType)}
            className="bg-primary hover:bg-primary/90 text-xs sm:text-sm md:text-base"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-2 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 chip-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-8 sm:top-10 md:top-12 lg:top-16 left-4 sm:left-6 md:left-8 lg:left-10 text-primary/10"
          animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        >
          <Cpu className="w-6 sm:w-8 md:w-10 lg:w-12 h-6 sm:h-8 md:h-10 lg:h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 right-4 sm:right-6 md:right-8 lg:right-10 text-accent/10"
          animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <Microchip className="w-4 sm:w-6 md:w-8 lg:w-10 h-4 sm:h-6 md:h-8 lg:h-10" />
        </motion.div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Components
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto leading-relaxed">
            Discover premium Arduino boards, sensors, microcontrollers, and IoT
            components for your innovative projects
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <Button
            variant={selectedProductType === null ? "default" : "outline"}
            size="sm"
            className="rounded-full bg-transparent text-xs sm:text-sm md:text-base"
            onClick={() => setSelectedProductType(null)}
            disabled={loading}
          >
            All Types
          </Button>
          {PRODUCT_TYPES.map((type) => {
            const theme = getProductTypeTheme(type.id);
            return (
              <Button
                key={type.id}
                variant={selectedProductType === type.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  selectedProductType === type.id
                    ? `${theme.bg} ${theme.text} ${theme.border} border`
                    : `bg-transparent ${theme.hover} ${theme.border} border hover:${theme.text}`
                }`}
                onClick={() => setSelectedProductType(type.id)}
                disabled={loading}
              >
                {type.name}
              </Button>
            );
          })}
        </div>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <AlertCircle className="h-8 sm:h-10 md:h-12 lg:h-16 w-8 sm:w-10 md:w-12 lg:w-16 text-red-500 mb-2 sm:mb-3 md:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 md:mb-3 text-red-600">
                Error Loading Products
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-2 sm:mb-3 md:mb-4">{error}</p>
              <Button
                onClick={() => fetchProducts(selectedProductType)}
                className="bg-primary hover:bg-primary/90 text-xs sm:text-sm md:text-base"
              >
                Try Again
              </Button>
            </motion.div>
          </div>
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={5}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              pagination={{
                el: ".swiper-pagination-custom",
                clickable: true,
                bulletClass: "swiper-pagination-bullet-custom",
                bulletActiveClass: "swiper-pagination-bullet-active-custom",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
                1280: { slidesPerView: 5, spaceBetween: 30 },
              }}
              className="featured-products-swiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} index={index} />
                </SwiperSlide>
              ))}
              {isLoadingMore &&
                Array.from({ length: 5 }).map((_, i) => (
                  <SwiperSlide key={`loading-${i}`}>
                    <ProductCardSkeleton />
                  </SwiperSlide>
                ))}
            </Swiper>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-3 md:left-4 lg:left-5 top-1/2 -translate-y-1/2 z-10 hover:border-primary hover:text-primary hover:bg-primary/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 electronics-glow"
            >
              <ChevronLeft className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-3 md:right-4 lg:right-5 top-1/2 -translate-y-1/2 z-10 hover:border-primary hover:text-primary hover:bg-primary/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 electronics-glow"
              disabled={!hasMore && loading}
            >
              <ChevronRight className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6" />
            </Button>

            <div className="swiper-pagination-custom flex justify-center mt-2 sm:mt-3 md:mt-4 lg:mt-6 gap-1 sm:gap-1.5 md:gap-2"></div>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-2 sm:mt-3 md:mt-4 lg:mt-6">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-1 sm:mb-2 md:mb-3">
              Showing {products.length} of {totalProducts} products
              {selectedProductType && ` for "${selectedProductType}"`}
              {isLoadingMore && " (Loading more...)"}
            </p>

            {hasMore && (
              <Button
                variant="outline"
                onClick={loadMoreProducts}
                disabled={loading || isLoadingMore}
                className="hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 bg-transparent text-xs sm:text-sm md:text-base"
              >
                {isLoadingMore ? "Loading..." : "Load More Products"}
              </Button>
            )}
          </div>
        )}

        <div className="text-center mt-2 sm:mt-3 md:mt-4 lg:mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              size="lg"
              asChild
              className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90 electronics-glow text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3"
            >
              <Link href="/products">
                <Cpu className="h-4 sm:h-5 md:h-6 lg:h-7 w-4 sm:w-5 md:w-6 lg:w-7 mr-1 sm:mr-2 md:mr-3 animate-chip-glow" />
                View All Components
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 6px sm:width-8 md:width-10 lg:width-12px;
          height: 6px sm:height-8 md:height-10 lg:height-12px;
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
      `}</style>
    </section>
  );
}
