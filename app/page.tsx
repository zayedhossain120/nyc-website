import { Differentiators } from "@/components/sections/home/differentiators";
import { FaqPreview } from "@/components/sections/home/faq-preview";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { LeadershipTeaser } from "@/components/sections/home/leadership-teaser";
import { Pillars } from "@/components/sections/home/pillars";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { ProcessTeaser } from "@/components/sections/home/process-teaser";
import { Testimonials } from "@/components/sections/home/testimonials";
import { TrustMarquee } from "@/components/sections/home/trust-marquee";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TrustMarquee />
      <Pillars />
      <Differentiators />
      <FeaturedWork />
      <ProcessTeaser />
      <Testimonials />
      <PricingTeaser />
      <LeadershipTeaser />
      <FaqPreview />
      <FinalCta />
    </main>
  );
}
