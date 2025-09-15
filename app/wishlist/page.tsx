"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { wishlistStorage, cartStorage, WishlistItem } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setWishlistItems(wishlistStorage.getItems());
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (id:string) => {
    wishlistStorage.removeItem(id);
    setWishlistItems(wishlistStorage.getItems());
  };

  const moveToCart = (item:WishlistItem) => {
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your wishlist...</p>
          </div>
        </main>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background px-4 sm:px-8 lg:px-12 xl:px-20">
        <main className="container mx-auto px-4 py-8">
          <div className="empty-state rounded-xl p-16 text-center animate-fade-in-up">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center animate-gentle-float">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground">
                  Save your favorite products to easily find them later.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="animate-soft-glow">
                  <Link href="/products">Discover Products</Link>
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-8 lg:px-12 xl:px-20">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-[#38b6ff]">
              My Wishlist
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button onClick={addAllToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart ({wishlistItems.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item, index) => (
            <Card
              key={item.id}
              className="product-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={
                      item.image ||
                      "/placeholder.svg?height=200&width=300&query=industrial equipment"
                    }
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                  {item.price && (
                    <div className="text-lg font-semibold">
                      {CURRENCY.SYMBOL}
                      {item.price.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" onClick={() => moveToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/products/${item.slug || item.id}`}>
                      <Heart className="h-4 w-4" />
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
