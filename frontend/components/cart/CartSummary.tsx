"use client";

import { useCartStore } from "@/store/cartStore";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const FREE_SHIPPING_THRESHOLD = 1000;
const FLAT_SHIPPING = 49;
const TAX_RATE = 0.2;

export function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = subtotal > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING) : 0;
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + shipping + taxes;

  return (
    <div className="sticky top-24 space-y-4 border border-border p-6">
      <h2 className="font-display text-xl font-semibold">Résumé</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-primary/60">Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-primary/60">Livraison</span>
          <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-primary/60">TVA (20%)</span>
          <span>{formatPrice(taxes)}</span>
        </div>
      </div>
      <div className="flex justify-between border-t border-border pt-4 text-base font-semibold">
        <span>Total</span>
        <span className="text-accent">{formatPrice(total)}</span>
      </div>
      {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
        <p className="text-xs text-primary/50">
          Ajoutez {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} pour la livraison offerte.
        </p>
      )}
    </div>
  );
}
