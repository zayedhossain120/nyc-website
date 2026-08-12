import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { ServiceCatalog } from "@/components/sections/services/catalog";
import { ServicesHero } from "@/components/sections/services/hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Software development, AI automation, and marketing & growth services from Vertex & Co. — NYC's engineering-first digital agency.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ServicesHero />
      <ServiceCatalog />
      <FinalCta />
    </main>
  );
}
