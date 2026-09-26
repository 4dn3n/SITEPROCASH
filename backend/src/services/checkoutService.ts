import { prisma } from "../lib/prisma.js";
import { stripe } from "../lib/stripe.js";
import { ApiError } from "../middleware/errorHandler.js";
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

export async function createCheckoutSession(
  sessionId: string,
  input: CreateCheckoutSessionInput,
) {
  const cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Le panier est vide");
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
  const { shipping, taxes, totalAmount } = computeTotals(subtotal);
  const orderNumber = generateOrderNumber();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: "eur",
    automatic_payment_methods: { enabled: true },
    receipt_email: input.customerEmail,
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
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
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
