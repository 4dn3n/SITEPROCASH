"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShippingStep } from "./ShippingStep";
import { BillingStep } from "./BillingStep";
import { PaymentStep } from "./PaymentStep";
import type { AddressFormValues, BillingFormValues } from "@/lib/validations/checkout";

type Step = "shipping" | "billing" | "payment";

const STEPS: { key: Step; label: string }[] = [
  { key: "shipping", label: "Livraison" },
  { key: "billing", label: "Facturation" },
  { key: "payment", label: "Paiement" },
];

export function CheckoutForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<AddressFormValues>();
  const [billing, setBilling] = useState<BillingFormValues>();

  const currentIndex = STEPS.findIndex((s) => s.key === step);

  function handleSuccess(orderId: string, orderNumber: string) {
    router.push(`/success?order=${orderId}&orderNumber=${encodeURIComponent(orderNumber)}`);
  }

  return (
    <div>
      <ol className="mb-10 flex items-center gap-3 text-sm">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex items-center gap-3">
            {i > 0 && <span className="h-px w-8 bg-border" />}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  i < currentIndex
                    ? "border-accent bg-accent text-primary"
                    : i === currentIndex
                      ? "border-accent text-accent"
                      : "border-border text-primary/40",
                )}
              >
                {i < currentIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={i === currentIndex ? "font-medium text-primary" : "text-primary/50"}>
                {s.label}
              </span>
            </div>
          </li>
        ))}
      </ol>

      {step === "shipping" && (
        <ShippingStep
          defaultValues={shipping}
          onNext={(values) => {
            setShipping(values);
            setStep("billing");
          }}
        />
      )}

      {step === "billing" && shipping && (
        <BillingStep
          shipping={shipping}
          defaultValues={billing}
          onNext={(values) => {
            setBilling(values);
            setStep("payment");
          }}
          onBack={() => setStep("shipping")}
        />
      )}

      {step === "payment" && shipping && billing && (
        <PaymentStep
          shipping={shipping}
          billing={billing}
          onBack={() => setStep("billing")}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
