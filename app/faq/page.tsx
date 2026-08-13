import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQ_CATEGORIES } from "@/lib/data/faqs";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "FAQ | Software, AI Automation & SEO Questions Answered",
  description:
    "Answers to common questions about working with Vertex & Co., New York's software development and AI automation agency — service areas, pricing, IP ownership, AEO/GEO, and AI automation ROI.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const allFaqItems = FAQ_CATEGORIES.flatMap((group) => group.items);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          faqPageSchema(allFaqItems),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]),
        ]}
      />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="primary">FAQ</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Common questions, answered up front.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            If you don&apos;t see your question here, ask it directly — we respond within one
            business day.
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-24 md:px-16">
        {FAQ_CATEGORIES.map((group) => (
          <div key={group.category} className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium text-primary">{group.category}</h2>
            <Accordion items={group.items} className="max-w-3xl" />
          </div>
        ))}
      </div>

      <FinalCta />
    </main>
  );
}
