"use client";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  cartStorage,
  wishlistStorage,
  type CartItem,
  type Variant,
} from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import { SectionLoader } from "@/components/shared/common/loader";

export default function CartPage(): ReactElement {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartItems(cartStorage.getItems());
      setIsLoading(false);
    }, 1000); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (
    id: string,
    variant: Variant,
    newQty: number
  ): void => {
    if (newQty <= 0) {
      removeItem(id, variant);
      return;
    }
    cartStorage.updateQuantity(id, variant, newQty);
    setCartItems(cartStorage.getItems());
  };

  const removeItem = (id: string, variant: Variant): void => {
    cartStorage.removeItem(id, variant);
    setCartItems(cartStorage.getItems());
  };

  const moveToWishlist = (item: CartItem): void => {
    const wishlistItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || "",
    };
    wishlistStorage.addItem(wishlistItem);
    removeItem(item.id, item.variant);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background px-4 sm:px-8 lg:px-12 xl:px-20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#38b6ff]">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">Review your selected items</p>
        </div>

        {isLoading ? (
          <SectionLoader text="Loading your cart..." minHeight="h-96" />
        ) : cartItems.length === 0 ? (
          <div className="empty-state rounded-xl p-16 text-center animate-fade-in-up">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center animate-gentle-float">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground">
                  Discover our industrial equipment and add items to get
                  started.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="animate-soft-glow">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card
                  key={`${item.id}-${JSON.stringify(item.variant)}`}
                  className="product-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={
                            item.image ||
                            "/placeholder.svg?height=100&width=100&query=industrial equipment"
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold line-clamp-2">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-sm text-muted-foreground">
                              {Object.entries(item.variant)
                                .map(
                                  ([key, value]) => `${key}: ${String(value)}`
                                )
                                .join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.qty - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.qty}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center h-8"
                              min={1}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.qty + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg">
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item)}
                            className="text-xs"
                          >
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

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">
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
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                        Add {CURRENCY.SYMBOL}
                        {(1000 - subtotal).toLocaleString()} more for free
                        shipping
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        {CURRENCY.SYMBOL}
                        {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
