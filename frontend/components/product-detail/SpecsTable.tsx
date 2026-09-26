import type { Product } from "@/types/product";

const LABELS: Record<string, string> = {
  dimensions: "Dimensions",
  weight: "Poids",
  brand: "Marque",
};

function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export function SpecsTable({ product }: { product: Product }) {
  const rows: [string, string][] = [
    [LABELS.dimensions, product.dimensions],
    [LABELS.weight, `${product.weight} kg`],
    [LABELS.brand, product.brand],
    ...Object.entries(product.specs).map(
      ([key, value]) => [formatKey(key), Array.isArray(value) ? value.join(", ") : String(value)] as [string, string],
    ),
  ];

  return (
    <dl className="divide-y divide-border border-y border-border text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between py-3">
          <dt className="text-primary/50">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
