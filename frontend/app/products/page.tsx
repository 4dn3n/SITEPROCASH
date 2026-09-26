import { Suspense } from "react";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}
