"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Share2, Star, Truck, Shield, Award, Zap, Eye, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cartStorage, wishlistStorage } from "@/lib/utils/storage"
import { CURRENCY } from "@/data/constants"
import type { APIProduct } from "@/types/products"
import { getProductById, getProducts } from "@/lib/apiServices/product.service"
import { SectionLoader } from "@/components/shared/common/loader"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<APIProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<APIProduct[]>([])
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${Math.floor(Math.random() * 50) + 10})` },
    { id: "shipping", label: "Shipping & Returns" },
  ]

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return

      setLoading(true)
      setError(null)

      try {
        const productId = Array.isArray(params.id) ? params.id[0] : params.id

        const response = await getProductById(productId)
        console.log("🚀 ~ fetchProduct ~ response:", response)

        if (response.success && response.data) {
          const productData = response.data as APIProduct
          setProduct(productData)
          setIsInWishlist(wishlistStorage.getItems().some((item) => item.id === productData.id.toString()))

          const relatedResponse = await getProducts({
            pageSize: 4,
            category: productData.category || undefined,
          })
          console.log("🚀 ~ fetchProduct ~ relatedResponse:", relatedResponse)

          if (relatedResponse.success && relatedResponse.data) {
            const responseData = relatedResponse.data as {
              data: APIProduct[]
              pagination: {
                page: number
                pageSize: number
                total: number
                totalPages: number
              }
            }
            const filtered = responseData.data.filter((p) => p.id !== productData.id)
            setRelatedProducts(filtered.slice(0, 4))
          }
        } else {
          setError(response.message || "Product not found")
        }
      } catch (err) {
        setError("Failed to load product")
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  useEffect(() => {
    if (product) {
      setQuantity(product.min_order_qty || 1)
    }
  }, [product])

  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id.toString(),
      name: product.name || "Unknown Product",
      price: product.base_price || 0,
      image: product.image_url || "/placeholder.svg?key=robotics-chip",
      qty: quantity,
    }
    cartStorage.addItem(cartItem)

    alert("Product added to cart!")
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (isInWishlist) {
      wishlistStorage.removeItem(product.id.toString())
      setIsInWishlist(false)
    } else {
      const wishlistItem = {
        id: product.id.toString(),
        name: product.name || "Unknown Product",
        price: product.base_price || 0,
        image: product.image_url || "/placeholder.svg?key=robotics-chip",
      }
      wishlistStorage.addItem(wishlistItem)
      setIsInWishlist(true)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Product",
          text: product?.description || "Check out this product",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return <SectionLoader text="Loading your product..." minHeight="h-96" />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Button onClick={() => router.push("/products")}>Back to Products</Button>
        </div>
      </div>
    )
  }

  const displayProduct = {
    id: product.id.toString(),
    name: product.name || "Unknown Product",
    description: product.description || "No description available",
    price: product.base_price || 0,
    images: product.image_url ? [product.image_url] : ["/placeholder.svg?key=robotics-chip"],
    category: product.category || "Unknown",
    type: product.type || "Unknown",
    inStock: (product.stock_quantity || 0) > 0,
    stockQuantity: product.stock_quantity || 0,
    minOrderQty: product.min_order_qty || 1,
    gstRate: product.gst_rate || 0,
    rating: 4.5, // Default rating since not in API
    ratingCount: Math.floor(Math.random() * 50) + 10, // Mock rating count
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{displayProduct.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6 hover:bg-accent/10" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 industrial-border">
              <img
                src={displayProduct.images[selectedImage] || "/placeholder.svg"}
                alt={displayProduct.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {!displayProduct.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {displayProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-accent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${displayProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{displayProduct.type}</Badge>
                <Badge variant="outline" className="text-primary border-primary">
                  {displayProduct.category}
                </Badge>
                {displayProduct.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    In Stock ({displayProduct.stockQuantity})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{displayProduct.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(displayProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {displayProduct.rating} ({displayProduct.ratingCount} reviews)
                </span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">{displayProduct.description}</p>
            </div>

            {/* Price */}
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {CURRENCY.SYMBOL}
                  {displayProduct.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">+ {displayProduct.gstRate}% GST</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum order quantity: {displayProduct.minOrderQty} pieces
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(displayProduct.minOrderQty, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">pieces</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 animate-glow"
                  onClick={handleAddToCart}
                  disabled={!displayProduct.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={isInWishlist ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
                </Button>

                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, text: "Secure Payment", desc: "SSL Encrypted" },
                {
                  icon: Truck,
                  text: "Fast Shipping",
                  desc: "Worldwide Delivery",
                },
                { icon: Award, text: "Quality Assured", desc: "ISO Certified" },
                { icon: Zap, text: "24/7 Support", desc: "Expert Assistance" },
              ].map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <badge.icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">{badge.text}</div>
                    <div className="text-xs text-muted-foreground">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="border-b">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">{displayProduct.description}</p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Product Details</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Type: {displayProduct.type}</li>
                      <li>• Category: {displayProduct.category}</li>
                      <li>• Stock: {displayProduct.stockQuantity} units</li>
                      <li>• Min Order: {displayProduct.minOrderQty} pieces</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Pricing</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Base Price: ₹{displayProduct.price.toLocaleString()}</li>
                      <li>• GST Rate: {displayProduct.gstRate}%</li>
                      <li>
                        • Total Price: ₹{(displayProduct.price * (1 + displayProduct.gstRate / 100)).toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Product Type</span>
                  <span className="text-muted-foreground">{displayProduct.type}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Category</span>
                  <span className="text-muted-foreground">{displayProduct.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Stock Quantity</span>
                  <span className="text-muted-foreground">{displayProduct.stockQuantity} units</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Minimum Order</span>
                  <span className="text-muted-foreground">{displayProduct.minOrderQty} pieces</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">GST Rate</span>
                  <span className="text-muted-foreground">{displayProduct.gstRate}%</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Status</span>
                  <span className="text-muted-foreground">{product.status}</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reviews Coming Soon</h3>
                <p className="text-muted-foreground">Customer reviews will be available shortly.</p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free shipping on orders over ₹50,000</li>
                    <li>• Standard delivery: 7-15 business days</li>
                    <li>• Express delivery: 3-7 business days</li>
                    <li>• Installation support available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Returns & Warranty</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 1 Year manufacturer warranty</li>
                    <li>• 30-day return policy</li>
                    <li>• Technical support included</li>
                    <li>• Spare parts availability guaranteed</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="px-4 sm:px-8 lg:px-12 xl:px-20">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300 hover-lift">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image_url || "/placeholder.svg?key=robotics-chip"}
                      alt={relatedProduct.name || "Product"}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2"
                    >
                      {relatedProduct.name}
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {CURRENCY.SYMBOL}
                        {(relatedProduct.base_price || 0).toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground ml-1">4.5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
