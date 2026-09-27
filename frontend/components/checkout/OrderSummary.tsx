"use client";

import { useCartStore } from "@/store/cartStore";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

const FREE_SHIPPING_THRESHOLD = 1000;
const FLAT_SHIPPING = 49;
const TAX_RATE = 0.2;

export function OrderSummary() {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = subtotal > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING) : 0;
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + shipping + taxes;

  return (
    <div className="space-y-6 rounded-2xl border-2 border-border bg-white p-6">
      <h2 className="font-display text-xl font-semibold">Résumé de la commande</h2>

      <ul className="space-y-3 border-b border-border pb-4 text-sm">
        {lines.map((line) => (
          <li key={line.product.id} className="flex items-start justify-between gap-4">
            <span className="text-primary/70">
              {line.product.name}{" "}
              <span className="text-primary/40">&times;{line.quantity}</span>
            </span>
            <span className="shrink-0 font-medium">
              {formatPrice(line.product.price * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

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
    </div>
  );
}
