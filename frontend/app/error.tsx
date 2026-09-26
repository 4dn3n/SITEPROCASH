"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-32 text-center">
      <h1 className="font-display text-2xl font-semibold">Une erreur est survenue</h1>
      <p className="text-primary/60">{error.message || "Veuillez réessayer."}</p>
      <Button variant="accent" size="lg" onClick={() => reset()}>
        Réessayer
      </Button>
    </main>
  );
}
