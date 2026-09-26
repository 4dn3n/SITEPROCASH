"use client";

import { CATEGORIES, BRANDS } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FiltersValue {
  categories: string[];
  brand: string;
  priceRange: [number, number];
}

const MIN_PRICE = 0;
const MAX_PRICE = 6000;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function ProductFilters({
  value,
  onChange,
  showCategoryFilter = true,
}: {
  value: FiltersValue;
  onChange: (value: FiltersValue) => void;
  /** Hidden when browsing inside a restaurant-type category — only brand/price remain. */
  showCategoryFilter?: boolean;
}) {
  function toggleCategory(category: string) {
    const next = value.categories.includes(category)
      ? value.categories.filter((c) => c !== category)
      : [...value.categories, category];
    onChange({ ...value, categories: next });
  }

  return (
    <div className="space-y-8">
      {showCategoryFilter && (
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary/50">
            Catégorie
          </h3>
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={value.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary/50">
          Marque
        </h3>
        <Select
          value={value.brand || "all"}
          onValueChange={(brand) => onChange({ ...value, brand: brand === "all" ? "" : brand })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Toutes les marques" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les marques</SelectItem>
            {BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-primary/50">
          Prix
        </h3>
        <Slider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={50}
          value={value.priceRange}
          onValueChange={(range) => onChange({ ...value, priceRange: range as [number, number] })}
        />
        <div className="mt-3 flex justify-between text-xs text-primary/60">
          <span>{formatPrice(value.priceRange[0])}</span>
          <span>{formatPrice(value.priceRange[1])}{value.priceRange[1] >= MAX_PRICE ? "+" : ""}</span>
        </div>
      </div>
    </div>
  );
}

export const DEFAULT_FILTERS: FiltersValue = {
  categories: [],
  brand: "",
  priceRange: [MIN_PRICE, MAX_PRICE],
};
