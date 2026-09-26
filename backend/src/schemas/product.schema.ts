import { z } from "zod";

export const CATEGORIES = [
  "Cuisson",
  "Froid",
  "Stockage",
  "Préparation",
  "Nettoyage",
] as const;

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.enum(CATEGORIES).optional(),
  brand: z.string().min(1).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  search: z.string().min(1).optional(),
  sort: z
    .enum(["relevance", "price_asc", "price_desc", "newest"])
    .default("relevance"),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

export const productIdParamSchema = z.object({
  id: z.string().min(1),
});
