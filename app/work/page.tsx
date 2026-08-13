import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { WorkHero } from "@/components/sections/work/hero";
import { WorkGrid } from "@/components/sections/work/work-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Our Work | NYC Web Development & AI Automation Case Studies",
  description:
    "Case studies from Vertex & Co. — web apps, e-commerce, AI automation, and marketing campaigns shipped for NYC and national clients, with real results.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <WorkHero />
      <WorkGrid />
      <FinalCta />
    </main>
  );
}
