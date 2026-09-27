"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import { SpecsTable } from "@/components/product-detail/SpecsTable";
import { QuantitySelector } from "@/components/product-detail/QuantitySelector";
import { ShareButtons } from "@/components/product-detail/ShareButtons";
import { RelatedProducts } from "@/components/product-detail/RelatedProducts";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const result = useProduct(params.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (!result) {
    notFound();
  }

  const { product, related } = result;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-primary/50">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">{product.name}</h1>
          </div>

          <p className="font-display text-2xl font-semibold text-accent">
            {formatPrice(product.price)}
          </p>

          <p className="text-primary/70">{product.description}</p>

          <SpecsTable product={product} />

          <div className="flex items-center gap-4">
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
            <Button
              variant="accent"
              size="lg"
              className="flex-1"
              onClick={() => addItem(product, quantity)}
            >
              Ajouter au panier
            </Button>
          </div>

          <p className="text-xs text-primary/50">
            {product.stock > 0 ? `${product.stock} en stock` : "Rupture de stock"}
          </p>

          <ShareButtons productName={product.name} />
        </div>
      </div>

      <RelatedProducts products={related} />
    </main>
  );
}
