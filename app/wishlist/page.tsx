"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  wishlistStorage,
  cartStorage,
  WishlistItem,
} from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import { useCustomToast } from "@/components/shared/common/customToast";

export default function WishlistPage() {
  const { showToast } = useCustomToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setWishlistItems(wishlistStorage.getItems());
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (id: string) => {
    wishlistStorage.removeItem(id);
    setWishlistItems(wishlistStorage.getItems());
  };

  const moveToCart = (item: WishlistItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1,
    };
    cartStorage.addItem(cartItem);
    showToast({
      type: "success",
      title: "moved to Cart",
      message: `${item.name ?? "Product"} was moved to your cart.`,
    });
    removeFromWishlist(item.id);
  };

  const addAllToCart = () => {
    wishlistItems.forEach((item) => {
      const cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: 1,
      };
      cartStorage.addItem(cartItem);
    });
    wishlistStorage.clear();
    setWishlistItems([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="animate-spin rounded-full h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 border-b-2 border-[#38b6ff] mx-auto mb-2 sm:mb-3"></div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Loading your wishlist...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8">
        <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-[#38b6ff]">
              WishList
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
              Review your wishlist Items
            </p>
          </div>
          <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
            <Card className="max-w-sm sm:max-w-md md:max-w-lg w-full p-4 sm:p-6 text-center glass-morphism animate-fade-in-up border-l-4 border-l-[#38b6ff]">
              <div className="space-y-3 sm:space-y-4">
                <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 mx-auto bg-[#38b6ff]/10 rounded-full flex items-center justify-center animate-gentle-float">
                  <Heart className="h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10 text-[#38b6ff]" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-xs sm:max-w-md">
                    Save your favorite products to easily find them later.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 justify-center">
                  <Button
                    asChild
                    className="h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm md:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                  >
                    <Link href="/products">Discover Products</Link>
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-2 sm:px-4 md:px-6 lg:px-8">
      <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-[#38b6ff]">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground flex items-center gap-1 sm:gap-1.5">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-500" />
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button
              onClick={addAllToCart}
              className="h-8 sm:h-9 md:h-10 px-3 cursor-pointer sm:px-4 text-xs sm:text-sm md:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
              Add All to Cart ({wishlistItems.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {wishlistItems.map((item, index) => (
            <Card
              key={item.id}
              className="product-card animate-fade-in-up glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="relative mb-2 sm:mb-3 md:mb-4">
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=300&query=industrial equipment"}
                    alt={item.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 bg-background/80 hover:bg-background h-7 sm:h-8 md:h-9 w-7 sm:w-8 md:w-9"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </Button>
                </div>

                <div className="space-y-1 sm:space-y-2 md:space-y-3">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2">
                    {item.name}
                  </h3>
                  {item.price && (
                    <div className="text-sm sm:text-base md:text-lg font-semibold">
                      {CURRENCY.SYMBOL}{item.price.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-1 sm:gap-2 md:gap-3 mt-2 sm:mt-3 md:mt-4">
                  <Button
                    className="flex-1 cursor-pointer h-8 sm:h-9 md:h-10 text-xs sm:text-sm md:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                    onClick={() => moveToCart(item)}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-0.5 sm:mr-1 md:mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 bg-transparent hover:bg-accent/10"
                  >
                    <Link href={`/products/${item.slug || item.id}`}>
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
