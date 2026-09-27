"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export function CartTable() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-primary/50">
          <th className="py-3 font-medium">Produit</th>
          <th className="py-3 font-medium">Prix</th>
          <th className="py-3 font-medium">Quantité</th>
          <th className="py-3 text-right font-medium">Total</th>
          <th className="py-3" />
        </tr>
      </thead>
      <tbody>
        {lines.map((line) => (
          <tr key={line.product.id} className="border-b border-border/60">
            <td className="py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={line.product.image}
                    alt={line.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/products/${line.product.id}`}
                  className="font-medium hover:text-accent"
                >
                  {line.product.name}
                </Link>
              </div>
            </td>
            <td className="py-4 text-accent">{formatPrice(line.product.price)}</td>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center border border-border hover:border-accent"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center border border-border hover:border-accent"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </td>
            <td className="py-4 text-right font-semibold">
              {formatPrice(line.product.price * line.quantity)}
            </td>
            <td className="py-4 text-right">
              <button
                type="button"
                onClick={() => removeItem(line.product.id)}
                aria-label="Retirer l'article"
                className="text-primary/40 hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
