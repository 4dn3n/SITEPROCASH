"use client";

import { Facebook, Mail, Share2 } from "lucide-react";

export function ShareButtons({ productName }: { productName: string }) {
  function share(kind: "email" | "facebook" | "copy") {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (kind === "email") {
      window.location.href = `mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent(url)}`;
    } else if (kind === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      navigator.clipboard?.writeText(url).catch(() => {});
    }
  }

  return (
    <div className="flex items-center gap-3 text-primary/50">
      <span className="text-xs uppercase tracking-wide">Partager</span>
      <button type="button" onClick={() => share("email")} aria-label="Partager par email" className="hover:text-accent">
        <Mail className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => share("facebook")} aria-label="Partager sur Facebook" className="hover:text-accent">
        <Facebook className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => share("copy")} aria-label="Copier le lien" className="hover:text-accent">
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
