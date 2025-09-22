export function DescriptionTab({ displayProduct }: { displayProduct: any }) {
  return (
    <div className="prose max-w-none">
      <p className="text-sm sm:text-base md:text-lg leading-relaxed">
        {displayProduct.description}
      </p>
      <div className="mt-4 sm:mt-6 grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
            Product Details
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
            <li>• Type: {displayProduct.type}</li>
            <li>• Category: {displayProduct.category}</li>
            <li>• Stock: {displayProduct.stockQuantity} units</li>
            <li>• Min Order: {displayProduct.minOrderQty} pieces</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
            Pricing
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
            <li>• Base Price: ₹{displayProduct.price.toLocaleString()}</li>
            <li>• GST Rate: {displayProduct.gstRate}%</li>
            <li>
              • Total Price: ₹
              {(
                displayProduct.price *
                (1 + displayProduct.gstRate / 100)
              ).toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
