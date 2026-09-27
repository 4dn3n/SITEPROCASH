import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

export const cartLineSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().min(1).max(99),
});

export const createCheckoutSessionSchema = z.object({
  items: z.array(cartLineSchema).min(1, "Le panier est vide"),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;
