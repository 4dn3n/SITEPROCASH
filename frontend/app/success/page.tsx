"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  status: string;
  subtotal: number;
  shipping: number;
  taxes: number;
  totalAmount: number;
  items: OrderItem[];
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const fallbackOrderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<Order | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    apiFetch<Order>(`/api/orders/${orderId}`)
      .then(setOrder)
      .catch(() => setLoadError(true));
  }, [orderId]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 py-24 text-center">
      <CheckCircle2 className="h-16 w-16 text-accent" strokeWidth={1.5} />

      <div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Commande confirmée</h1>
        {(order?.orderNumber ?? fallbackOrderNumber) && (
          <p className="mt-3 text-primary/60">
            Numéro de commande{" "}
            <span className="font-medium text-primary">
              {order?.orderNumber ?? fallbackOrderNumber}
            </span>
          </p>
        )}
      </div>

      {order ? (
        <div className="w-full space-y-4 rounded-2xl border-2 border-border bg-white p-6 text-left">
          <ul className="space-y-2 border-b border-border pb-4 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span className="text-primary/70">
                  {item.productName} <span className="text-primary/40">&times;{item.quantity}</span>
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm text-primary/60">
            <span>Livraison</span>
            <span>{order.shipping === 0 ? "Offerte" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm text-primary/60">
            <span>TVA</span>
            <span>{formatPrice(order.taxes)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span className="text-accent">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      ) : loadError ? (
        <p className="text-sm text-primary/50">
          Le paiement a bien été confirmé — le détail de la commande n&apos;a pas pu être rechargé,
          mais vous recevrez un email de confirmation.
        </p>
      ) : (
        <p className="text-sm text-primary/50">Chargement du récapitulatif…</p>
      )}

      <p className="text-sm text-primary/60">
        {order?.customerEmail
          ? `Un email de confirmation a été envoyé à ${order.customerEmail}.`
          : "Un email de confirmation vous sera envoyé."}
      </p>

      <Button variant="accent" size="lg" asChild>
        <Link href="/products">Retourner au catalogue</Link>
      </Button>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
