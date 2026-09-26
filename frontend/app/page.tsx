import { Hero } from "@/components/landing/Hero";
import { WhyUs } from "@/components/landing/WhyUs";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <FeaturedProducts />
      <Testimonials />
      <FinalCta />
    </main>
  );
}
