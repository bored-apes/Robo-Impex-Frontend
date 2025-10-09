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
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cartStorage, wishlistStorage } from "@/lib/utils/storage";
import { CURRENCY } from "@/data/constants";
import type { APIProduct } from "@/types/products";
import { getProductById, getProducts } from "@/lib/apiServices/product.service";
import { StarRating } from "@/components/shared/common/starRating";
import { DescriptionTab } from "@/components/product/productDescriptionTab";
import { RelatedProducts } from "@/components/product/relatedProduct";
import { SpecificationsTab } from "@/components/product/specificationsTab";
import { ReviewsTab } from "@/components/product/reviewsTab";
import { ShippingTab } from "@/components/product/shippingTab";
import { ProductDetailSkeleton } from "@/components/shared/skeletons/productDetailSkeleton";
import { useCustomToast } from "@/components/shared/common/customToast";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useCustomToast();
  const [product, setProduct] = useState<APIProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<APIProduct[]>([]);
  const [activeTab, setActiveTab] = useState("description");
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [customQuantityInput, setCustomQuantityInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;

      setLoading(true);
      setError(null);

      try {
        const productId = Array.isArray(params.id) ? params.id[0] : params.id;

        const response = await getProductById(productId);

        if (response.success && response.data) {
          const productData = response.data as APIProduct;
          setProduct(productData);
          setIsInWishlist(
            wishlistStorage
              .getItems()
              .some((item) => item.id === productData.id.toString())
          );

          if (productData.total_ratings) {
            setTotalReviews(productData.total_ratings);
          }

          const relatedResponse = await getProducts({
            pageSize: 10000, 
            category: productData.category || undefined,
          });

          if (relatedResponse.success && relatedResponse.data) {
            const responseData = relatedResponse.data as {
              data: APIProduct[];
              pagination: {
                page: number;
                pageSize: number;
                total: number;
                totalPages: number;
              };
            };
            const filtered = responseData.data.filter(
              (p) => p.id !== productData.id
            );
            setRelatedProducts(filtered);
          }
        } else {
          setError(response.message || "Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (product) {
      const initialQty = product.min_order_qty || 1;
      setQuantity(initialQty);
      setCustomQuantityInput(initialQty.toString());
    }
  }, [product]);

  const handleCustomQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCustomQuantityInput(value);

    if (value === "") return;

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      handleQuantityChange(numValue);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return;

    const maxStock = product.stock_quantity || 0;

    if (newQuantity > maxStock) {
      showToast({
        type: "warning",
        title: "Maximum Stock Reached",
        message: `Maximum available stock is ${maxStock} pieces.`,
      });
      setQuantity(maxStock);
      setCustomQuantityInput(maxStock.toString());
      return;
    }

    setQuantity(newQuantity);
    setCustomQuantityInput(newQuantity.toString());
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(Math.max(1, quantity - 1));
  };

  const handleInputBlur = () => {
    if (customQuantityInput === "") {
      setCustomQuantityInput("1");
      setQuantity(1);
      return;
    }

    const numValue = parseInt(customQuantityInput);
    if (isNaN(numValue) || numValue <= 0) {
      setCustomQuantityInput("1");
      setQuantity(1);
      showToast({
        type: "warning",
        title: "Invalid Quantity",
        message: `Quantity set to 1 piece.`,
      });
    } else {
      handleQuantityChange(numValue);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id.toString(),
      name: product.name || "Unknown Product",
      price: product.base_price || 0,
      image: product.image_url || "/placeholder.svg?key=robotics-chip",
      qty: quantity,
    };
    cartStorage.addItem(cartItem);
    showToast({
      type: "success",
      title: "Added to Cart",
      message: `${product.name ?? "Product"} was added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist) {
      wishlistStorage.removeItem(product.id.toString());
      setIsInWishlist(false);
    } else {
      const wishlistItem = {
        id: product.id.toString(),
        name: product.name || "Unknown Product",
        price: product.base_price || 0,
        image: product.image_url || "/placeholder.svg?key=robotics-chip",
      };
      wishlistStorage.addItem(wishlistItem);
      setIsInWishlist(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Product",
          text: product?.description || "Check out this product",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: "info",
        title: "Link Copied",
        message: "The product link has been copied to your clipboard.",
      });
    }
  };

  const handleReviewSubmitted = () => {
    setRefreshReviews((prev) => prev + 1);
    if (product) {
      setTotalReviews((prev) => prev + 1);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-md sm:max-w-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
            Product Not Found
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="h-9 sm:h-10 text-xs sm:text-sm"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const displayProduct = {
    id: product.id.toString(),
    name: product.name || "Unknown Product",
    description: product.description || "No description available",
    price: product.base_price || 0,
    images: product.image_url
      ? [product.image_url]
      : ["/placeholder.svg?key=robotics-chip"],
    category: product.category || "Unknown",
    type: product.type || "Unknown",
    inStock: (product.stock_quantity || 0) > 0,
    stockQuantity: product.stock_quantity || 0,
    minOrderQty: product.min_order_qty || 1,
    gstRate: product.gst_rate || 0,
    rating: product.average_rating || 0,
    ratingCount: totalReviews,
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${totalReviews})` },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
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
            <span className="text-foreground font-medium">
              {displayProduct.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 md:mb-8 hover:bg-accent/10 h-8 sm:h-9 text-xs sm:text-sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Product images section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30 industrial-border">
              <img
                src={displayProduct.images[selectedImage] || "/placeholder.svg"}
                alt={displayProduct.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {!displayProduct.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge
                    variant="destructive"
                    className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex space-x-2 sm:space-x-3 overflow-x-auto">
              {displayProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-accent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${displayProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {displayProduct.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs sm:text-sm text-primary border-primary"
                >
                  {displayProduct.category}
                </Badge>
                {displayProduct.inStock ? (
                  <Badge
                    variant="outline"
                    className="text-xs sm:text-sm text-green-600 border-green-600"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-1 sm:mr-2"></div>
                    In Stock ({displayProduct.stockQuantity})
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs sm:text-sm">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                {displayProduct.name}
              </h1>

              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <StarRating
                  rating={displayProduct.rating ?? 0}
                  size="h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {displayProduct.rating.toFixed(1)} (
                  {displayProduct.ratingCount} reviews)
                </span>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                {displayProduct.description}
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 sm:p-6">
              <div className="flex items-baseline space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {CURRENCY.SYMBOL}
                  {displayProduct.price.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  + {displayProduct.gstRate}% GST
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Minimum order quantity: {displayProduct.minOrderQty} pieces
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-2 sm:p-2.5 hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>

                  <Input
                    type="text"
                    value={customQuantityInput}
                    onChange={handleCustomQuantityChange}
                    onBlur={handleInputBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleInputBlur();
                      }
                    }}
                    className="w-16 sm:w-20 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= displayProduct.stockQuantity}
                    className="p-2 sm:p-2.5 hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  pieces
                </span>
              </div>

              <div className="flex space-x-2 sm:space-x-3">
                <Button
                  size="lg"
                  className="flex-1 h-9 sm:h-10 text-xs sm:text-sm animate-glow cursor-pointer"
                  onClick={handleAddToCart}
                  disabled={!displayProduct.inStock}
                >
                  <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={`h-9 sm:h-10 w-9 sm:w-10 ${
                    isInWishlist ? "text-red-500 border-red-500" : ""
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isInWishlist ? "fill-current" : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="h-9 sm:h-10 w-9 sm:w-10 bg-transparent"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-muted/30"
                >
                  <badge.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <div>
                    <div className="font-medium text-xs sm:text-sm">
                      {badge.text}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {badge.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          {/* Desktop Tabs */}
          <div className="hidden md:block border-b">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-3 border-b-2 cursor-pointer font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
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

          {/* Mobile Accordion */}
          <div className="md:hidden space-y-4 mt-6">
            {tabs.map((tab) => (
              <div key={tab.id} className="border-b pb-4">
                <button
                  onClick={() =>
                    setActiveTab(activeTab === tab.id ? "" : tab.id)
                  }
                  className="flex justify-between items-center w-full text-left font-medium text-sm cursor-pointer"
                >
                  {tab.label}
                  <span>{activeTab === tab.id ? "−" : "+"}</span>
                </button>
                {activeTab === tab.id && (
                  <div className="mt-4">
                    {tab.id === "description" && (
                      <DescriptionTab displayProduct={displayProduct} />
                    )}
                    {tab.id === "specifications" && (
                      <SpecificationsTab
                        displayProduct={displayProduct}
                        product={product}
                      />
                    )}
                    {tab.id === "reviews" && (
                      <ReviewsTab
                        productId={product.id}
                        refreshReviews={refreshReviews}
                        handleReviewSubmitted={handleReviewSubmitted}
                      />
                    )}
                    {tab.id === "shipping" && <ShippingTab />}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Tab Content */}
          <div className="hidden md:block py-6 sm:py-8 md:py-12">
            {activeTab === "description" && (
              <DescriptionTab displayProduct={displayProduct} />
            )}
            {activeTab === "specifications" && (
              <SpecificationsTab
                displayProduct={displayProduct}
                product={product}
              />
            )}
            {activeTab === "reviews" && (
              <ReviewsTab
                productId={product.id}
                refreshReviews={refreshReviews}
                handleReviewSubmitted={handleReviewSubmitted}
              />
            )}
            {activeTab === "shipping" && <ShippingTab />}
          </div>
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
