"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-label]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          "[data-hero-heading]",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-tagline]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-arrow]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );

      gsap.to("[data-hero-arrow]", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
        delay: 1.6,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[92vh] flex-col items-start justify-center overflow-hidden bg-primary px-6 text-text-dark sm:px-12"
    >
      <Image
        src="/images/background-image.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/50" />

      <div className="relative z-10 flex flex-col items-start">
        <p
          data-hero-label
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-accent"
        >
          Équipements professionnels
        </p>
        <h1
          data-hero-heading
          className="max-w-4xl font-display text-[3rem] font-bold leading-[0.95] sm:text-[4.5rem] lg:text-[5.5rem]"
        >
          Équipements
          <br />
          Restaurant <span className="accent-bar text-accent">Premium</span>
        </h1>
        <p data-hero-tagline className="mt-8 max-w-md text-lg font-light text-text-dark/80">
          Solutions professionnelles pour votre cuisine — sélectionnées pour les
          restaurateurs qui exigent l&apos;excellence.
        </p>
        <div data-hero-cta className="mt-10">
          <Button variant="accent" size="lg" asChild>
            <Link href="/products">Explorer le catalogue</Link>
          </Button>
        </div>
      </div>

      <div
        data-hero-arrow
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-accent/70"
      >
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
