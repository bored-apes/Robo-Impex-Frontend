"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { wishlistStorage, cartStorage } from "@/lib/utils/storage"
import { CURRENCY } from "@/data/constants"
import productsData from "@/data/products.json"
import { Card, CardContent, CardFooter } from "../ui/card"
import { motion } from "framer-motion"
import type { Product } from "@/types/products"

export function FeaturedProducts() {
  const [wishlistItems, setWishlistItems] = useState<{ id: string }[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const productsPerPage = 8
  const totalPages = Math.ceil((productsData as unknown as Product[]).length / productsPerPage)

  const getCurrentProducts = (): Product[] => {
    const start = currentPage * productsPerPage
    return (productsData as unknown as Product[]).slice(start, start + productsPerPage)
  }

  useEffect(() => {
    setWishlistItems(wishlistStorage.getItems())
  }, [])

  const handleWishlistToggle = (product: Product): void => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id)
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id))
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      }
      wishlistStorage.addItem(wishlistItem)
      setWishlistItems((prev) => [...prev, wishlistItem])
    }
  }

  const handleAddToCart = (product: Product): void => {
    const productInput = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    }
    cartStorage.addItem(productInput, {}, 1)
  }

  const nextPage = (): void => setCurrentPage((prev) => (prev + 1) % totalPages)
  const prevPage = (): void => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 chip-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-primary/10"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        >
          <Cpu className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-accent/10"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <Microchip className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Components
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Discover premium Arduino boards, sensors, microcontrollers, and IoT components for your innovative projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getCurrentProducts().map((product, index) => {
            const isInWishlist = wishlistItems.some((item) => item.id === product.id)
            return (
              <motion.div
                key={`${product.id}-${currentPage}`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="iot-card border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 h-48">
                      <img
                        src={
                          product.images[0] ||
                          "/placeholder.svg?height=200&width=300&query=arduino+electronics+component"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                        <Cpu className="absolute top-3 right-3 w-5 h-5 text-primary animate-chip-glow" />
                        <Wifi className="absolute bottom-3 left-3 w-4 h-4 text-accent animate-sensor-wave" />
                        <Database className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary/60 animate-floating-up" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      {product.inStock ? (
                        <Badge className="bg-primary text-primary-foreground electronics-glow animate-micro-bounce">
                          <Zap className="h-3 w-3 mr-1" />
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-3 right-3 transition-all duration-300 hover:bg-background/80 ${
                        isInWishlist ? "text-red-500 animate-circuit-pulse" : "text-gray-500 hover:text-red-500"
                      }`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <CardContent className="p-4 relative z-10 flex-1">
                    <div className="mb-3">
                      <Link
                        href="/"
                        className="font-semibold text-base hover:text-primary transition-colors line-clamp-2 leading-tight"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        {product.rating} ({product.ratingCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Microchip className="h-4 w-4 text-primary animate-arduino-blink" />
                        <span className="text-xl font-bold text-primary">
                          {CURRENCY.SYMBOL}
                          {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-3 relative z-10">
                    <Button
                      size="sm"
                      className="flex-1 group bg-primary hover:bg-primary/90 text-sm electronics-glow cursor-pointer"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:border-primary hover:text-primary bg-transparent px-3"
                    >
                      <Link href="/">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center justify-center mt-16 space-x-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="hover:border-primary hover:text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:scale-110 electronics-glow"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-primary scale-150 shadow-lg shadow-primary/50 electronics-glow"
                    : "bg-muted hover:bg-primary/50 hover:scale-125"
                }`}
                whileHover={{ scale: i === currentPage ? 1.5 : 1.25 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="hover:border-primary hover:text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:scale-110 electronics-glow"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Button
              size="lg"
              asChild
              className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90 electronics-glow text-lg px-8 py-4"
            >
              <Link href="/">
                <Cpu className="h-5 w-5 mr-2 animate-chip-glow" />
                View All Products
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



// "use client"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import {
//   Star,
//   Heart,
//   ShoppingCart,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
//   Cpu,
//   Wifi,
//   Database,
//   Microscope as Microchip,
//   Search,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { wishlistStorage, cartStorage } from "@/lib/utils/storage"
// import { CURRENCY } from "@/data/constants"
// import { getProducts } from "@/lib/apiServices/product.service"
// import { Card, CardContent, CardFooter } from "../ui/card"
// import { motion } from "framer-motion"
// import type { Product, APIProduct } from "@/types/products"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Navigation, Pagination, Autoplay } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"

// export function FeaturedProducts() {
//   const [wishlistItems, setWishlistItems] = useState<{ id: string }[]>([])
//   const [allProducts, setAllProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [totalPages, setTotalPages] = useState<number>(0)
//   const [totalProducts, setTotalProducts] = useState<number>(0)
//   const [viewMode, setViewMode] = useState<"grid" | "swiper">("swiper")
//   const [sliderPage, setSliderPage] = useState<number>(0)

//   const productsPerSlide = 5
//   const productsPerPage = 10 // API page size

//   const getCurrentSliderProducts = () => {
//     const startIndex = sliderPage * productsPerSlide
//     const endIndex = startIndex + productsPerSlide
//     return allProducts.slice(startIndex, endIndex)
//   }

//   const totalSliderPages = Math.ceil(allProducts.length / productsPerSlide)

//   const mapAPIProductToProduct = (apiProduct: APIProduct): Product => {
//     return {
//       id: apiProduct.id.toString(),
//       slug: apiProduct.name.toLowerCase().replace(/\s+/g, "-"),
//       name: apiProduct.name,
//       descriptionShort: apiProduct.description || "",
//       descriptionLong: apiProduct.description || "",
//       price: apiProduct.base_price || 0,
//       currency: CURRENCY.CODE,
//       images: apiProduct.image_url ? [apiProduct.image_url] : [],
//       categories: apiProduct.category ? [apiProduct.category] : [],
//       tags: apiProduct.type ? [apiProduct.type] : [],
//       rating: apiProduct.averageRating || 4.5,
//       ratingCount: apiProduct.ratingCount || 0,
//       inStock: (apiProduct.stock_quantity || 0) > 0,
//       brand: "RoboImpex",
//       modelNumber: `RI-${apiProduct.id}`,
//       warranty: "1 Year",
//       similar: [],
//     }
//   }

//   const fetchProducts = async (page = 1, reset = false) => {
//     try {
//       setLoading(true)
//       setError(null)

//       const response = await getProducts({
//         page,
//         pageSize: productsPerPage,
//       })

//       if (response.success && response.data && typeof response.data === "object" && "data" in response.data) {
//         const apiProducts = response.data.data as APIProduct[]
//         const mappedProducts = apiProducts.map(mapAPIProductToProduct)

//         if (reset) {
//           setAllProducts(mappedProducts)
//           setSliderPage(0)
//         } else {
//           setAllProducts((prev) => [...prev, ...mappedProducts])
//         }

//         setTotalPages(response.data.pagination.totalPages)
//         setCurrentPage(response.data.pagination.page)
//         setTotalProducts(response.data.pagination.total)
//       } else {
//         throw new Error(response.message || "Failed to fetch products")
//       }
//     } catch (err) {
//       setError("Failed to load products")
//       console.error("Error fetching products:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const nextSliderPage = () => {
//     if (sliderPage < totalSliderPages - 1) {
//       setSliderPage((prev) => prev + 1)
//     } else if (currentPage < totalPages) {
//       fetchProducts(currentPage + 1, false)
//     }
//   }

//   const prevSliderPage = () => {
//     if (sliderPage > 0) {
//       setSliderPage((prev) => prev - 1)
//     }
//   }

//   const goToSliderPage = (page: number) => {
//     if (page >= 0 && page < totalSliderPages) {
//       setSliderPage(page)
//     }
//   }

//   const loadMoreProducts = async () => {
//     if (currentPage < totalPages && !loading) {
//       await fetchProducts(currentPage + 1, false)
//     }
//   }

//   useEffect(() => {
//     fetchProducts(1, true)
//   }, [])

//   const handleWishlistToggle = (product: Product): void => {
//     const isInWishlist = wishlistItems.some((item) => item.id === product.id)
//     if (isInWishlist) {
//       wishlistStorage.removeItem(product.id)
//       setWishlistItems((prev) => prev.filter((item) => item.id !== product.id))
//     } else {
//       const wishlistItem = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.images[0] || "",
//       }
//       wishlistStorage.addItem(wishlistItem)
//       setWishlistItems((prev) => [...prev, wishlistItem])
//     }
//   }

//   const handleAddToCart = (product: Product): void => {
//     const productInput = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       images: product.images,
//     }
//     cartStorage.addItem(productInput, {}, 1)
//   }

//   const ProductCard = ({ product, index }: { product: Product; index: number }) => {
//     const isInWishlist = wishlistItems.some((item) => item.id === product.id)

//     return (
//       <motion.div
//         key={product.id}
//         initial={{ opacity: 0, y: 30, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, delay: (index % productsPerPage) * 0.1 }}
//         whileHover={{ y: -8, scale: 1.02 }}
//         className="group h-full"
//       >
//         <Card className="iot-card border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden h-full">
//           <div className="relative overflow-hidden">
//             <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 h-48">
//               <img
//                 src={
//                   product.images[0] ||
//                   "/placeholder.svg?height=200&width=300&query=arduino+electronics+component" ||
//                   "/placeholder.svg" ||
//                   "/placeholder.svg"
//                 }
//                 alt={product.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//               <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
//                 <Cpu className="absolute top-3 right-3 w-5 h-5 text-primary animate-chip-glow" />
//                 <Wifi className="absolute bottom-3 left-3 w-4 h-4 text-accent animate-sensor-wave" />
//                 <Database className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary/60 animate-floating-up" />
//               </div>
//             </div>

//             <div className="absolute top-3 left-3">
//               {product.inStock ? (
//                 <Badge className="bg-primary text-primary-foreground electronics-glow animate-micro-bounce">
//                   <Zap className="h-3 w-3 mr-1" />
//                   In Stock
//                 </Badge>
//               ) : (
//                 <Badge variant="destructive">Out of Stock</Badge>
//               )}
//             </div>

//             <Button
//               variant="ghost"
//               size="icon"
//               className={`absolute top-3 right-3 transition-all duration-300 hover:bg-background/80 ${
//                 isInWishlist ? "text-red-500 animate-circuit-pulse" : "text-gray-500 hover:text-red-500"
//               }`}
//               onClick={() => handleWishlistToggle(product)}
//             >
//               <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
//             </Button>
//           </div>

//           <CardContent className="p-4 relative z-10 flex-1">
//             <div className="mb-3">
//               <Link
//                 href={`/products/${product.slug}`}
//                 className="font-semibold text-base hover:text-primary transition-colors line-clamp-2 leading-tight"
//               >
//                 {product.name}
//               </Link>
//             </div>
//             <div className="flex items-center mb-3">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-muted-foreground ml-2">
//                 {product.rating} ({product.ratingCount})
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Microchip className="h-4 w-4 text-primary animate-arduino-blink" />
//                 <span className="text-xl font-bold text-primary">
//                   {CURRENCY.SYMBOL}
//                   {product.price.toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="p-4 pt-0 flex gap-3 relative z-10">
//             <Button
//               size="sm"
//               className="flex-1 group bg-primary hover:bg-primary/90 text-sm electronics-glow cursor-pointer"
//               onClick={() => handleAddToCart(product)}
//               disabled={!product.inStock}
//             >
//               <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
//               Add to Cart
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               asChild
//               className="hover:border-primary hover:text-primary bg-transparent px-3"
//             >
//               <Link href={`/products/${product.slug}`}>
//                 <Eye className="h-4 w-4" />
//               </Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     )
//   }

//   if (loading && allProducts.length === 0) {
//     return (
//       <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-muted/10 to-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading featured products...</p>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     return (
//       <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-muted/10 to-background">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <p className="text-red-500 mb-4">{error}</p>
//             <Button onClick={() => fetchProducts(1, true)}>Try Again</Button>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="py-20 px-4 md:px-16 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden">
//       <div className="absolute inset-0 chip-pattern opacity-20" />
//       <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-10 text-primary/10"
//           animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
//           transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
//         >
//           <Cpu className="w-12 h-12" />
//         </motion.div>
//         <motion.div
//           className="absolute bottom-20 right-10 text-accent/10"
//           animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
//           transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
//         >
//           <Microchip className="w-8 h-8" />
//         </motion.div>
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
//             Featured Components
//           </h2>
//           <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
//             Discover premium Arduino boards, sensors, microcontrollers, and IoT components for your innovative projects
//           </p>
//         </motion.div>

//         <div className="flex flex-col lg:flex-row gap-6 mb-12">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               placeholder="Search products..."
//               className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
//             />
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <Button variant="outline" size="sm" className="rounded-full bg-transparent">
//               All Categories
//             </Button>
//             {/* Placeholder for categories */}
//           </div>
//         </div>

//         <div className="flex justify-center mb-8">
//           <div className="flex bg-muted rounded-lg p-1">
//             <Button
//               variant={viewMode === "grid" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setViewMode("grid")}
//               className="rounded-md"
//             >
//               Grid View
//             </Button>
//             <Button
//               variant={viewMode === "swiper" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setViewMode("swiper")}
//               className="rounded-md"
//             >
//               Slider View
//             </Button>
//           </div>
//         </div>

//         {viewMode === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//             {allProducts.map((product, index) => (
//               <ProductCard key={product.id} product={product} index={index} />
//             ))}
//           </div>
//         ) : (
//           <div className="relative">
//             <Swiper
//               modules={[Navigation, Pagination, Autoplay]}
//               spaceBetween={30}
//               slidesPerView={5} // Always show 5 products
//               navigation={false}
//               pagination={false}
//               autoplay={false}
//               breakpoints={{
//                 320: {
//                   slidesPerView: 1,
//                   spaceBetween: 20,
//                 },
//                 640: {
//                   slidesPerView: 2,
//                   spaceBetween: 20,
//                 },
//                 768: {
//                   slidesPerView: 3,
//                   spaceBetween: 25,
//                 },
//                 1024: {
//                   slidesPerView: 4,
//                   spaceBetween: 30,
//                 },
//                 1280: {
//                   slidesPerView: 5,
//                   spaceBetween: 30,
//                 },
//               }}
//               className="featured-products-swiper"
//             >
//               {getCurrentSliderProducts().map((product, index) => (
//                 <SwiperSlide key={`${product.id}-${sliderPage}`}>
//                   <ProductCard product={product} index={index} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={prevSliderPage}
//               disabled={sliderPage === 0}
//               className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:border-primary hover:text-primary hover:bg-primary/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 electronics-glow disabled:opacity-50"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={nextSliderPage}
//               disabled={sliderPage >= totalSliderPages - 1 && currentPage >= totalPages}
//               className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:border-primary hover:text-primary hover:bg-primary/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 electronics-glow disabled:opacity-50"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </Button>
//           </div>
//         )}

//         <div className="flex flex-col items-center justify-center mt-16 space-y-6">
//           {viewMode === "swiper" && totalSliderPages > 1 && (
//             <div className="flex items-center space-x-2">
//               {Array.from({ length: totalSliderPages }, (_, i) => (
//                 <motion.button
//                   key={i}
//                   onClick={() => goToSliderPage(i)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     i === sliderPage
//                       ? "bg-primary scale-125 shadow-lg shadow-primary/50 electronics-glow"
//                       : "bg-muted hover:bg-primary/50 hover:scale-110"
//                   }`}
//                   whileHover={{ scale: i === sliderPage ? 1.25 : 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 />
//               ))}
//             </div>
//           )}

//           {currentPage < totalPages && (
//             <Button
//               variant="outline"
//               onClick={loadMoreProducts}
//               disabled={loading}
//               className="hover:border-primary hover:text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:scale-105 electronics-glow disabled:opacity-50"
//             >
//               {loading ? "Loading..." : "Load More Products"}
//             </Button>
//           )}
//         </div>

//         <div className="text-center mt-4">
//           <p className="text-sm text-muted-foreground">
//             {viewMode === "swiper"
//               ? `Slide ${sliderPage + 1} of ${totalSliderPages} • Showing ${
//                   getCurrentSliderProducts().length
//                 } of ${allProducts.length} loaded products (${totalProducts} total)`
//               : `Showing ${allProducts.length} of ${totalProducts} total products`}
//           </p>
//         </div>

//         <div className="text-center mt-8">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <Button
//               size="lg"
//               asChild
//               className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90 electronics-glow text-lg px-8 py-4"
//             >
//               <Link href="/products">
//                 <Cpu className="h-5 w-5 mr-2 animate-chip-glow" />
//                 View All Components
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

