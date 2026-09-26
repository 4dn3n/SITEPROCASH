import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-32 text-center">
      <p className="font-display text-6xl font-semibold text-accent">404</p>
      <h1 className="font-display text-2xl font-semibold">Page introuvable</h1>
      <p className="text-primary/60">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button variant="accent" size="lg" asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </main>
  );
}
