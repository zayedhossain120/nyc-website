import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { ServiceCatalog } from "@/components/sections/services/catalog";
import { ServicesHero } from "@/components/sections/services/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Software Development, AI Automation & Marketing Services in NYC",
  description:
    "Software development, AI automation, and marketing & growth services from Vertex & Co. — New York City's engineering-first digital agency serving clients across Manhattan, Brooklyn, Queens, and nationwide.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <ServicesHero />
      <ServiceCatalog />
      <FinalCta />
    </main>
  );
}
