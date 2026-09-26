"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CartTable } from "@/components/cart/CartTable";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="accent-bar font-display text-4xl font-semibold">Votre panier</h1>

      {lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 py-24 text-center">
          <p className="text-lg text-primary/60">Votre panier est vide.</p>
          <Button variant="accent" size="lg" asChild>
            <Link href="/products">Découvrir le catalogue</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <div className="overflow-x-auto">
            <CartTable />
          </div>
          <CartSummary />
        </div>
      )}
    </main>
  );
}
