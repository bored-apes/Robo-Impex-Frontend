"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { wishlistStorage, cartStorage } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import { ProductCardProps } from "@/types/products";

export function ProductCard({ product }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistStorage.isInWishlist(product.id));
  }, [product.id]);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setIsInWishlist(false);
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      };
      wishlistStorage.addItem(wishlistItem);
      setIsInWishlist(true);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1,
    };
    cartStorage.addItem(cartItem);
  };

  return (
    <Card className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          {product.inStock ? (
            <Badge className="bg-green-500 text-white">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-background/80 hover:bg-background transition-colors ${
            isInWishlist
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-semibold hover:text-primary transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.descriptionShort}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-muted-foreground/30"
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
            <span className="text-xl font-semibold">
              {CURRENCY.SYMBOL}
              {product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/products/${product.slug}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
