"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function CartTriggerButton() {
  const toggle = useCartStore((s) => s.toggle);
  const count = useCartStore((s) => s.itemCount());

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Panier, ${count} article${count === 1 ? "" : "s"}`}
      className="relative flex items-center justify-center rounded-sm p-2 transition-colors hover:text-accent"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-primary">
          {count}
        </span>
      )}
    </button>
  );
}
