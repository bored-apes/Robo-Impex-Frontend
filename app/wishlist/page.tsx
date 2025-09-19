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

export default function WishlistPage() {
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
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#38b6ff] mx-auto mb-3 sm:mb-4"></div>
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
      <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#38b6ff]">
               WishList
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Review your wishlist Items
            </p>
          </div>
          <div className="flex items-center justify-center min-h-[50vh]">
            <Card className="max-w-md sm:max-w-lg w-full p-6 sm:p-8 text-center glass-morphism animate-fade-in-up border-l-4 border-l-[#38b6ff]">
              <div className="space-y-4 sm:space-y-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-[#38b6ff]/10 rounded-full flex items-center justify-center animate-gentle-float">
                  <Heart className="h-8 sm:h-10 w-8 sm:w-10 text-[#38b6ff]" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md">
                    Save your favorite products to easily find them later.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <Button
                    asChild
                    className="h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                  >
                    <Link href="/products">Discover Products</Link>
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-[#38b6ff]">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground flex items-center gap-1.5 sm:gap-2">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button
              onClick={addAllToCart}
              className="h-9 sm:h-10 px-4 cursor-pointer sm:px-5 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              Add All to Cart ({wishlistItems.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
          {wishlistItems.map((item, index) => (
            <Card
              key={item.id}
              className="product-card animate-fade-in-up glass-morphism border-l-4 border-l-[#38b6ff] hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={
                      item.image ||
                      "/placeholder.svg?height=200&width=300&query=industrial equipment"
                    }
                    alt={item.name}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background h-8 w-8 sm:h-9 sm:w-9"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                    {item.name}
                  </h3>
                  {item.price && (
                    <div className="text-base sm:text-lg font-semibold">
                      {CURRENCY.SYMBOL}
                      {item.price.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <Button
                    className="flex-1 cursor-pointer h-9 sm:h-10 text-sm sm:text-base bg-[#38b6ff] hover:bg-[#38b6ff]/90 animate-glow"
                    onClick={() => moveToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="h-9 sm:h-10 w-9 sm:w-10 bg-transparent hover:bg-accent/10"
                  >
                    <Link href={`/products/${item.slug || item.id}`}>
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
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
