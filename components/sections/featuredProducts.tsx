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
                View All Components
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
