import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

export const createCheckoutSessionSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;
