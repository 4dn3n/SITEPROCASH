import Stripe from "stripe";

let client: Stripe | null = null;

// Lazy-initialized so the rest of the API (products, etc.) still works before Stripe keys are
// configured — only checkout/webhook routes actually need this.
export function getStripe(): Stripe {
  if (!client) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    client = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return client;
}
