import Link from "next/link";
import { CartTriggerButton } from "@/components/cart/CartTriggerButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg-light/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          PROCASH
        </Link>
        <nav className="hidden gap-8 text-sm font-medium tracking-wide md:flex">
          <Link href="/products" className="hover:text-accent transition-colors">
            Catalogue
          </Link>
          <Link href="/#why-us" className="hover:text-accent transition-colors">
            Pourquoi nous
          </Link>
          <Link href="/#testimonials" className="hover:text-accent transition-colors">
            Témoignages
          </Link>
        </nav>
        <CartTriggerButton />
      </div>
    </header>
  );
}
