"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { wishlistStorage, cartStorage } from "@/lib/utils/storage"
import { CURRENCY } from "@/data/constants"
import productsData from "@/data/products.json"
import { Card, CardContent, CardFooter } from "../ui/card"

export function FeaturedProducts() {
  const [wishlistItems, setWishlistItems] = useState([])
  const featuredProducts = productsData.slice(0, 6) 

  useEffect(() => {
    setWishlistItems(wishlistStorage.getItems())
  }, [])

  const handleWishlistToggle = (product) => {
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

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1,
    }
    cartStorage.addItem(cartItem)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our top-rated industrial machinery and equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => {
            const isInWishlist = wishlistItems.some((item) => item.id === product.id)

            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    {product.inStock ? (
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 transition-all duration-300 ${
                      isInWishlist ? "text-red-500" : "text-white hover:text-red-500"
                    }`}
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Link
                      href="/"
                      className="font-semibold text-lg hover:text-accent transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.descriptionShort}</p>

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
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        {CURRENCY.SYMBOL}
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">{CURRENCY.DEFAULT}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button className="flex-1 group" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild className="animate-fade-in-up">
            <Link href="/">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
