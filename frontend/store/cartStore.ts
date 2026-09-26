import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  lines: CartLine[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      lines: [],
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product, quantity = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.product.id === product.id);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.product.id === product.id
                  ? { ...l, quantity: l.quantity + quantity }
                  : l,
              ),
              isOpen: true,
            };
          }
          return { lines: [...s.lines, { product, quantity }], isOpen: true };
        }),
      updateQuantity: (productId, quantity) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.product.id === productId ? { ...l, quantity } : l))
            .filter((l) => l.quantity > 0),
        })),
      removeItem: (productId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.product.id !== productId) })),
      clear: () => set({ lines: [] }),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.quantity * l.product.price, 0),
    }),
    {
      name: "cart-storage",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);
