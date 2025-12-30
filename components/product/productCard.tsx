"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { wishlistStorage, cartStorage } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import type { ProductCardProps } from "@/types/products";
import { StarRating } from "../shared/common/starRating";
import { useCustomToast } from "../shared/common/customToast";
import { handleImageError } from "@/lib/utils/imageUtils";

export function ProductCard({ product }: ProductCardProps) {
  const { showToast } = useCustomToast();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlistStorage.isInWishlist(product.id));
  }, [product.id]);

  const handleWishlistToggle = async () => {
    setIsTogglingWishlist(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setIsInWishlist(false);
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        minQuantityOrder: product.minQuantityOrder || 1,
        stockQuantity: product.stockQuantity || 0,
      };
      wishlistStorage.addItem(wishlistItem);
      setIsInWishlist(true);
    }

    setIsTogglingWishlist(false);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: 1,
      stockQuantity: product.stockQuantity || 0,
      minQuantityOrder:product.minQuantityOrder || 1,
    };
    cartStorage.addItem(cartItem);
    showToast({
      type: "success",
      title: "Added to Cart",
      message: `${product.name ?? "Product"} was added to your cart.`,
    });
    setIsAddingToCart(false);
  };

  return (
    <Card className="product-card group h-full hover:shadow-lg transition-all duration-300 hover-lift glass-morphism">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product?.images?.[0] || "/placeholder.svg"}
          alt={product?.name || "Product image"}
          className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />

        <div className="absolute top-1 sm:top-1.5 left-1 sm:left-1.5">
          {product.inStock ? (
            <Badge className="bg-green-500 text-white text-xs sm:text-sm">
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs sm:text-sm">
              Out of Stock
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-1 sm:top-1.5 right-1 sm:right-1.5 bg-background/80 hover:bg-background transition-colors w-7 h-7 sm:w-8 sm:h-8 ${
            isInWishlist
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          }`}
          onClick={handleWishlistToggle}
          disabled={isTogglingWishlist}
        >
          {isTogglingWishlist ? (
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <Heart
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                isInWishlist ? "fill-current" : ""
              }`}
            />
          )}
        </Button>
      </div>

      <CardContent className="p-1 sm:p-2 md:p-3 flex-1 flex flex-col">
        <div className="mb-1 sm:mb-2">
          <Link
            href={`/products/${product.id}`}
            className="font-semibold hover:text-primary transition-colors line-clamp-2 text-xs sm:text-sm md:text-base"
          >
            {product.name}
          </Link>
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 flex-1">
          {product.descriptionShort}
        </p>

        <div className="flex items-center mb-1 sm:mb-2">
          <StarRating
            rating={product.rating ?? 0}
            size="h-3 w-3 sm:h-4 sm:w-4"
          />
          <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">
            {Number(product.rating).toFixed(1)} ({product.ratingCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm sm:text-base md:text-lg font-semibold">
              {CURRENCY.SYMBOL}
              {typeof product?.price === "number"
                ? product.price.toLocaleString()
                : "0"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2 sm:p-3 md:p-4 pt-0 flex gap-1 sm:gap-2">
        <Button
          className="flex-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 cursor-pointer"
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add to Cart
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          asChild
          className="w-8 h-8 sm:w-9 sm:h-9 bg-transparent"
        >
          <Link href={`/products/${product.id}`}>
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
