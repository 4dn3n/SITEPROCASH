"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductTile } from "@/components/products/ProductTile";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col">
      <Link href={`/products/${product.id}`} className="block aspect-square">
        <ProductTile
          category={product.category}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <p className="text-xs uppercase tracking-wide text-primary/50">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium leading-snug hover:text-accent">{product.name}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-primary/60">{product.description}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-accent">
            {formatPrice(product.price)}
          </span>
          <Button size="sm" variant="outline" onClick={() => addItem(product)}>
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}
