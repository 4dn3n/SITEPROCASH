import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "PROCASH — Équipements Restaurant Premium",
  description:
    "Équipements professionnels de restauration pour restaurateurs indépendants, chaînes rapides et collectivités.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <CartSidebar />
        </Providers>
      </body>
    </html>
  );
}
