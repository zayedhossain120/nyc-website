import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { WorkHero } from "@/components/sections/work/hero";
import { WorkGrid } from "@/components/sections/work/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Vertex & Co. — web apps, e-commerce, AI automation, and marketing campaigns shipped for NYC and national clients.",
};

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <WorkHero />
      <WorkGrid />
      <FinalCta />
    </main>
  );
}
