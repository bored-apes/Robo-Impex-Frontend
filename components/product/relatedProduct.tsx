import { APIProduct } from "@/types/products";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { CURRENCY } from "@/data/constants";
import { StarRating } from "../shared/common/starRating";

export function RelatedProducts({ products }: { products: APIProduct[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {products.length > 0 && (
        <>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 md:mb-10">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {products.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="relative overflow-hidden rounded-t-lg">
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
                </div>
                <CardContent className="p-3 sm:p-4">
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="font-semibold hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base"
                  >
                    {relatedProduct.name}
                  </Link>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                    {relatedProduct.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <span className="text-base sm:text-lg font-bold text-primary">
                      {CURRENCY.SYMBOL}
                      {(relatedProduct.base_price || 0).toLocaleString()}
                    </span>
                    <div className="flex items-center mb-1 sm:mb-2">
                      <StarRating
                        rating={relatedProduct.average_rating ?? 0}
                        size="h-3 w-3 sm:h-4 sm:w-4"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">
                        {relatedProduct.average_rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
