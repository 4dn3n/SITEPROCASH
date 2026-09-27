import { z } from "zod";

export const addressFormSchema = z.object({
  email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
  fullName: z.string().min(1, "Le nom complet est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  postalCode: z.string().min(1, "Le code postal est requis"),
  country: z.string().min(1, "Le pays est requis"),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

// Billing reuses the same shape but doesn't need an email of its own.
export const billingFormSchema = addressFormSchema.omit({ email: true });
export type BillingFormValues = z.infer<typeof billingFormSchema>;
