import type { Metadata } from "next";
import { Differentiators } from "@/components/sections/home/differentiators";
import { FaqPreview, HOME_FAQ_PREVIEW } from "@/components/sections/home/faq-preview";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { LeadershipTeaser } from "@/components/sections/home/leadership-teaser";
import { Pillars } from "@/components/sections/home/pillars";
import { SaasSpotlight } from "@/components/sections/home/saas-spotlight";
import { PricingTeaser } from "@/components/sections/home/pricing-teaser";
import { ProcessTeaser } from "@/components/sections/home/process-teaser";
import { Testimonials } from "@/components/sections/home/testimonials";
import { TrustMarquee } from "@/components/sections/home/trust-marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: { absolute: "NYC Software Development & SaaS Company | NYC Digital Agency" },
  description:
    "NYC Digital Agency is a New York SaaS development company and software agency: custom SaaS product development, SaaS web design, cloud application development, AI automation and local SEO.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqPageSchema(HOME_FAQ_PREVIEW)} />
      <Hero />
      <TrustMarquee />
      <Pillars />
      <SaasSpotlight />
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
