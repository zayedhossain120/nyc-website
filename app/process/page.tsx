import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { ProcessTimeline } from "@/components/sections/process/process-timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { PROCESS_STEPS } from "@/lib/data/process";
import { breadcrumbSchema, howToSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Our Process | How We Build Software & AI Automation Systems",
  description:
    "Vertex & Co.'s 21-day engagement methodology, from discovery to launch — the same four-phase process behind every NYC software, AI automation, and growth engagement.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          howToSchema({
            name: "How Vertex & Co. Builds Software and AI Automation Systems",
            description: "The four-phase, 21-day engagement methodology Vertex & Co. follows on every project.",
            steps: PROCESS_STEPS.map((step) => ({ name: step.title, text: step.description })),
          }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]),
        ]}
      />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="warm">Process</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            21 days, start to launch.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            No open-ended retainer to figure out scope. Every engagement follows the same four
            phases, with a deliverable at the end of each one.
          </p>
        </div>
      </section>

      <ProcessTimeline />

      <FinalCta />
    </main>
  );
}
