import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { ServiceCatalog } from "@/components/sections/services/catalog";
import { ServicesHero } from "@/components/sections/services/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "SaaS, Cloud, AI & Marketing Services in NYC",
  description:
    "SaaS development, SaaS web design, cloud application development, AI automation and marketing services from NYC Digital Agency, serving Manhattan, Brooklyn, Queens and clients nationwide.",
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
