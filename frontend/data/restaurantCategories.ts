import {
  Beef,
  Building2,
  ChefHat,
  Coffee,
  Cookie,
  Croissant,
  Pizza,
  Sandwich,
  type LucideIcon,
} from "lucide-react";

export interface RestaurantCategory {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
}

export const RESTAURANT_CATEGORIES: RestaurantCategory[] = [
  {
    slug: "pizzeria",
    name: "Pizzeria",
    tagline: "Fours, préparation et froid dédiés à la pizza",
    icon: Pizza,
  },
  {
    slug: "fast-food",
    name: "Fast Food",
    tagline: "Cuisson rapide et service à forte cadence",
    icon: Sandwich,
  },
  {
    slug: "bar-cafe",
    name: "Bar & Café",
    tagline: "Café, boissons et service au comptoir",
    icon: Coffee,
  },
  {
    slug: "snack",
    name: "Snack",
    tagline: "Équipements compacts pour petite restauration",
    icon: Cookie,
  },
  {
    slug: "collectivite",
    name: "Collectivité",
    tagline: "Volumes élevés pour restauration collective",
    icon: ChefHat,
  },
  {
    slug: "boucherie",
    name: "Boucherie",
    tagline: "Découpe, conservation et présentation des viandes",
    icon: Beef,
  },
  {
    slug: "patisserie",
    name: "Pâtisserie",
    tagline: "Fours, pétrissage et vitrines pâtissières",
    icon: Croissant,
  },
  {
    slug: "hotel-chaine",
    name: "Hôtel / Chaîne",
    tagline: "Équipement complet pour établissements multi-sites",
    icon: Building2,
  },
];

export function getRestaurantCategory(slug: string) {
  return RESTAURANT_CATEGORIES.find((c) => c.slug === slug);
}
