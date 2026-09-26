"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: "+", label: "Produits", description: "Un catalogue complet pour équiper toute cuisine professionnelle." },
  { value: 1000, suffix: "+", label: "Clients B2B", description: "Restaurateurs indépendants, chaînes et collectivités nous font confiance." },
  { value: null, suffix: "", label: "Conseil 24/7", description: "Une équipe d'experts disponible pour vous accompagner à chaque étape." },
];

export function WhyUs() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-why-card]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        },
      );

      rootRef.current!.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toString();
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={rootRef} className="bg-bg-light px-6 py-32 sm:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            data-why-card
            className="rounded-2xl border-2 border-border/60 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-display text-5xl font-bold text-accent">
              {stat.value !== null ? (
                <>
                  <span data-counter={stat.value}>0</span>
                  {stat.suffix}
                </>
              ) : (
                stat.label
              )}
            </p>
            {stat.value !== null && (
              <p className="mt-2 font-display text-xl font-semibold">{stat.label}</p>
            )}
            <p className="mt-4 max-w-xs text-sm text-primary/60">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
