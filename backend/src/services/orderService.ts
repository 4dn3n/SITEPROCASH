import { prisma } from "../lib/prisma.js";
import { sendOrderConfirmationEmail } from "./emailService.js";

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

export async function markOrderPaidByPaymentIntent(paymentIntentId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: paymentIntentId },
    include: { items: true },
  });
  if (!order) return null;

  const updated = await prisma.order.update({ where: { id: order.id }, data: { status: "paid" } });

  await sendOrderConfirmationEmail({
    customerEmail: order.customerEmail,
    customerName: order.customerName,
    orderNumber: order.orderNumber,
    totalAmount: order.totalAmount,
    items: order.items.map((i) => ({ productName: i.productName, quantity: i.quantity, price: i.price })),
  });

  return updated;
}

export async function markOrderFailedByPaymentIntent(paymentIntentId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: paymentIntentId },
  });
  if (!order) return null;

  return prisma.order.update({ where: { id: order.id }, data: { status: "failed" } });
}
