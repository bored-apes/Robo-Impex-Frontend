"use client";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { wishlistStorage, cartStorage } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import productsData from "@/data/products.json";
import { Card, CardContent, CardFooter } from "../ui/card";
import { motion } from "framer-motion";
import { Product } from "@/types/produt";
import { AnimatedProductSectionBackgroundIcons } from "../shared/common/animatedBackgroundIcons";

export function FeaturedProducts(): ReactElement {
  const [wishlistItems, setWishlistItems] = useState<{ id: string }[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const productsPerPage = 8;
  const totalPages = Math.ceil(
    (productsData as Product[]).length / productsPerPage
  );

  const getCurrentProducts = (): Product[] => {
    const start = currentPage * productsPerPage;
    return (productsData as Product[]).slice(start, start + productsPerPage);
  };

  useEffect(() => {
    setWishlistItems(wishlistStorage.getItems());
  }, []);

  const handleWishlistToggle = (product: Product): void => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (isInWishlist) {
      wishlistStorage.removeItem(product.id);
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      };
      wishlistStorage.addItem(wishlistItem);
      setWishlistItems((prev) => [...prev, wishlistItem]);
    }
  };

  const handleAddToCart = (product: Product): void => {
    const productInput = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
    };
    cartStorage.addItem(productInput, {}, 1);
  };

  const nextPage = (): void =>
    setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = (): void =>
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="py-16 px-4 md:px-16 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <AnimatedProductSectionBackgroundIcons />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#38b6ff] to-[#38b6ff]/70 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our top-rated industrial machinery and equipment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getCurrentProducts().map((product, index) => {
            const isInWishlist = wishlistItems.some(
              (item) => item.id === product.id
            );
            return (
              <motion.div
                key={`${product.id}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group hover:shadow-2xl hover:shadow-[#38b6ff]/10 transition-all duration-500 hover:scale-[1.03] border border-[#38b6ff]/20 bg-background/90 backdrop-blur-sm hover:ring-2 hover:ring-[#38b6ff]/30 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <div className="relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                        <Icon
                          icon="mdi:chip"
                          className="absolute top-2 right-2 w-4 h-4 text-[#38b6ff]"
                        />
                        <Icon
                          icon="mdi:memory"
                          className="absolute bottom-2 left-2 w-3 h-3 text-[#38b6ff]"
                        />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      {product.inStock ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-500 text-white"
                        >
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 transition-all duration-300 hover:bg-background/80 ${
                        isInWishlist
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-3">
                    <div className="mb-2">
                      <Link
                        href="/"
                        className="font-semibold text-sm hover:text-[#38b6ff] transition-colors line-clamp-2 leading-tight"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {product.rating} ({product.ratingCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#38b6ff]">
                          {CURRENCY.SYMBOL}
                          {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-3 pt-0 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 group bg-[#38b6ff] hover:bg-[#38b6ff]/90 text-xs"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:border-[#38b6ff] hover:text-[#38b6ff] bg-transparent px-2"
                    >
                      <Link href="/">
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-12 space-x-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="hover:border-[#38b6ff] hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 bg-transparent transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-[#38b6ff] scale-150 shadow-lg shadow-[#38b6ff]/50"
                    : "bg-muted hover:bg-[#38b6ff]/50 hover:scale-125"
                }`}
                whileHover={{ scale: i === currentPage ? 1.5 : 1.25 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="hover:border-[#38b6ff] hover:text-[#38b6ff] hover:bg-[#38b6ff]/10 bg-transparent transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              size="lg"
              asChild
              className="hover:scale-105 transition-transform bg-[#38b6ff] hover:bg-[#38b6ff]/90"
            >
              <Link href="/">View All Products</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
