import { Router, raw } from "express";
import { logger } from "../lib/logger.js";
import { constructWebhookEvent } from "../services/stripeService.js";
import { markOrderFailedByPaymentIntent, markOrderPaidByPaymentIntent } from "../services/orderService.js";
import type Stripe from "stripe";

export const webhooksRouter = Router();

// Mounted with express.raw() in app.ts (must run before the global express.json() parser) —
// Stripe's signature verification needs the exact raw request body bytes.
webhooksRouter.post("/stripe", raw({ type: "application/json" }), async (req, res) => {
  const signature = req.header("stripe-signature");
  if (!signature) {
    res.status(400).json({ error: "Missing stripe-signature header" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(req.body, signature);
  } catch (err) {
    logger.warn({ err }, "Stripe webhook signature verification failed");
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        await markOrderPaidByPaymentIntent(intent.id);
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        await markOrderFailedByPaymentIntent(intent.id);
        break;
      }
      default:
        break;
    }
    res.json({ received: true });
  } catch (err) {
    logger.error({ err, eventType: event.type }, "Failed to process Stripe webhook");
    res.status(500).json({ error: "Webhook handler failed" });
  }
});
