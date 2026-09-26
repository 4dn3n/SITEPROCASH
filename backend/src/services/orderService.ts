import { prisma } from "../lib/prisma.js";

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
}

export async function markOrderPaidByPaymentIntent(paymentIntentId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: paymentIntentId },
  });
  if (!order) return null;

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: { status: "paid" },
  });

  await prisma.cart.updateMany({
    where: { sessionId: order.sessionId },
    data: {},
  });
  const cart = await prisma.cart.findUnique({ where: { sessionId: order.sessionId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  return updated;
}

export async function markOrderFailedByPaymentIntent(paymentIntentId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: paymentIntentId },
  });
  if (!order) return null;

  return prisma.order.update({ where: { id: order.id }, data: { status: "failed" } });
}
