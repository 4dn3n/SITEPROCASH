"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { useCartStore } from "@/store/cartStore";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const stripePromise = useMemo(() => getStripe(), []);

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Votre panier est vide</h1>
        <p className="text-primary/60">Ajoutez des équipements avant de passer commande.</p>
        <Button variant="accent" size="lg" asChild>
          <Link href="/products">Découvrir le catalogue</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="accent-bar font-display text-4xl font-semibold">Commande</h1>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
