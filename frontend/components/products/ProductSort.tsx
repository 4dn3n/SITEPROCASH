"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductListParams } from "@/types/product";

const OPTIONS: { value: NonNullable<ProductListParams["sort"]>; label: string }[] = [
  { value: "relevance", label: "Pertinence" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
];

export function ProductSort({
  value,
  onChange,
}: {
  value: NonNullable<ProductListParams["sort"]>;
  onChange: (value: NonNullable<ProductListParams["sort"]>) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as typeof value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
