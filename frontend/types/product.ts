export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  restaurantCategories: string[];
  brand: string;
  price: number;
  dimensions: string;
  weight: number;
  image: string;
  images: string[];
  specs: Record<string, string | number | string[]>;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResult {
  items: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductDetailResult {
  product: Product;
  related: Product[];
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  categories?: string[];
  restaurantCategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "relevance" | "price_asc" | "price_desc" | "newest";
}
