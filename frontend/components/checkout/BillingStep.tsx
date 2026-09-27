"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { billingFormSchema, type BillingFormValues, type AddressFormValues } from "@/lib/validations/checkout";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-primary/60">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function BillingStep({
  shipping,
  defaultValues,
  onNext,
  onBack,
}: {
  shipping: AddressFormValues;
  defaultValues?: Partial<BillingFormValues>;
  onNext: (values: BillingFormValues) => void;
  onBack: () => void;
}) {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
  });

  function submit(values: BillingFormValues) {
    onNext(values);
  }

  function handleFormSubmit(e: React.FormEvent) {
    if (sameAsShipping) {
      e.preventDefault();
      const { email: _email, ...rest } = shipping;
      onNext(rest);
      return;
    }
    void handleSubmit(submit)(e);
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      <h2 className="font-display text-2xl font-semibold">Facturation</h2>

      <label className="flex items-center gap-3 text-sm">
        <Checkbox checked={sameAsShipping} onCheckedChange={(v) => setSameAsShipping(v === true)} />
        Adresse de facturation identique à l&apos;adresse de livraison
      </label>

      {!sameAsShipping && (
        <div className="space-y-5">
          <Field label="Nom complet" error={errors.fullName?.message}>
            <Input autoComplete="name" {...register("fullName")} />
          </Field>
          <Field label="Adresse" error={errors.address?.message}>
            <Input autoComplete="street-address" {...register("address")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ville" error={errors.city?.message}>
              <Input autoComplete="address-level2" {...register("city")} />
            </Field>
            <Field label="Code postal" error={errors.postalCode?.message}>
              <Input autoComplete="postal-code" {...register("postalCode")} />
            </Field>
          </div>
          <Field label="Pays" error={errors.country?.message}>
            <Input autoComplete="country-name" {...register("country")} />
          </Field>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit" variant="accent" size="lg" className="flex-1">
          Continuer vers le paiement
        </Button>
      </div>
    </form>
  );
}
