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
  Lock,
  User,
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
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/apiServices/order.service";
import { useCustomToast } from "@/components/shared/common/customToast";

export default function CartPage(): ReactElement {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { showToast } = useCustomToast();

  useEffect(() => {
    setCartItems(cartStorage.getItems());
  }, []);

  const updateQuantity = (id: string, variant: Variant, newQty: number): void => {
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

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      showToast({
        type: "warning",
        title: "Login Required",
        message: `Please login to proceed with checkout.`,
      });
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      showToast({
        type: "info",
        title: "Empty Cart",
        message: "Please add items to your cart before checkout.",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderPromises = cartItems.map(async (item) => {
        const basePrice = item.price * item.qty;
        const gstRate = 18;
        const gstAmount = (basePrice * gstRate) / 100;
        const finalPrice = basePrice + gstAmount;

        const orderData = {
          user_id: user.id,
          product_id: Number.parseInt(item.id),
          quantity: item.qty,
          base_price: basePrice,
          gst_rate: gstRate,
          gst_amount: gstAmount,
          final_price: finalPrice,
        };

        return createOrder(orderData);
      });

      const results = await Promise.all(orderPromises);
      const failedOrders = results.filter((result) => !result.success);

      if (failedOrders.length > 0) {
        showToast({
          type: "error",
          title: "Partial Order Creation Failed",
          message: `${failedOrders.length} out of ${cartItems.length} orders failed to create.`,
        });
      } else {
        cartStorage.clear();
        setCartItems([]);

        showToast({
          type: "success",
          title: "Orders Created Successfully!",
          message: `${cartItems.length} order${cartItems.length > 1 ? "s" : ""} created successfully.`,
        });

        router.push("/orders");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showToast({
        type: "error",
        title: "Checkout Failed",
        message: "An error occurred during checkout. Please try again.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8">
      <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-[#38b6ff]">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
            Review your selected items
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
            <Card className="max-w-sm sm:max-w-md md:max-w-lg w-full p-4 sm:p-6 text-center glass-morphism animate-fade-in-up border-l-4 border-l-[#38b6ff]">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-12 sm:w-16 h-12 sm:h-16 md:w-20 md:h-20 mx-auto bg-[#38b6ff]/10 rounded-full flex items-center justify-center animate-gentle-float">
                  <ShoppingBag className="h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10 text-[#38b6ff]" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                    Your Cart is Empty
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-xs sm:max-w-md">
                    Discover our industrial equipment and add items to get started.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 justify-center">
                  <Button
                    asChild
                    className="h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base bg-transparent hover:bg-accent/10"
                  >
                    <Link href="/">
                      <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <div className="sm:col-span-2 space-y-2 sm:space-y-4">
              {cartItems.map((item, index) => (
                <Card
                  key={`${item.id}-${JSON.stringify(item.variant)}`}
                  className="product-card animate-fade-in-up glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-2 sm:p-3 md:p-4">
                    <div className="flex gap-2 sm:gap-3 md:gap-4">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg?height=100&width=100&query=industrial equipment"}
                          alt={item.name}
                          className="w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="flex-1 space-y-1 sm:space-y-2 md:space-y-3">
                        <div>
                          <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {Object.entries(item.variant).map(([key, value]) => `${key}: ${String(value)}`).join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 md:gap-3">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9 bg-transparent cursor-pointer"
                              onClick={() => updateQuantity(item.id, item.variant, item.qty - 1)}
                            >
                              <Minus className="h-2 sm:h-3 md:h-4 w-2 sm:w-3 md:w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.qty}
                              onChange={(e) => updateQuantity(item.id, item.variant, Number.parseInt(e.target.value) || 1)}
                              className="w-10 sm:w-12 md:w-16 text-center h-7 sm:h-8 md:h-9 text-xs sm:text-sm md:text-base"
                              min={1}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9 bg-transparent cursor-pointer"
                              onClick={() => updateQuantity(item.id, item.variant, item.qty + 1)}
                            >
                              <Plus className="h-2 sm:h-3 md:h-4 w-2 sm:w-3 md:w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-sm sm:text-base md:text-lg">
                              {CURRENCY.SYMBOL}{(item.price * item.qty).toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {CURRENCY.SYMBOL}{item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 sm:gap-2 md:gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item)}
                            className="text-xs sm:text-sm cursor-pointer"
                          >
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
                            Save for Later
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-destructive hover:text-destructive text-xs sm:text-sm cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <Card className="sticky top-2 sm:top-4 glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                    Order Summary
                  </h2>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">
                        {CURRENCY.SYMBOL}{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm md:text-base">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <>
                            {CURRENCY.SYMBOL}{shipping}
                          </>
                        )}
                      </span>
                    </div>
                    {subtotal < 1000 && (
                      <p className="text-xs sm:text-sm text-muted-foreground bg-muted p-1 sm:p-2 rounded">
                        Add {CURRENCY.SYMBOL}{(1000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-sm sm:text-base md:text-lg">
                      <span>Total</span>
                      <span>
                        {CURRENCY.SYMBOL}{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    {!isAuthenticated ? (
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                            Please login to proceed with checkout
                          </p>
                        </div>
                        <Button
                          asChild
                          className="w-full h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                        >
                          <Link href="/login" className="flex items-center gap-1 sm:gap-1.5">
                            <Lock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                            Login to Checkout
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base cursor-pointer bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border-b-2 border-white mr-0.5 sm:mr-1 md:mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
                            Proceed to Checkout
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base bg-transparent hover:bg-accent/10"
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
