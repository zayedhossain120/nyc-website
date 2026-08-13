import type { Metadata } from "next";
import { Differentiators } from "@/components/sections/home/differentiators";
import { FaqPreview, HOME_FAQ_PREVIEW } from "@/components/sections/home/faq-preview";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { LeadershipTeaser } from "@/components/sections/home/leadership-teaser";
import { Pillars } from "@/components/sections/home/pillars";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { ProcessTeaser } from "@/components/sections/home/process-teaser";
import { Testimonials } from "@/components/sections/home/testimonials";
import { TrustMarquee } from "@/components/sections/home/trust-marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "NYC Software Development, AI Automation & Growth Agency",
  description:
    "Vertex & Co. is the New York City agency high-growth companies hire for production-grade Next.js/NestJS engineering, custom AI agents, and paid + organic growth systems — serving Manhattan, Brooklyn, Queens, and clients nationwide.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqPageSchema(HOME_FAQ_PREVIEW)} />
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
