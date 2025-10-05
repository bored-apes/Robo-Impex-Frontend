import { APIProduct } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { CURRENCY } from "@/data/constants";
import { StarRating } from "../shared/common/starRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function RelatedProducts({ products }: { products: APIProduct[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">
          Related Products
        </h2>
        
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: '.related-products-prev',
              nextEl: '.related-products-next',
            }}
            pagination={{
              clickable: true,
              el: '.related-products-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className} related-products-bullet"></span>`;
              },
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="related-products-swiper"
          >
            {products.map((relatedProduct) => (
              <SwiperSlide key={relatedProduct.id} className="h-auto">
                <Card className="group hover:shadow-lg transition-all duration-300 hover-lift h-full flex flex-col border-border bg-card dark:bg-card/90 hover:shadow-primary/5 overflow-hidden">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={
                        relatedProduct.image_url ||
                        "/placeholder.svg?key=robotics-chip"
                      }
                      alt={relatedProduct.name || "Product"}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-xs">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                    
                    {/* Product Type Badge */}
                    {relatedProduct.type && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                          {relatedProduct.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base mb-2 flex-1"
                    >
                      {relatedProduct.name}
                    </Link>
                    
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2 flex-shrink-0">
                      {relatedProduct.description || "No description available"}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto flex-shrink-0">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-primary">
                          {CURRENCY.SYMBOL}
                          {(relatedProduct.base_price || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          + {relatedProduct.gst_rate || 0}% GST
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-1">
                          <StarRating
                            rating={relatedProduct.average_rating ?? 0}
                            size="h-3 w-3 sm:h-4 sm:w-4"
                          />
                          <span className="text-xs text-muted-foreground ml-1">
                            {relatedProduct.average_rating?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {relatedProduct.total_ratings || 0} reviews
                        </span>
                      </div>
                    </div>
                    
                    {/* Stock Status */}
                    <div className="mt-2 flex-shrink-0">
                      {relatedProduct.stock_quantity && relatedProduct.stock_quantity > 0 ? (
                        <span className="text-xs text-green-600">
                          In Stock ({relatedProduct.stock_quantity})
                        </span>
                      ) : (
                        <span className="text-xs text-red-600">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="related-products-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 -ml-2 sm:-ml-4">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <button className="related-products-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 dark:bg-background/95 backdrop-blur-sm border border-border hover:border-primary hover:text-primary transition-all duration-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 -mr-2 sm:-mr-4">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Pagination */}
          <div className="related-products-pagination mt-6 sm:mt-8"></div>
        </div>
      </div>

      <style jsx global>{`
        .related-products-bullet {
          width: 6px;
          height: 6px;
          background: hsl(var(--muted-foreground));
          opacity: 0.3;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active.related-products-bullet {
          background: hsl(var(--primary));
          opacity: 1;
          transform: scale(1.2);
        }

        .related-products-bullet:hover {
          opacity: 0.7;
          transform: scale(1.1);
        }

        .dark .related-products-bullet {
          background: hsl(var(--muted-foreground));
        }

        .dark .swiper-pagination-bullet-active.related-products-bullet {
          background: hsl(var(--primary));
        }

        /* Ensure all cards have same height */
        .related-products-swiper .swiper-slide {
          height: auto;
        }

        /* Swiper navigation button styles */
        .related-products-prev.swiper-button-disabled,
        .related-products-next.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }

        /* Responsive line clamp */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Hover lift effect */
        .hover-lift {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}