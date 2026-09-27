"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { getRestaurantCategory } from "@/data/restaurantCategories";
import { SearchBar } from "@/components/products/SearchBar";
import { ProductSort } from "@/components/products/ProductSort";
import {
  ProductFilters,
  DEFAULT_FILTERS,
  type FiltersValue,
} from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { RestaurantCategoryGrid } from "@/components/products/RestaurantCategoryGrid";
import { Breadcrumb } from "@/components/products/Breadcrumb";
import { Button } from "@/components/ui/button";
import type { ProductListParams } from "@/types/product";

const PAGE_SIZE = 20;

export function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rc = searchParams.get("rc") ?? "";
  const category = rc ? getRestaurantCategory(rc) : undefined;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<NonNullable<ProductListParams["sort"]>>("relevance");
  const [filters, setFilters] = useState<FiltersValue>(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const showResults = Boolean(category) || search.trim().length > 0;

  const params: ProductListParams = useMemo(
    () => ({
      search: search || undefined,
      sort,
      restaurantCategory: category?.slug,
      brand: filters.brand || undefined,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      page: 1,
      limit: visibleCount,
    }),
    [search, sort, category, filters, visibleCount],
  );

  const result = useProducts(params);

  function updateFilters(next: FiltersValue) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  }

  function updateSearch(value: string) {
    setSearch(value);
    setVisibleCount(PAGE_SIZE);
  }

  function resetToCategories() {
    setSearch("");
    router.push("/products");
  }

  const heading = category
    ? `Équipements pour ${category.name}`
    : search
      ? `Résultats pour « ${search} »`
      : "Équipements par Type de Restaurant";

  return (
    <main>
      <section className="relative flex min-h-[38vh] items-end overflow-hidden bg-primary px-6 py-12 sm:px-12">
        <Image
          src="/images/background-image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {!showResults ? (
            <>
              <h1 className="accent-bar font-display text-4xl font-semibold text-text-dark sm:text-5xl">
                {heading}
              </h1>
              <p className="mt-6 max-w-2xl text-text-dark/70">
                Trouvez les solutions adaptées à votre concept.
              </p>
            </>
          ) : (
            <Breadcrumb
              variant="dark"
              items={[
                { label: "Accueil", href: "/" },
                { label: "Catalogue", onClick: resetToCategories },
                ...(category ? [{ label: category.name }] : [{ label: `« ${search} »` }]),
              ]}
            />
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="sticky top-[73px] z-30 -mx-6 border-y border-border/60 bg-bg-light/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 sm:max-w-sm">
            <SearchBar value={search} onChange={updateSearch} />
          </div>
          {showResults && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setFiltersOpen((v) => !v)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
              </Button>
              <ProductSort value={sort} onChange={setSort} />
            </div>
          )}
        </div>
      </div>

      {!showResults ? (
        <div className="mt-12">
          <RestaurantCategoryGrid />
        </div>
      ) : (
        <>
          <h2 className="accent-bar mt-10 font-display text-3xl font-semibold">{heading}</h2>
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
            <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
              <ProductFilters
                value={filters}
                onChange={updateFilters}
                showCategoryFilter={!category}
              />
            </aside>

            <div>
              <p className="mb-6 text-sm text-primary/50">
                {result.total} équipement{result.total === 1 ? "" : "s"}
              </p>
              <ProductGrid products={result.items} />

              {result.items.length < result.total && (
                <div className="mt-12 flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    Charger plus
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      </div>
    </main>
  );
}
