export function ShippingTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
          Shipping Information
        </h3>
        <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
          <li>• Free shipping on orders over ₹50,000</li>
          <li>• Standard delivery: 7-15 business days</li>
          <li>• Express delivery: 3-7 business days</li>
          <li>• Installation support available</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
          Returns & Warranty
        </h3>
        <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-xs sm:text-sm">
          <li>• 1 Year manufacturer warranty</li>
          <li>• 30-day return policy</li>
          <li>• Technical support included</li>
          <li>• Spare parts availability guaranteed</li>
        </ul>
      </div>
    </div>
  );
}