import { prisma } from "../lib/prisma.js";
import { createPaymentIntent } from "./stripeService.js";
import type { CreateCheckoutSessionInput } from "../schemas/checkout.schema.js";

const TAX_RATE = 0.2;
const FREE_SHIPPING_THRESHOLD = 1000;
const FLAT_SHIPPING = 49;

function computeTotals(subtotal: number) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const taxes = Math.round(subtotal * TAX_RATE * 100) / 100;
  const totalAmount = Math.round((subtotal + shipping + taxes) * 100) / 100;
  return { shipping, taxes, totalAmount };
}

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const suffix = Date.now().toString().slice(-6);
  return `CMD-${year}-${suffix}`;
}

/**
 * Structural note: the frontend cart is client-side only (Zustand + localStorage, no server
 * Cart table in use — see frontend/store/cartStore.ts), so checkout receives the cart lines
 * directly in the request body instead of resolving a server-side cart by session. Totals are
 * computed from the client-supplied prices; OrderItem stores a productId/productName snapshot
 * rather than a foreign key to Product (see schema.prisma), since the frontend's local product
 * catalog and the backend's seeded one aren't guaranteed to share IDs.
 */
export async function createCheckoutSession(
  sessionId: string,
  input: CreateCheckoutSessionInput,
) {
  const subtotal = input.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const { shipping, taxes, totalAmount } = computeTotals(subtotal);
  const orderNumber = generateOrderNumber();

  const paymentIntent = await createPaymentIntent({
    amountCents: Math.round(totalAmount * 100),
    currency: "eur",
    receiptEmail: input.customerEmail,
    metadata: { orderNumber },
  });

  const order = await prisma.order.create({
    data: {
      orderNumber,
      sessionId,
      customerEmail: input.customerEmail,
      customerName: input.customerName,
      shippingAddress: input.shippingAddress,
      billingAddress: input.billingAddress,
      subtotal,
      shipping,
      taxes,
      totalAmount,
      status: "pending",
      stripeSessionId: paymentIntent.id,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    orderId: order.id,
    orderNumber: order.orderNumber,
    totalAmount,
  };
}
