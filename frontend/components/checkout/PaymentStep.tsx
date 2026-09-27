"use client";

import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch, ApiError } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";
import type { AddressFormValues, BillingFormValues } from "@/lib/validations/checkout";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: "var(--font-body), sans-serif",
      color: "#1a1a1a",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#dc2626" },
  },
};

interface CheckoutSessionResponse {
  clientSecret: string;
  orderId: string;
  orderNumber: string;
  totalAmount: number;
}

export function PaymentStep({
  shipping,
  billing,
  onBack,
  onSuccess,
}: {
  shipping: AddressFormValues;
  billing: BillingFormValues;
  onBack: () => void;
  onSuccess: (orderId: string, orderNumber: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const lines = useCartStore((s) => s.lines);
  const clearCart = useCartStore((s) => s.clear);

  const [cardholderName, setCardholderName] = useState(shipping.fullName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsProcessing(true);
    setError(null);

    try {
      const session = await apiFetch<CheckoutSessionResponse>("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          items: lines.map((line) => ({
            productId: line.product.id,
            name: line.product.name,
            price: line.product.price,
            quantity: line.quantity,
          })),
          customerEmail: shipping.email,
          customerName: shipping.fullName,
          shippingAddress: {
            fullName: shipping.fullName,
            address: shipping.address,
            city: shipping.city,
            postalCode: shipping.postalCode,
            country: shipping.country,
          },
          billingAddress: billing,
        }),
      });

      const result = await stripe.confirmCardPayment(session.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardholderName, email: shipping.email },
        },
      });

      if (result.error) {
        setError(result.error.message ?? "Le paiement a été refusé. Veuillez réessayer.");
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        clearCart();
        onSuccess(session.orderId, session.orderNumber);
        return;
      }

      setError("Le paiement n'a pas pu être confirmé. Veuillez réessayer.");
      setIsProcessing(false);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Impossible de contacter le serveur de paiement. Vérifiez votre connexion et réessayez.",
      );
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <h2 className="font-display text-2xl font-semibold">Paiement</h2>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-primary/60">
          Nom du titulaire de la carte
        </span>
        <Input
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      </label>

      <div>
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-primary/60">
          Carte bancaire
        </span>
        <div className="rounded-full border-2 border-border bg-white px-4 py-3.5">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onBack}
          disabled={isProcessing}
        >
          Retour
        </Button>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="flex-1"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Traitement en cours..." : "Payer maintenant"}
        </Button>
      </div>
    </form>
  );
}
