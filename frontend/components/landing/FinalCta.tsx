"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function FinalCta() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-content]",
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-primary px-6 py-32 text-center text-text-dark sm:px-12">
      <div data-cta-content className="mx-auto max-w-2xl">
        <h2 className="font-display text-4xl font-semibold sm:text-5xl">
          Prêt à équiper votre cuisine&nbsp;?
        </h2>
        <p className="mt-6 text-text-dark/70">
          Découvrez notre catalogue complet d&apos;équipements professionnels,
          sélectionnés pour les exigences de la restauration moderne.
        </p>
        <div className="mt-10">
          <Button variant="accent" size="lg" asChild>
            <Link href="/products">Voir tous les produits</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
