"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cartStorage, wishlistStorage } from "@/lib/utils/storage"
import { CURRENCY } from "@/data/constants"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCartItems(cartStorage.getItems())
    setIsLoading(false)
  }, [])

  const updateQuantity = (id, variant, newQty) => {
    if (newQty <= 0) {
      removeItem(id, variant)
      return
    }
    cartStorage.updateQuantity(id, variant, newQty)
    setCartItems(cartStorage.getItems())
  }

  const removeItem = (id, variant) => {
    cartStorage.removeItem(id, variant)
    setCartItems(cartStorage.getItems())
  }

  const moveToWishlist = (item) => {
    const wishlistItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    }
    wishlistStorage.addItem(wishlistItem)
    removeItem(item.id, item.variant)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </main>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground text-lg">Discover our premium industrial machinery and equipment</p>
            </div>
            <div className="space-y-3">
              <Button size="lg" className="animate-glow" asChild>
                <Link href="/">Explore Products</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your selected items before checkout</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card
                  key={`${item.id}-${JSON.stringify(item.variant)}`}
                  className="hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg?height=120&width=120&query=industrial machinery"}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl border"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(item.variant)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.variant, item.qty - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.qty}
                              onChange={(e) =>
                                updateQuantity(item.id, item.variant, Number.parseInt(e.target.value) || 1)
                              }
                              className="w-16 text-center h-8"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.variant, item.qty + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-lg text-primary">
                              {CURRENCY.SYMBOL}
                              {(item.price * item.qty).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {CURRENCY.SYMBOL}
                              {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => moveToWishlist(item)} className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            Save for Later
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-destructive hover:text-destructive text-xs"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 glass-morphism">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-semibold">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold">
                        {CURRENCY.SYMBOL}
                        {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <>
                            {CURRENCY.SYMBOL}
                            {shipping}
                          </>
                        )}
                      </span>
                    </div>
                    {subtotal < 1000 && (
                      <p className="text-xs text-muted-foreground">
                        Add {CURRENCY.SYMBOL}
                        {(1000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span className="text-primary">
                        {CURRENCY.SYMBOL}
                        {total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full animate-glow" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">Secure checkout with SSL encryption</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
