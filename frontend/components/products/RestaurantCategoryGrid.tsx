"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { RESTAURANT_CATEGORIES } from "@/data/restaurantCategories";
import { getRestaurantCategoryGradient } from "@/lib/tileStyles";
import { cn } from "@/lib/utils";

const CARD_STEP = 260;

export function RestaurantCategoryGrid() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-category-card]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 },
      );
    }, rowRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    function updateArrows() {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }

    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function scrollBy(dir: 1 | -1) {
    rowRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Précédent"
          className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/10 bg-white shadow-lg hover:border-accent hover:text-accent sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Suivant"
          className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary/10 bg-white shadow-lg hover:border-accent hover:text-accent sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        ref={rowRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {RESTAURANT_CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.slug}
            href={`/products?rc=${category.slug}`}
            data-category-card
            className="group relative flex w-[220px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border-2 border-transparent p-6 text-white shadow-sm transition-all duration-300 hover:scale-[1.05] hover:border-accent hover:shadow-xl sm:w-[240px]"
          >
            <div
              className={cn(
                "absolute inset-0 -z-10 transition-transform duration-500 group-hover:scale-110",
                getRestaurantCategoryGradient(category.slug),
              )}
            />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.25),transparent_55%)]" />

            <Icon className="h-9 w-9 text-white" strokeWidth={1.5} />

            <div className="mt-14">
              <h3 className="font-display text-2xl font-bold leading-tight">{category.name}</h3>
              <p className="mt-2 text-sm text-white/75">{category.tagline}</p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
              Voir les équipements
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        );
        })}
      </div>
    </div>
  );
}
