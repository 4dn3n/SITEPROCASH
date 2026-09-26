import { useMemo } from "react";
import { getProduct, queryProducts } from "@/lib/productQuery";
import type { ProductListParams } from "@/types/product";

// Reads from local seed data (frontend/data/products.ts) instead of the backend API —
// the site is being served standalone for now, no live database.
export function useProducts(params: ProductListParams) {
  return useMemo(() => queryProducts(params), [
    params.page,
    params.limit,
    params.categories?.join(","),
    params.restaurantCategory,
    params.brand,
    params.minPrice,
    params.maxPrice,
    params.search,
    params.sort,
  ]);
}

export function useProduct(id: string) {
  return useMemo(() => getProduct(id), [id]);
}
