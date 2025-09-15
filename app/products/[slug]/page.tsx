"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  Award,
  Zap,
  Eye,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cartStorage, wishlistStorage } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import productsData from "@/data/products.json";
import { foundProduct, Product } from "@/types/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<foundProduct>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, string>
  >({});
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.slug === params.slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setIsInWishlist(
        wishlistStorage.getItems().some((item) => item.id === foundProduct.id)
      );

      // Get related products
      const related = productsData
        .filter(
          (p) =>
            p.id !== foundProduct.id &&
            p.categories.some((cat) => foundProduct.categories.includes(cat))
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [params.slug]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: quantity,
      variants: selectedVariant,
    };
    cartStorage.addItem(cartItem);

    // Show success feedback (you can implement toast here)
    alert("Product added to cart!");
  };

  const handleWishlistToggle = () => {
    if (!product) return;

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.descriptionShort,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.ratingCount})` },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-accent/10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 industrial-border">
              <img
                src={
                  product.images[selectedImage] ||
                  "/placeholder.svg?height=600&width=600&query=industrial machinery"
                }
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-accent"
                  }`}
                >
                  <img
                    src={
                      image ||
                      "/placeholder.svg?height=80&width=80&query=industrial machinery"
                    }
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.inStock ? (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.ratingCount} reviews)
                </span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.descriptionShort}
              </p>
            </div>

            {/* Price */}
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {CURRENCY.SYMBOL}
                  {product.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Price includes basic configuration
              </p>
            </div>

            {/* Variants */}
            {product.variants && Object.keys(product.variants).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Configuration Options</h3>
                {Object.entries(product.variants).map(([key, values]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value: string) => (
                        <button
                          key={value}
                          onClick={() =>
                            setSelectedVariant({
                              ...selectedVariant,
                              [key]: value,
                            })
                          }
                          className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                            selectedVariant[key] === value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input hover:border-accent hover:bg-accent/10"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">pieces</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 animate-glow"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={isInWishlist ? "text-red-500 border-red-500" : ""}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
                  />
                </Button>

                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, text: "Secure Payment", desc: "SSL Encrypted" },
                {
                  icon: Truck,
                  text: "Fast Shipping",
                  desc: "Worldwide Delivery",
                },
                { icon: Award, text: "Quality Assured", desc: "ISO Certified" },
                { icon: Zap, text: "24/7 Support", desc: "Expert Assistance" },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                >
                  <badge.icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">{badge.text}</div>
                    <div className="text-xs text-muted-foreground">
                      {badge.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-16 px-4 sm:px-8 lg:px-12 xl:px-20">
          <div className="border-b">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  {product.descriptionLong}
                </p>
              </div>
            )}

            {activeTab === "specifications" && product.specifications && (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Reviews Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Customer reviews will be available shortly.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Shipping Information
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free shipping on orders over $10,000</li>
                    <li>• Standard delivery: 15-30 business days</li>
                    <li>• Express delivery: 7-15 business days</li>
                    <li>• Installation support available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Returns & Warranty
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• {product.warranty} manufacturer warranty</li>
                    <li>• 30-day return policy</li>
                    <li>• Technical support included</li>
                    <li>• Spare parts availability guaranteed</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="px-4 sm:px-8 lg:px-12 xl:px-20">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group hover:shadow-lg transition-all duration-300 hover-lift"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        relatedProduct.images[0] ||
                        "/placeholder.svg?height=200&width=300&query=industrial machinery"
                      }
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Link
                      href={`/products/${relatedProduct.slug}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2"
                    >
                      {relatedProduct.name}
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {CURRENCY.SYMBOL}
                        {relatedProduct.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
