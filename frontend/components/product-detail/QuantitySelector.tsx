"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  max = 99,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center rounded-full border-2 border-border">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-11 w-11 items-center justify-center hover:text-accent"
        aria-label="Diminuer la quantité"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 items-center justify-center hover:text-accent"
        aria-label="Augmenter la quantité"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
