import {
  Archive,
  Droplet,
  Flame,
  Snowflake,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/**
 * No product photography — every product/category visual is a generated graphic tile
 * (gradient + icon) instead of a stock photo. Class strings must stay as literal, complete
 * strings (not built via template interpolation) so Tailwind's content scan can find them —
 * see tailwind.config.ts content globs, which include this file.
 */

export const EQUIPMENT_TILES: Record<string, { icon: LucideIcon; gradient: string }> = {
  Cuisson: { icon: Flame, gradient: "bg-gradient-to-br from-[#9a3412] to-[#f97316]" },
  Froid: { icon: Snowflake, gradient: "bg-gradient-to-br from-[#0c4a6e] to-[#38bdf8]" },
  Stockage: { icon: Archive, gradient: "bg-gradient-to-br from-[#334155] to-[#64748b]" },
  Préparation: { icon: UtensilsCrossed, gradient: "bg-gradient-to-br from-[#065f46] to-[#10b981]" },
  Nettoyage: { icon: Droplet, gradient: "bg-gradient-to-br from-[#155e75] to-[#22d3ee]" },
};

export const RESTAURANT_CATEGORY_GRADIENTS: Record<string, string> = {
  pizzeria: "bg-gradient-to-br from-[#c2410c] to-[#ea580c]",
  "fast-food": "bg-gradient-to-br from-[#b45309] to-[#f59e0b]",
  "bar-cafe": "bg-gradient-to-br from-[#3f2d23] to-[#6f4e37]",
  snack: "bg-gradient-to-br from-[#854d0e] to-[#ca8a04]",
  collectivite: "bg-gradient-to-br from-[#1e293b] to-[#475569]",
  boucherie: "bg-gradient-to-br from-[#500724] to-[#9f1239]",
  patisserie: "bg-gradient-to-br from-[#9d174d] to-[#ec4899]",
  "hotel-chaine": "bg-gradient-to-br from-[#18181b] to-[#3f3f46]",
};

const DEFAULT_TILE = { icon: UtensilsCrossed, gradient: "bg-gradient-to-br from-primary to-primary/70" };

export function getEquipmentTile(category: string) {
  return EQUIPMENT_TILES[category] ?? DEFAULT_TILE;
}

export function getRestaurantCategoryGradient(slug: string) {
  return RESTAURANT_CATEGORY_GRADIENTS[slug] ?? DEFAULT_TILE.gradient;
}
