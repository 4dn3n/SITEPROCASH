"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProducts } from "@/lib/productQuery";
import { ProductCard } from "@/components/products/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProducts() {
  const products = getFeaturedProducts(5);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-featured-heading]",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        "[data-featured-card]",
        { opacity: 0, x: 32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  function scrollBy(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <section ref={rootRef} className="bg-bg-light px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 data-featured-heading className="accent-bar font-display text-4xl font-semibold">
            Équipements Populaires
          </h2>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/15 hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/15 hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-featured-card
              className="w-[280px] shrink-0 snap-start sm:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
