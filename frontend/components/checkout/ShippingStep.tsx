"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addressFormSchema, type AddressFormValues } from "@/lib/validations/checkout";

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

export function ShippingStep({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<AddressFormValues>;
  onNext: (values: AddressFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <h2 className="font-display text-2xl font-semibold">Livraison</h2>

      <Field label="Email" error={errors.email?.message}>
        <Input type="email" autoComplete="email" {...register("email")} />
      </Field>
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

      <Button type="submit" variant="accent" size="lg" className="w-full">
        Continuer vers la facturation
      </Button>
    </form>
  );
}
