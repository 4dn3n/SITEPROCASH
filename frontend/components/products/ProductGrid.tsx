"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

export function ProductGrid({ products }: { products: Product[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-product-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 },
      );
    }, gridRef);
    return () => ctx.revert();
  }, [products]);

  if (products.length === 0) {
    return (
      <p className="py-24 text-center text-primary/50">
        Aucun équipement ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <div key={product.id} data-product-card>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
