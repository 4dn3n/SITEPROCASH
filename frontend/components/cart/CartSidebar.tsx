"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

export function CartSidebar() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : close())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-primary/60">Votre panier est vide.</p>
            <Button variant="accent" asChild>
              <Link href="/products" onClick={close}>
                Voir le catalogue
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
              {lines.map((line) => (
                <div key={line.product.id} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{line.product.name}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(line.product.id)}
                        aria-label="Retirer l'article"
                        className="text-primary/40 hover:text-accent"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-accent">{formatPrice(line.product.price)}</p>
                    <div className="mt-1 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center border border-border hover:border-accent"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center border border-border hover:border-accent"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-primary/50">Frais de livraison calculés à l&apos;étape suivante.</p>
              <Button variant="accent" size="lg" className="w-full" asChild>
                <Link href="/cart" onClick={close}>
                  Voir le panier
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
