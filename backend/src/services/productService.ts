import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import type { ListProductsQuery } from "../schemas/product.schema.js";

export async function listProducts(query: ListProductsQuery) {
  const where: Prisma.ProductWhereInput = {};

  if (query.category) where.category = query.category;
  if (query.brand) where.brand = query.brand;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.price = {
      ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
      ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}),
    };
  }
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
      { brand: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    query.sort === "price_asc"
      ? { price: "asc" }
      : query.sort === "price_desc"
        ? { price: "desc" }
        : query.sort === "newest"
          ? { createdAt: "desc" }
          : { name: "asc" };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    page: query.page,
    limit: query.limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / query.limit)),
  };
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getRelatedProducts(id: string, limit = 4) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return [];

  return prisma.product.findMany({
    where: { category: product.category, id: { not: id } },
    take: limit,
  });
}
