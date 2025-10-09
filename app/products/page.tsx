// products/page.tsx
"use client";

import ProductsPageInner from "@/components/product/ProductsPageInner";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPageInner />
    </Suspense>
  );
}
