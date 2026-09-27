import { getStripe } from "../lib/stripe.js";

export async function createPaymentIntent(params: {
  amountCents: number;
  currency: string;
  receiptEmail: string;
  metadata: Record<string, string>;
}) {
  return getStripe().paymentIntents.create({
    amount: params.amountCents,
    currency: params.currency,
    automatic_payment_methods: { enabled: true },
    receipt_email: params.receiptEmail,
    metadata: params.metadata,
  });
}

export function constructWebhookEvent(payload: Buffer, signature: string) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return getStripe().webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
}
