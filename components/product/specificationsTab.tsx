import { APIProduct } from "@/types/products";

export function SpecificationsTab({ displayProduct, product }: { displayProduct: any; product: APIProduct }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">Product Type</span>
        <span className="text-muted-foreground">{displayProduct.type}</span>
      </div>
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">Category</span>
        <span className="text-muted-foreground">
          {displayProduct.category}
        </span>
      </div>
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">Stock Quantity</span>
        <span className="text-muted-foreground">
          {displayProduct.stockQuantity} units
        </span>
      </div>
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">Minimum Order</span>
        <span className="text-muted-foreground">
          {displayProduct.minOrderQty} pieces
        </span>
      </div>
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">GST Rate</span>
        <span className="text-muted-foreground">
          {displayProduct.gstRate}%
        </span>
      </div>
      <div className="flex justify-between py-2 sm:py-3 border-b text-xs sm:text-sm">
        <span className="font-medium">Status</span>
        <span className="text-muted-foreground">{product.status}</span>
      </div>
    </div>
  );
}