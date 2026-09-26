export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-bg-dark py-12 text-text-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm">
        <p className="font-display text-lg">PROCASH</p>
        <p className="max-w-md text-text-dark/70">
          Équipements professionnels pour restaurateurs indépendants, chaînes
          rapides, collectivités et hôtels.
        </p>
        <p className="text-text-dark/50">
          © {new Date().getFullYear()} PROCASH. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
