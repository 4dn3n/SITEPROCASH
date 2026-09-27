import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function Breadcrumb({
  items,
  variant = "light",
}: {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm",
        isDark ? "text-text-dark/60" : "text-primary/50",
      )}
    >
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
            <span className={isDark ? "text-text-dark" : "text-primary"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
