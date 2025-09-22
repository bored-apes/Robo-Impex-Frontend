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
          message: `${cartItems.length} order${
            cartItems.length > 1 ? "s" : ""
          } created successfully.`,
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
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#38b6ff]">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Review your selected items
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="max-w-md sm:max-w-lg w-full p-6 sm:p-8 text-center glass-morphism animate-fade-in-up border-l-4 border-l-[#38b6ff]">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-[#38b6ff]/10 rounded-full flex items-center justify-center animate-gentle-float">
                  <ShoppingBag className="h-8 sm:h-10 w-8 sm:w-10 text-[#38b6ff]" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    Your Cart is Empty
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
                    Discover our industrial equipment and add items to get
                    started.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <Button
                    asChild
                    className="h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-transparent hover:bg-accent/10"
                  >
                    <Link href="/">
                      <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="sm:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item, index) => (
                <Card
                  key={`${item.id}-${JSON.stringify(item.variant)}`}
                  className="product-card animate-fade-in-up glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="relative">
                        <img
                          src={
                            item.image ||
                            "/placeholder.svg?height=100&width=100&query=industrial equipment"
                          }
                          alt={item.name}
                          className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {Object.entries(item.variant)
                                .map(
                                  ([key, value]) => `${key}: ${String(value)}`
                                )
                                .join(", ")}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 sm:h-9 sm:w-9 bg-transparent cursor-pointer"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.qty - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
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
                              className="w-12 sm:w-16 text-center h-8 sm:h-9 text-sm sm:text-base"
                              min={1}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 sm:h-9 sm:w-9 bg-transparent cursor-pointer"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.variant,
                                  item.qty + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-base sm:text-lg">
                              {CURRENCY.SYMBOL}
                              {(item.price * item.qty).toLocaleString()}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {CURRENCY.SYMBOL}
                              {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveToWishlist(item)}
                            className="text-xs sm:text-sm cursor-pointer"
                          >
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Save for Later
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-destructive hover:text-destructive text-xs sm:text-sm cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
              <Card className="sticky top-4 glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    Order Summary
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">
                        {CURRENCY.SYMBOL}
                        {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
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
                      <p className="text-xs sm:text-sm text-muted-foreground bg-muted p-2 rounded-lg">
                        Add {CURRENCY.SYMBOL}
                        {(1000 - subtotal).toLocaleString()} more for free
                        shipping
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-base sm:text-lg">
                      <span>Total</span>
                      <span>
                        {CURRENCY.SYMBOL}
                        {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {!isAuthenticated ? (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                            Please login to proceed with checkout
                          </p>
                        </div>
                        <Button
                          asChild
                          className="w-full h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                        >
                          <Link
                            href="/login"
                            className="flex items-center gap-1.5 sm:gap-2"
                          >
                            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                            Login to Checkout
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base cursor-pointer bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-1 sm:mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                            Proceed to Checkout
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-transparent hover:bg-accent/10"
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
