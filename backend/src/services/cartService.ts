import { prisma } from "../lib/prisma.js";
import { ApiError } from "../middleware/errorHandler.js";

async function findOrCreateCart(sessionId: string) {
  return prisma.cart.upsert({
    where: { sessionId },
    create: { sessionId },
    update: {},
  });
}

export async function getCart(sessionId: string) {
  const cart = await findOrCreateCart(sessionId);
  return prisma.cart.findUniqueOrThrow({
    where: { id: cart.id },
    include: { items: { include: { product: true }, orderBy: { createdAt: "asc" } } },
  });
}

export async function addItem(sessionId: string, productId: string, quantity: number) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, "Product not found");

  const cart = await findOrCreateCart(sessionId);

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    create: { cartId: cart.id, productId, quantity },
    update: { quantity: { increment: quantity } },
  });

  return getCart(sessionId);
}

export async function updateItem(sessionId: string, itemId: string, quantity: number) {
  const cart = await findOrCreateCart(sessionId);
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.cartId !== cart.id) throw new ApiError(404, "Cart item not found");

  await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  return getCart(sessionId);
}

export async function removeItem(sessionId: string, itemId: string) {
  const cart = await findOrCreateCart(sessionId);
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.cartId !== cart.id) throw new ApiError(404, "Cart item not found");

  await prisma.cartItem.delete({ where: { id: itemId } });
  return getCart(sessionId);
}
