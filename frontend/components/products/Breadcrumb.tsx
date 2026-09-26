import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-primary/50">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {item.onClick ? (
            <button type="button" onClick={item.onClick} className="hover:text-accent">
              {item.label}
            </button>
          ) : item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
