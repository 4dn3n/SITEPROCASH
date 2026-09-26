import { PRODUCTS } from "@/data/products";
import type {
  Product,
  ProductDetailResult,
  ProductListParams,
  ProductListResult,
} from "@/types/product";

export function queryProducts(params: ProductListParams): ProductListResult {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const sort = params.sort ?? "relevance";

  let items = PRODUCTS.filter((p) => {
    if (params.categories && params.categories.length > 0 && !params.categories.includes(p.category))
      return false;
    if (params.restaurantCategory && !p.restaurantCategories.includes(params.restaurantCategory))
      return false;
    if (params.brand && p.brand !== params.brand) return false;
    if (params.minPrice !== undefined && p.price < params.minPrice) return false;
    if (params.maxPrice !== undefined && p.price > params.maxPrice) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      const haystack = `${p.name} ${p.description} ${p.brand}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  items = [...items].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const total = items.length;
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);

  return {
    items: pageItems,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function getProduct(id: string): ProductDetailResult | null {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return null;

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  return { product, related };
}

export function getFeaturedProducts(count = 5): Product[] {
  return PRODUCTS.slice(0, count);
}
