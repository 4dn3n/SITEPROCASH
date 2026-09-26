import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="accent-bar font-display text-2xl font-semibold">Produits associés</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
