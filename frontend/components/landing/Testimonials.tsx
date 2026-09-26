"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote:
      "Un service impeccable et des équipements d'une qualité irréprochable. Notre cuisine a gagné en efficacité dès la première semaine.",
    author: "Camille Rousseau",
    role: "Chef, Restaurant Lumière",
  },
  {
    quote:
      "L'accompagnement pour équiper nos 12 établissements a été d'un professionnalisme rare. Livraison et installation sans accroc.",
    author: "Thomas Lefèvre",
    role: "Directeur des opérations, Chaîne Bistro Express",
  },
  {
    quote:
      "Du matériel robuste pensé pour la restauration collective. Le rapport qualité-prix est excellent pour nos volumes.",
    author: "Amel Benyahia",
    role: "Responsable restauration, Collectivité territoriale",
  },
];

export function Testimonials() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-testimonial]",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="bg-bg-dark px-6 py-32 text-text-dark sm:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="accent-bar font-display text-4xl font-semibold">
          Qu&apos;en disent nos clients
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} data-testimonial>
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent" />
                ))}
              </div>
              <p className="mt-6 text-lg font-light leading-relaxed text-text-dark/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-6 font-display text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-text-dark/50">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
